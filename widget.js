define(function () {
  return function () {
    this.callbacks = {
      init: function () {
        console.log('[KOMMO] init OK');
        return true;
      },

      render: function () {
        console.log('[KOMMO] render OK');

        if (this.widgets && this.widgets.add_action) {
          this.widgets.add_action('card', {
            text: 'BOTÃO TESTE',
            class_name: 'kommo-test-btn',
            onClick: function () {
              alert('BOTÃO FUNCIONANDO 🎉');
            }
          });
        }

        return true;
      }
    };
  };
});
