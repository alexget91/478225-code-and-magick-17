'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

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


var setupPopup = document.querySelector('.setup');
setupPopup.classList.remove('hidden');

var arrWizards = getWizardsData();

document.querySelector('.setup-similar-list').appendChild(renderWizardsList());
document.querySelector('.setup-similar').classList.remove('hidden');
