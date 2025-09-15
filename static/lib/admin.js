// static/lib/admin.js
'use strict';

define('admin/plugins/upload-plus', ['settings', 'alerts'], function (Settings, alerts) {
    const UploadPlusAdmin = {};

    UploadPlusAdmin.init = function () {
        Settings.load('upload-plus', $('.upload-plus-settings'));

        $('#save').on('click', function () {
            Settings.save('upload-plus', $('.upload-plus-settings'), function () {
                // Используем мультиязычные ключи для alert'а
                // alerts.alert({
                //     type: 'success',
                //     alert_id: 'upload-plus-saved',
                //     title: '[[global:alert.success]]', // Можно также сделать свой ключ, например [[upload-plus:alert.saved]]
                //     message: '[[global:settings.saved]] [[global:restart-required]]', // Комбинируем стандартные ключи
                //     timeout: 5000
                // });
                // Альтернатива с полностью кастомными ключами (если добавить их в language файлы):
                alerts.alert({
                    type: 'success',
                    alert_id: 'upload-plus-saved',
                    title: '[[upload-plus:alert.title]]',
                    message: '[[upload-plus:alert.message]]',
                    timeout: 5000
                });
                
            });
        });

        // Обработчик для переключателя convert_to_webp
        $('#convert_to_webp').on('change', function () {
            $('[name="convert_to_webp"]').val(this.checked ? 'on' : 'off');
        });

        // Инициализируем состояние переключателя при загрузке
        Settings.get('upload-plus', function (err, settings) {
            if (err) return;
            if (settings.convert_to_webp === 'on') {
                $('#convert_to_webp').prop('checked', true);
            }
        });
    };

    return UploadPlusAdmin;
});