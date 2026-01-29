define(function () {
  return function () {
    this.callbacks = {
      init: function () {
        console.log('[KOMMO] init OK');
        return true;
      },
      render: function () {
        console.log('[KOMMO] render OK');
        return true;
      }
    };
  };
});
