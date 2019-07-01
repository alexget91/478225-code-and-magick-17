// Управление диалоговым окном
'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');

  var setElementPosition = function (element, top, left) {
    element.style.top = top ? top + 'px' : null;
    element.style.left = left ? left + 'px' : null;
  };

  var showSetupPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onSetupEscPress);
  };

  var hideSetupPopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscPress);
    setElementPosition(setup);
  };

  var onSetupEscPress = function (evt) {
    if (evt.target !== setupUserName) {
      window.util.isEscEvent(evt, hideSetupPopup);
    }
  };

  setupOpen.addEventListener('click', showSetupPopup);
  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, showSetupPopup);
  });

  setupClose.addEventListener('click', hideSetupPopup);
  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, hideSetupPopup);
  });

  /* Перетаскивание */

  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setElementPosition(
          setupDialogElement,
          setupDialogElement.offsetTop - shift.y,
          setupDialogElement.offsetLeft - shift.x
      );
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };

        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.dialog = {show: showSetupPopup, hide: hideSetupPopup};
})();
