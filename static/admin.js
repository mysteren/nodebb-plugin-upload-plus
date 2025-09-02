require(['settings', 'translator'], function (settings, translator) {
  const Acp = {};
  Acp.init = () => {
    settings.load('smart-upload', $('.smart-upload-settings'));
    $('#save').on('click', () => {
      settings.save('smart-upload', $('.smart-upload-settings'), () => {
        app.alertSuccess('[[smart-upload:admin.saved]]');
      });
    });
  };
  $(Acp.init);
});