var strict = false;
var on = false;
var playerTurn = false;
var movesArr = [""];
var pArr = [""];
var score = -1;

$(function() {
  var buzzer = document.createElement("audio");
  buzzer.src = "buzzer.wav";

  $(".button.empty").hide();

  $(".switch, .square:first-of-type").click(function() {
    if (!strict) {
      $(".square:first-of-type").css("transform", "translateX(70%)");
      $(".switch").css("background-color", "#ff7043");
      strict = true;
    } else {
      $(".square:first-of-type").css("transform", "translateX(-160%)");
      $(".switch").css("background-color", " #221a18");
      strict = false;
    }
  });

  $(".power").click(function() {
    if (!on) {
      $(this).css("background-color", "#cfd8dc");
      $(this).css("box-shadow", "0 -8px 25px -5px white");
      on = true;
      playGame();
    } else {
      window.setTimeout(function() {
        buzzer.play();
      }, 200);
      score = -1;
      updateScore();
      movesArr = [""];
      pArr = [""];
      $(".button.empty").fadeIn("fast");
      $(this).addClass("blink");
      window.setTimeout(function() {
        $(".power").removeClass("blink");
        $(".button.empty").fadeOut("fast");
        window.setTimeout(playGame, 2000);
      }, 1000);
    }
  });

  $(".button").click(function() {
    if (playerTurn) {
      if ($(this).hasClass("green")) {
        lightUp(0);
        pArr.push(0);
      } else if ($(this).hasClass("red")) {
        lightUp(1);
        pArr.push(1);
      } else if ($(this).hasClass("yellow")) {
        lightUp(2);
        pArr.push(2);
      } else if ($(this).hasClass("blue")) {
        lightUp(3);
        pArr.push(3);
      }
      if (pArr.length === movesArr.length) {
        playerTurn = false;
        playGame();
      } else {
        for (var d = 0; d < pArr.length; d++) {
          if (pArr[d] !== movesArr[d]) error();
        }
      }
    }
  });
});

function lightUp(x) {
  var green = document.createElement("audio");
  green.src = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
  var blue = document.createElement("audio");
  blue.src = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
  var yellow = document.createElement("audio");
  yellow.src = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
  var red = document.createElement("audio");
  red.src = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
  switch (x) {
    case 0:
      $(".green.button.empty").fadeIn("fast");
      window.setTimeout(function() {
        $(".green.button.empty").fadeOut("fast");
      }, 500);
      green.play();
      break;
    case 3:
      $(".blue.button.empty").fadeIn("fast");
      window.setTimeout(function() {
        $(".blue.button.empty").fadeOut("fast");
      }, 500);
      blue.play();
      break;
    case 2:
      $(".yellow.button.empty").fadeIn("fast");
      window.setTimeout(function() {
        $(".yellow.button.empty").fadeOut("fast");
      }, 500);
      yellow.play();
      break;
    case 1:
      $(".red.button.empty").fadeIn("fast");
      window.setTimeout(function() {
        $(".red.button.empty").fadeOut("fast");
      }, 500);
      red.play();
      break;
    case "":
      break;
    default:
      break;
  }
  return;
}

function playGame() {
  if (pArr.toString() === movesArr.toString()) {
    updateScore();
    if (++score === 20) {
      //win condition
      $("#myModal").modal("show");
      $("#myModal").on("hidden.bs.modal", function(e) {
        window.setTimeout(function() {
          score = 0;
          pArr = [""];
          movesArr = [""];
          movesArr.push(Math.floor(Math.random() * 4)); //0.green 1.red 2.yellow 3.blue

          lightUp(movesArr[1]);

          window.setTimeout(function() {
            pArr = [""];
            playerTurn = true;
          }, 1500);
        }, 1500);
      });
      return;
    }
    updateScore();
    movesArr.push(Math.floor(Math.random() * 4)); //0.green 1.red 2.yellow 3.blue
    for (var i = 0; i < movesArr.length; i++) {
      (function() {
        //have to create another scope so the timeout in for-loop works
        var _i = i;
        window.setTimeout(function() {
          lightUp(movesArr[_i]);
        }, _i * 1000);
      })();
      if (i === movesArr.length - 1) {
        window.setTimeout(function() {
          pArr = [""];
          playerTurn = true;
        }, 1500);
      }
    }
  } else {
    //user got it wrong
    error();
  }
  return;
}

function error() {
  playerTurn = false;
  var buzzer = document.createElement("audio");
  buzzer.src = "buzzer.wav";

  window.setTimeout(function() {
    $(".power").addClass("blink");
    buzzer.play();
  }, 500);
  window.setTimeout(function() {
    $(".power").removeClass("blink");
    $(".button.empty").fadeOut("fast");
  }, 1000);
  if (strict) {
    score = -1;
    updateScore();
    pArr = [""];
    movesArr = [""];
    window.setTimeout(playGame, 1500);
  } else {
    window.setTimeout(function() {
      for (var i = 0; i < movesArr.length; i++) {
        (function() {
          //have to create another scope so the timeout in for-loop works
          var _i = i;
          window.setTimeout(function() {
            lightUp(movesArr[_i]);
          }, _i * 1000);
        })();
        if (i === movesArr.length - 1) {
          window.setTimeout(function() {
            pArr = [""];
            playerTurn = true;
          }, 1500);
        }
      }
    }, 800);
  }
  return;
}

function updateScore() {
  if (score < 1) {
    $("h2:nth-of-type(4)").text("Score: 0");
  } else {
    $("h2:nth-of-type(4)").text("Score: " + score);
  }
  return;
}
