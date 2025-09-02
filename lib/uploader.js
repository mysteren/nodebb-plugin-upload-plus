'use strict';

const path        = require('path');
const fs          = require('fs').promises;
const crypto      = require('crypto');
const sharp       = require('sharp');          // npm i sharp
const winston     = require.main.require('winston');
const meta        = require.main.require('./src/meta');
const file        = require.main.require('./src/file');

// const webp        = require('./webp');

const plugin = {};

plugin.init = async (params) => {
  meta.settings.get('smart-upload', (err, data) => {
    if (err) winston.error('[smart-upload] ' + err.message);
  });
};

plugin.addAdminNav = (header) => {
  header.plugins.push({
    route: '/plugins/smart-upload',
    icon:  'fa-upload',
    name:  'Smart Upload'
  });
  return header;
};

plugin.handleUpload = async (data) => {
  const { file: uploadedFile } = data;
  const settings = await meta.settings.get('smart-upload');

  const { paths_type = 'hash', convert_to_webp = 'off' } = settings;
  const doWebp = convert_to_webp === 'on';

  // 1. Генерируем подпапку
  const subDir = buildPath(uploadedFile, paths_type);
  const destDir = path.join(nconf.get('upload_path'), 'files', subDir);

  await fs.mkdir(destDir, { recursive: true });

  // 2. Определяем имя файла
  const ext = path.extname(uploadedFile.name);
  const hash = crypto.createHash('md5')
                     .update(Date.now() + uploadedFile.name)
                     .digest('hex');
  const baseName = hash.slice(0, 8);
  const fullName = baseName + ext;
  const finalPath = path.join(destDir, fullName);

  // 3. Перемещаем (или копируем) временный файл
  await fs.rename(uploadedFile.path, finalPath);

  // 4. Если нужно — конвертируем
  let url = '/uploads/files/' + path.posix.join(subDir, fullName);
  if (doWebp && file.isFileTypeAllowed(uploadedFile.path, ['image'])) {
    const webpName = baseName + '.webp';
    const webpPath = path.join(destDir, webpName);
    await sharp(finalPath).webp({ quality: 83 }).toFile(webpPath);
    url = '/uploads/files/' + path.posix.join(subDir, webpName);
  }

  return { url };
};

function buildPath(fileObj, type) {
  if (type === 'date') {
    const d = new Date();
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
  }
  // default: hash
  const hash = crypto.createHash('md5').update(fileObj.name).digest('hex');
  return `${hash.charAt(0)}/${hash.charAt(1)}`; // a/b/
}

module.exports = plugin;