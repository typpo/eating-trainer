var player;
var ytTimer = null;

function onYouTubePlayerAPIReady() {
  player = new YT.Player('video', {
    height: '390',
    width: '640',
    videoId: '4hcw4MRm6V4',
    events: {
      'onStateChange': stateChange
    }
  });
}

function stateChange(evt) {
  if (evt.data == YT.PlayerState.PLAYING) {
    ytTimer = setInterval(function() {
      actionForTime(player.getCurrentTime());
    }, 500);
  } else {
    clearInterval(ytTimer);
  }
}

function actionForTime(time) {
  chew();
  maybeSwallow();
}

function chew() {
  $('#chew').effect('highlight', {
    color: 'red',
  }, 500);
  say('chew');
}

var swallowCount = 0;
function maybeSwallow() {
  swallowCount++;
  if (swallowCount == 5) {
    $('#swallow').effect('highlight', {
      color: 'blue',
    }, 500);
    swallowCount = 0;
    say('swallow');
  }
}

function say(s) {
  return;
  var utterance = new SpeechSynthesisUtterance(s);
  window.speechSynthesis.speak(utterance);
}
