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

  var nextAction = window.INSTRUCTIONS[0];
  if (nextAction.time < time) {
    if (nextAction.say) {
      say(nextAction.say);
    } else {
      switch (nextAction.action) {
        case 'dip':
          dip();
          break;
        case 'pass':
          pass();
          break;
      }
    }
    window.INSTRUCTIONS.shift();
  }
}

function chew() {
  $('#chew').effect('highlight', {
    color: 'red',
  }, 500);
}

var swallowCount = 0;
function maybeSwallow() {
  swallowCount++;
  if (swallowCount == 5) {
    $('#swallow').effect('highlight', {
      color: 'blue',
    }, 500);
    swallowCount = 0;
  }
}

function dip(time) {
  $('#dip').effect('highlight', {
    color: 'green',
  }, 500);
  say('dip');
}

function pass(time) {
  $('#pass').effect('highlight', {
    color: 'orange',
  }, 500);
  say('pass the bun');
}

function say(s) {
  var utterance = new SpeechSynthesisUtterance(s);
  window.speechSynthesis.speak(utterance);
}
