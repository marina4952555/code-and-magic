'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var FONT_GAP = 16;
  var COLUMN_GAP = 50;
  var TEXT_WIDTH = 40;
  var BAR_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var DESCRIPTION_INDENT = 20;

  var textColor = '#000';

  var renderCloud = function (ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  var randomizePercent = function () {
    return Math.floor(Math.random() * 101) + '%';
  };

  var renderText = function (ctx, text, x, y, font, color) {
    ctx.font = font;
    ctx.fillStyle = color;
    var stringsArr = text.split('/n');
    stringsArr.forEach(function (string, i) {
      ctx.fillText(string, x, y + FONT_GAP * (i + 1));
    });
  };

  var renderResult = function (ctx, text, xCoordinate, n, resultsArr, maxResult, noResults) {
    ctx.fillStyle = textColor;
    ctx.fillText(text, xCoordinate, CLOUD_Y + CLOUD_HEIGHT - GAP);
    if (noResults === false) {
      ctx.fillText(Math.round(resultsArr[n]), xCoordinate, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - BAR_HEIGHT * resultsArr[n] / maxResult - GAP);
      if (text === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'hsl(255,' + randomizePercent() + ',' + randomizePercent() + ')';
      }
      ctx.fillRect(xCoordinate, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - BAR_HEIGHT * resultsArr[n] / maxResult, BAR_WIDTH, BAR_HEIGHT * resultsArr[n] / maxResult);
    }
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');

    renderText(ctx, 'Ура вы победили!/nСписок результатов:', CLOUD_X + GAP, CLOUD_Y + DESCRIPTION_INDENT, '16px "PT Mono"', textColor);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < Math.min(names.length, times.length); i++) {
      renderResult(ctx, names[i], CLOUD_X + COLUMN_GAP + (TEXT_WIDTH + COLUMN_GAP) * i, i, times, maxTime, false);
    }

    if (names.length > times.length) {
      for (i = times.length; i < names.length; i++) {
        renderResult(ctx, names[i], CLOUD_X + COLUMN_GAP + (TEXT_WIDTH + COLUMN_GAP) * i, i, times, maxTime, true);
      }
    }

    if (times.length > names.length) {
      for (i = names.length; i < times.length; i++) {
        renderResult(ctx, '???', CLOUD_X + COLUMN_GAP + (TEXT_WIDTH + COLUMN_GAP) * i, i, times, maxTime, false);
      }
    }
  };
})();
