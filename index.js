var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;

$(document).on("keypress", ()=>{
  if (started === false) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
    }
});

$(".btn").on("click", (event)=>{
  var userChosenColor = event.target.id;
  userClickPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickPattern.length-1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    if (userClickPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
      $("body").removeClass("game-over");
      }, 200);
    startOver();
  }
};

function nextSequence() {
  userClickPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
};



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
    }, 100);
};

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  
};