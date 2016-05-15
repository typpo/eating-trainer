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
  console.log(time);
}

