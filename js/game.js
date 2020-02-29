const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {
  $(".game-field").removeClass("d-none");
  $("div").removeClass("target");
  $("div").removeClass("miss");
  // FIXME: надо бы убрать "target" прежде чем искать новый

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits);
  // TODO: помечать target текущим номером
  // FIXME: тут надо определять при первом клике firstHitTime
 if (hits === 1) {
    firstHitTime = getTimestamp();
  }
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".game-field").addClass("d-none");
  // FIXME: спрятать игровое поле сначала

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis/1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    $(event.target).text("")

    hits = hits + 1;
    round();

  }
    else
    $(event.target).addClass("miss");
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
$(".game-field").addClass("d-none");
  $("#button-load").click(function() {
    $("#button-reload").removeClass("d-none");
    $("#button-load").addClass("d-none");
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
    round();
  });

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
