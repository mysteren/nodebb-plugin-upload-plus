// library.js
'use strict';

const { processStoredFile } = require('./lib/upload-plus');
const controllers = require('./lib/controllers');
const settings = require('./lib/settings');

const plugin = module.exports;

plugin.init = async (params) => {
    const { router } = params;
    const routeHelpers = require.main.require('./src/routes/helpers');

    // Инициализация настроек
    await settings.init();

    routeHelpers.setupAdminPageRoute(router, '/admin/plugins/upload-plus', controllers.renderAdminPage);
};

plugin.filterUploadStored = async (data) => {
    return await processStoredFile(data);
};

plugin.addAdminNavigation = (header) => {
    header.plugins.push({
        route: '/plugins/upload-plus',
        icon: 'fa-upload',
        name: 'Upload Plus'
    });
    return header;
};