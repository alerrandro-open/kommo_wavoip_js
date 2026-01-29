define(function () {
  return function () {
    this.callbacks = {
      init: function () {
        console.log('[KOMMO TEST] init OK');
        return true;
      },

      render: function () {
        console.log('[KOMMO TEST] render OK');

        if (this.widgets && this.widgets.add_action) {
          this.widgets.add_action('card', {
            text: 'TESTE BOTÃO',
            onClick: function () {
              alert('BOTÃO FUNCIONANDO');
            }
          });
        }

        return true;
      }
    };
  };
});
