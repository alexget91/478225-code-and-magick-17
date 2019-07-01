// Настройки персонажа
'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_COUNT = 4;

  var setup = document.querySelector('.setup');
  var form = setup.querySelector('.setup-wizard-form');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  /* Отрисовка похожих магов */

  var renderWizard = function (template, data) {
    var wizardElement = template.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = data.name;
    wizardElement.querySelector('.wizard-coat').style.fill = data.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = data.colorEyes;

    return wizardElement;
  };

  var renderWizardsList = function (data) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content
      .querySelector('.setup-similar-item');
    var similarWizardsFragment = document.createDocumentFragment();

    data.sort(window.util.compareRandom);

    for (var i = 0; i < WIZARDS_COUNT; i++) {
      similarWizardsFragment.appendChild(renderWizard(similarWizardTemplate, data[i]));
    }

    return similarWizardsFragment;
  };

  /* Покраска элементов волшебника */

  var setColor = function (element, input, value, isFireball) {
    if (isFireball) {
      element.style.background = value;

    } else {
      element.style.fill = value;
    }

    input.value = value;
  };


  wizardCoat.addEventListener('click', function () {
    setColor(wizardCoat, setup.querySelector('input[name="coat-color"]'), window.util.getRandomValue(COAT_COLORS));
  });

  wizardEyes.addEventListener('click', function () {
    setColor(wizardEyes, setup.querySelector('input[name="eyes-color"]'), window.util.getRandomValue(EYE_COLORS));
  });

  wizardFireball.addEventListener('click', function () {
    setColor(
        wizardFireball,
        setup.querySelector('input[name="fireball-color"]'),
        window.util.getRandomValue(FIREBALL_COLORS), true
    );
  });

  /* Загрузка списка похожих магов */

  var successHandler = function (arrWizards) {
    document.querySelector('.setup-similar-list').appendChild(renderWizardsList(arrWizards));
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  /* Сохранение настроек волшебника */

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var saveSuccessHandler = function () {
      window.dialog.hide();
    };

    window.backend.save(new FormData(form), saveSuccessHandler, errorHandler);
  });
})();
