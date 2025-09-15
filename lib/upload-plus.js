'use strict';

const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');

const sharp = require('sharp');

const settings = require('./settings');


/**
 * Добавляет подпапки к пути файла
 * @param {string} filePath - Исходный путь к файлу (относительный или абсолютный)
 * @param {string} subPath - Подпапки для добавления (например, 'a1/b2' или '2023/12/25')
 * @returns {string} Новый путь с добавленными подпапками
 */
const addSubPathToFilePath = (filePath, subPath) => {
  // Если нет подпути для добавления, возвращаем оригинальный путь
  if (!subPath || subPath === '') {
    return filePath;
  }

  // Разбиваем путь на директорию и имя файла
  const dirname = path.dirname(filePath);
  const filename = path.basename(filePath);

  // Создаем новый путь с добавлением подпапок
  const newPath = path.join(dirname, subPath, filename);

  // Унифицируем слэши для кросс-платформенной совместимости
  return newPath.replace(/\\/g, '/');
}

const generateSubPath = async (filePath, pathType) => {
  if (pathType === 'none') {
    return '';
  }

  if (pathType.startsWith('sha256')) {
    try {
      // Читаем файл для вычисления хэша
      const fileBuffer = await fs.readFile(filePath);
      const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
      const levels = parseInt(pathType.split('_')[1], 10) || 2;
      const parts = [];
      for (let i = 0; i < levels; i++) {
        parts.push(hash.substring(i * 2, i * 2 + 2));
      }
      return path.join(...parts);
    } catch (err) {
      console.error('[Upload Plus] Error generating SHA256 path:', err);
      return '';
    }
  }

  if (pathType === 'date') {
    const now = new Date();
    return path.join(String(now.getFullYear()), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0'));
  }

  return '';
};

/**
 * Определяет расширение файла из пути
 * @param {string} filePath - Путь к файлу
 * @returns {string|null} Расширение файла без точки, или null если расширение отсутствует
 */
const getFileExtension = (filePath) => {
  const ext = path.extname(filePath);
  return ext.startsWith('.') ? ext.slice(1).toLowerCase() : ext.toLowerCase();
}

/**
 * Функция для замены расширения файла в пути
 * @param {string} filePath - путь к файлу
 * @param {string} newExtension - новое расширение (может быть с точкой или без)
 * @returns {string} новый путь к файлу с измененным расширением
 */
function replaceFileExtension(filePath, newExtension) {
  // Получаем директорию и имя файла без расширения
  const dir = path.dirname(filePath);
  const basename = path.basename(filePath, path.extname(filePath));

  // Убедимся, что новое расширение начинается с точки
  const extension = newExtension.startsWith('.') ? newExtension : '.' + newExtension;

  // Собираем новый путь
  return path.join(dir, basename + extension);
}

const convertToWebP = async (filePath, quality) => {
  const webpPath = replaceFileExtension(filePath, 'webp');
  try {
    // Проверяем, существует ли файл
    await fs.access(filePath);

    await sharp(filePath)
      .webp({ quality: Math.max(1, Math.min(100, quality)) })
      .toFile(webpPath);

    await fs.unlink(filePath); // Удаляем оригинальный файл
    return webpPath;
  } catch (err) {
    console.error(`[Upload Plus] Error converting ${filePath} to WebP:`, err);
    throw err;
  }
};

const moveFileToNewPath = async (oldPath, newPath) => {
  try {
    // Создаем директорию если нужно (рекурсивно)
    const dir = path.dirname(newPath);
    await fs.mkdir(dir, { recursive: true });

    // Перемещаем файл
    await fs.rename(oldPath, newPath);
    return newPath;
  } catch (err) {
    console.error(`[Upload Plus] Error moving file from ${oldPath} to ${newPath}:`, err);
    throw err;
  }
};

// Основная функция обработки после сохранения файла
const processStoredFile = async (hookData) => {
  try {
    const pluginSettings = await settings.get();
    const storedFile = hookData.storedFile;

    console.log({ storedFile })

    // Проверка наличия необходимых данных
    if (!storedFile) {
      console.warn('[Upload Plus] No stored file data provided for processing');
      return hookData;
    }

    // Получаем абсолютный путь к файлу
    const finalFilePath = storedFile.path;

    // 1. Обработка структуры путей (если нужно)
    if (pluginSettings.paths_type !== 'none') {
      const subPath = await generateSubPath(finalFilePath, pluginSettings.paths_type);
      if (subPath) {
        const newAbsolutePath = addSubPathToFilePath(finalFilePath, subPath);

        // Перемещаем файл в новую структуру каталогов
        if (finalFilePath !== newAbsolutePath) {
          await moveFileToNewPath(finalFilePath, newAbsolutePath);

          // Обновляем информацию о файле
          storedFile.path = newAbsolutePath;
          if (storedFile.url) {
            storedFile.url = addSubPathToFilePath(storedFile.url, subPath);
          }
        }
      }
    }

    console.log({ storedFile });

    console.log({ pluginSettings })

    // 2. Конвертация в WebP (если включено и файл является изображением)
    if (pluginSettings.convert_to_webp) {
      const extension = getFileExtension(storedFile.name);

      console.log({ extension })


      // Проверим, поддерживает ли sharp этот формат
      const supportedExtension = ['jpeg', 'jpg', 'png', 'tiff', 'webp'];
      if (supportedExtension.includes(extension)) {
        try {
          const filepath = storedFile.path;

          // Проверяем, существует ли файл перед конвертацией
          await fs.access(filepath);

          const webpPath = await convertToWebP(filepath, pluginSettings.webp_quality);

          // Обновляем информацию о файле
          storedFile.path = webpPath;
          storedFile.name = path.basename(webpPath);

          // Обновляем URL если он есть
          if (storedFile.url) {
            storedFile.url = replaceFileExtension(storedFile.url, 'webp');
          }

        } catch (err) {
          console.error(`[Upload Plus] Error converting file to WebP:`, err);
          // Оставляем оригинальный файл в случае ошибки
        }
      }
    }

    console.log({ storedFile });

    return hookData;
  } catch (err) {
    console.error('[Upload Plus] Error in processStoredFile:', err);
    return hookData;
  }
};


module.exports = { processStoredFile }