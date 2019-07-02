// Отрисовка похожих магов
'use strict';

(function () {
  var MAX_WIZARDS_COUNT = 4;

  var similar = document.querySelector('.setup-similar');
  var similarList = similar.querySelector('.setup-similar-list');

  var renderWizard = function (template, data) {
    var wizardElement = template.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = data.name;
    wizardElement.querySelector('.wizard-coat').style.fill = data.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = data.colorEyes;

    return wizardElement;
  };

  window.render = function (data) {
    var takeNumber = data.length > MAX_WIZARDS_COUNT ? MAX_WIZARDS_COUNT : data.length;
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content
      .querySelector('.setup-similar-item');
    var similarWizardsFragment = document.createDocumentFragment();

    for (var i = 0; i < takeNumber; i++) {
      similarWizardsFragment.appendChild(renderWizard(similarWizardTemplate, data[i]));
    }

    similarList.innerHTML = '';
    similarList.appendChild(similarWizardsFragment);
    similar.classList.remove('hidden');
  };
})();
