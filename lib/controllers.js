// lib/controllers.js
'use strict';

const settings = require('./settings');

const controllers = module.exports;

// Обновлённая сигнатура функции для использования с setupAdminPageRoute
controllers.renderAdminPage = async function (req, res /*, next */) {
    const pluginSettings = await settings.get();
    res.render('admin/plugins/upload-plus', {
        title: 'Upload Plus Settings', // Этот title может быть переопределен локализацией
        settings: pluginSettings
    });
};