'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupPopup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupPopup.querySelector('.setup-close');
var setupUserName = setupPopup.querySelector('.setup-user-name');
var wizardCoat = setupPopup.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = setupPopup.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = setupPopup.querySelector('.setup-fireball-wrap');

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


var showSetupPopup = function () {
  setupPopup.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
};

var hideSetupPopup = function () {
  setupPopup.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
};

var onSetupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== setupUserName) {
    hideSetupPopup();
  }
};

var setColor = function (element, input, value, isFireball) {
  if (isFireball) {
    element.style.background = value;
  } else {
    element.style.fill = value;
  }
  input.value = value;
};


setupOpen.addEventListener('click', showSetupPopup);
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    showSetupPopup();
  }
});

setupClose.addEventListener('click', hideSetupPopup);
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    hideSetupPopup();
  }
});

wizardCoat.addEventListener('click', function () {
  setColor(wizardCoat, setupPopup.querySelector('input[name="coat-color"]'), getRandomValue(COAT_COLORS));
});

wizardEyes.addEventListener('click', function () {
  setColor(wizardEyes, setupPopup.querySelector('input[name="eyes-color"]'), getRandomValue(EYE_COLORS));
});

wizardFireball.addEventListener('click', function () {
  setColor(
      wizardFireball,
      setupPopup.querySelector('input[name="fireball-color"]'),
      getRandomValue(FIREBALL_COLORS), true
  );
});

var arrWizards = getWizardsData();

document.querySelector('.setup-similar-list').appendChild(renderWizardsList());
document.querySelector('.setup-similar').classList.remove('hidden');
