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
        self.renderButton();
        return true;
      }
    };

    /* =========================
       LOAD WAVOIP
    ========================== */
    this.loadWavoip = function () {
      if (wavoipLoaded || window.wavoip) return;

      const script = document.createElement('script');
      script.src =
        'https://cdn.jsdelivr.net/npm/@wavoip/wavoip-webphone/dist/index.umd.min.js';
      script.async = true;

      script.onload = async () => {
        try {
          await window.wavoipWebphone.render();
          window.wavoip.device.addDevice(
            'c3e6068d-4a62-44a0-85c2-610137545339'
          );
          window.wavoip.widget.open();
          wavoipLoaded = true;
          console.log('[Wavoip] Webphone pronto');
        } catch (e) {
          console.error('[Wavoip] Erro', e);
        }
      };

      document.head.appendChild(script);
    };

    /* =========================
       RENDER BUTTON (CORRETO)
    ========================== */
    this.renderButton = function () {
      const lead = AMOCRM.data.current_card;
      if (!lead || !lead.phone) return;

      const phone = String(lead.phone).replace(/\D/g, '');
      if (!phone) return;

      self.widgets.add_action('card', {
        text: '📞 Ligar',
        class_name: 'wavoip-call-btn',
        onClick: function () {
          if (!window.wavoip) {
            alert('Webphone carregando...');
            return;
          }
          console.log('[Wavoip] Ligando para', phone);
          window.wavoip.call(phone);
        }
      });
    };
  };
});
