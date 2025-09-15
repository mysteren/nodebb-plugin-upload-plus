// library.js
'use strict';

const { processStoredFile } = require('./lib/upload-plus');
const controllers = require('./lib/controllers');
const settings = require('./lib/settings');

const init = async (params) => {
    const { router } = params;
    const routeHelpers = require.main.require('./src/routes/helpers');

    // Инициализация настроек
    await settings.init();

    routeHelpers.setupAdminPageRoute(router, '/admin/plugins/upload-plus', controllers.renderAdminPage);
};

const filterUploadStored = async (data) => {
    return await processStoredFile(data);
};

const addAdminNavigation = (header) => {
    header.plugins.push({
        route: '/plugins/upload-plus',
        icon: 'fa-upload',
        name: 'Upload Plus'
    });
    return header;
};

module.exports = {
    init,
    filterUploadStored,
    addAdminNavigation
};