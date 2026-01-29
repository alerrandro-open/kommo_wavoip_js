define(['jquery'], function ($) {
  return function () {
    const self = this;
    let wavoipLoaded = false;

    this.callbacks = {
      init: function () {
        console.log('[Wavoip] Widget init');
        return true;
      },

      render: function () {
        self.loadWavoip();
        self.renderCallButton();
        return true;
      }
    };

    /**
     * Carrega o SDK do Wavoip apenas uma vez
     */
    this.loadWavoip = function () {
      if (wavoipLoaded || window.wavoip) return;

      const script = document.createElement('script');
      script.src =
        'https://cdn.jsdelivr.net/npm/@wavoip/wavoip-webphone/dist/index.umd.min.js';
      script.async = true;

      script.onload = async () => {
        try {
          console.log('[Wavoip] SDK carregado');

          await window.wavoipWebphone.render();

          window.wavoip.device.addDevice(
            'c3e6068d-4a62-44a0-85c2-610137545339'
          );

          window.wavoip.widget.open();

          wavoipLoaded = true;
          console.log('[Wavoip] Webphone pronto');
        } catch (err) {
          console.error('[Wavoip] Erro ao iniciar', err);
        }
      };

      document.head.appendChild(script);
    };

    /**
     * Renderiza botão 📞 no card do lead
     */
    this.renderCallButton = function () {
      if ($('.js-wavoip-call').length) return;

      const card = AMOCRM.data.current_card;
      if (!card || !card.phone) return;

      const phone = String(card.phone).replace(/\D/g, '');
      if (!phone) return;

      const button = `
        <button class="button-input js-wavoip-call">
          📞 Ligar
        </button>
      `;

      $('.card-widgets').append(button);

      $('.js-wavoip-call').on('click', function () {
        if (!window.wavoip) {
          alert('Webphone ainda está carregando...');
          return;
        }

        console.log('[Wavoip] Ligando para', phone);
        window.wavoip.call(phone);
      });
    };
  };
});
