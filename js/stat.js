'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_HEIGHT = 20;
var BAR_HEIGHT_FULL = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var PADDING_HORIZONTAL = 20;
var PADDING_VERTICAL = 10;
var DIAGRAM_X = CLOUD_X + PADDING_HORIZONTAL * 2;
var DIAGRAM_Y = CLOUD_Y + 65;
var PLAYER_NAME = 'Вы';

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура, вы победили!', CLOUD_X + PADDING_HORIZONTAL, 30);
  ctx.fillText('Список результатов:', CLOUD_X + PADDING_HORIZONTAL, 30 + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var shiftX = (BAR_GAP + BAR_WIDTH) * i;
    var barHeight = (BAR_HEIGHT_FULL * times[i]) / maxTime;

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), DIAGRAM_X + shiftX, DIAGRAM_Y + BAR_HEIGHT_FULL - barHeight);

    ctx.fillStyle = names[i] === PLAYER_NAME ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + Math.random() + ')';
    ctx.fillRect(DIAGRAM_X + shiftX, DIAGRAM_Y + BAR_HEIGHT_FULL - barHeight + TEXT_HEIGHT, BAR_WIDTH, barHeight);

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], DIAGRAM_X + shiftX, DIAGRAM_Y + TEXT_HEIGHT + BAR_HEIGHT_FULL + PADDING_VERTICAL);
  }
};
