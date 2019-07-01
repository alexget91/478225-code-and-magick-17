'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },

    compareRandom: function () {
      return Math.random() - 0.5;
    },

    getRandomValue: function (arrData) {
      return arrData[Math.floor(Math.random() * arrData.length)];
    }
  };
})();
