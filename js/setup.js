// Настройки персонажа
'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var form = setup.querySelector('.setup-wizard-form');

  /* Сохранение настроек волшебника */

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var saveSuccessHandler = function () {
      window.dialog.hide();
    };

    window.backend.save(new FormData(form), saveSuccessHandler, window.backend.showError);
  });
})();
