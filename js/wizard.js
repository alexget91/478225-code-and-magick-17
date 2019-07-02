// Покраска элементов волшебника
'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  var setColor = function (element, input, value, isFireball) {
    if (isFireball) {
      element.style.background = value;

    } else {
      element.style.fill = value;
    }

    input.value = value;
  };


  wizardCoat.addEventListener('click', function () {
    var newColor = window.util.getRandomValue(COAT_COLORS);
    setColor(wizardCoat, setup.querySelector('input[name="coat-color"]'), newColor);
    wizard.onCoatChange(newColor);
  });

  wizardEyes.addEventListener('click', function () {
    var newColor = window.util.getRandomValue(EYE_COLORS);
    setColor(wizardEyes, setup.querySelector('input[name="eyes-color"]'), newColor);
    wizard.onEyesChange(newColor);
  });

  wizardFireball.addEventListener('click', function () {
    setColor(
        wizardFireball,
        setup.querySelector('input[name="fireball-color"]'),
        window.util.getRandomValue(FIREBALL_COLORS), true
    );
  });

  window.wizard = wizard;
})();
