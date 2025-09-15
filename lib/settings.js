'use strict';

const meta = require.main.require('./src/meta');

const SETTINGS_KEY = 'upload-plus';

const defaultSettings = {
    paths_type: 'none',
    convert_to_webp: 'off',
    webp_quality: 83
};

let cachedSettings = null;

const settings = module.exports;

settings.init = async () => {
    // Настройки загружаются при первом обращении или при необходимости
};

settings.get = async () => {
    // if (cachedSettings) {
    //     return cachedSettings;
    // }

    const _settings = await meta.settings.get(SETTINGS_KEY);
    cachedSettings = { ...defaultSettings, ..._settings };
    // Приведение типов
    cachedSettings.convert_to_webp = cachedSettings.convert_to_webp === 'on';
    cachedSettings.webp_quality = parseInt(cachedSettings.webp_quality, 10) || 83;
    // Валидация quality
    if (cachedSettings.webp_quality < 1 || cachedSettings.webp_quality > 100) {
        cachedSettings.webp_quality = 83;
    }
    return cachedSettings;
};

settings.set = async (data) => {
    await meta.settings.set(SETTINGS_KEY, data);
    // Инвалидируем кэш
    cachedSettings = null;
};