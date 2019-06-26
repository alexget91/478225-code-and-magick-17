// Настройки персонажа
'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_COUNT = 4;

  var setup = document.querySelector('.setup');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  /* Генерация тестовых данных */

  var getRandomValue = function (arrData) {
    return arrData[Math.floor(Math.random() * arrData.length)];
  };

  var getRandomName = function () {
    if (Math.floor(Math.random() * 2)) {
      return getRandomValue(NAMES) + ' ' + getRandomValue(SURNAMES);
    }
    return getRandomValue(SURNAMES) + ' ' + getRandomValue(NAMES);
  };

  var getWizardsData = function () {
    var wizardsData = [];
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      wizardsData[i] = {
        name: getRandomName(),
        coatColor: getRandomValue(COAT_COLORS),
        eyesColor: getRandomValue(EYE_COLORS)
      };
    }

    return wizardsData;
  };

  /* Отрисовка похожих магов */

  var renderWizard = function (template, data) {
    var wizardElement = template.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = data.name;
    wizardElement.querySelector('.wizard-coat').style.fill = data.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = data.eyesColor;

    return wizardElement;
  };

  var renderWizardsList = function () {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content
      .querySelector('.setup-similar-item');
    var similarWizardsFragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARDS_COUNT; i++) {
      similarWizardsFragment.appendChild(renderWizard(similarWizardTemplate, arrWizards[i]));
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
    setColor(wizardCoat, setup.querySelector('input[name="coat-color"]'), getRandomValue(COAT_COLORS));
  });

  wizardEyes.addEventListener('click', function () {
    setColor(wizardEyes, setup.querySelector('input[name="eyes-color"]'), getRandomValue(EYE_COLORS));
  });

  wizardFireball.addEventListener('click', function () {
    setColor(
        wizardFireball,
        setup.querySelector('input[name="fireball-color"]'),
        getRandomValue(FIREBALL_COLORS), true
    );
  });

  var arrWizards = getWizardsData();

  document.querySelector('.setup-similar-list').appendChild(renderWizardsList());
  document.querySelector('.setup-similar').classList.remove('hidden');
})();
