
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(()=>{
  if (!started) {
    $("#level-title").text("Level " + level);
    $("#mob-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
$("#start-btn").click(()=>{
  if (!started) {
    $("#level-title").text("Level " + level);
    $("#mob-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click((event)=> {

  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});



function nextSequence() {
  $("#start-btn").text("start");
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  $("#mob-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout( ()=> {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $("#mob-title").text("Game Over, Press the Restart button to play again!");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
      $("#start-btn").text("Restart");
    }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
