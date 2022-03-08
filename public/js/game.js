const userChoices = document.querySelectorAll(".user-choices .choice");
const comChoices = document.querySelectorAll(".com-choices .choice");
const reset = document.getElementsByClassName("reset")[0];
const hasil = document.getElementsByClassName("hasil")[0];
const textHasil = document.getElementById("text-hasil");
const vs = document.getElementsByClassName("text-vs")[0];
const winScore = document.getElementsByClassName("user-score")[0];
const loseScore = document.getElementsByClassName("com-score")[0];
const drawScore = document.getElementsByClassName("draw-score")[0];
const boxGames = document.querySelector('.box-games');

class Player {
  constructor(element) {
    this.choose = element.getAttribute('value');
  }
  static changeBgColor(element) {
    element.style.backgroundColor = "#c4c4c4";
  }
  static animasiOff() {
    for (const userChoice of userChoices) {
      userChoice.classList.remove("hover");
    }
  }
  static animasiOn() {
    for (const userChoice of userChoices) {
      userChoice.classList.add("hover");
    }
  }
}

class Computer {
  constructor() {
    this.random = Math.floor(Math.random() * 3);
  }
}

let roundWin = 0;
let roundDraw = 0;
let roundLose = 0;
class Game {
  constructor(playerChoose, comRandom) {
    this.player1Win = "player 1 <br>win";
    this.comWin = "com <br>win";
    this.draw = "draw";
    this.bgColorWin = "#4c9654";
    this.bgColorDraw = "#035b0c";
    this.bgColorChoice = "#c4c4c4";
    this.animationRandom = 12 + comRandom;
    this.p1Choose = playerChoose;
    this.comChoose = comRandom ? (comRandom === 2 ? "gunting" : "kertas") : "batu";
  }
  hasilGame(text, bgColor = this.bgColorWin) {
    vs.style.display = "none";
    hasil.style.display = "block";
    hasil.style.backgroundColor = bgColor;
    textHasil.innerHTML = text;
    if (text === this.player1Win) {
      roundWin++;
      winScore.innerHTML = roundWin;
    } else if (text === this.comWin) {
      roundLose++;
      loseScore.innerHTML = roundLose;
    } else {
      roundDraw++
      drawScore.innerHTML = roundDraw;
    }
  }
  logic() {
    for (let i = 0; i <= this.animationRandom; i++) {
      setTimeout(() => {
          // animasi acak pilihan com
          comChoices[i % 3].style.backgroundColor = this.bgColorChoice;
          comChoices[(i + 2) % 3].style.backgroundColor = "transparent";
          // game logic
          if (i === this.animationRandom) {
            if (this.p1Choose === this.comChoose) {
              this.hasilGame(this.draw, this.bgColorDraw);
            } else if (this.p1Choose === "batu") {
              (this.comChoose === "kertas") ? this.hasilGame(this.comWin) : this.hasilGame(this.player1Win);
            } else if (this.p1Choose === "kertas") {
              (this.comChoose === "gunting") ? this.hasilGame(this.comWin) : this.hasilGame(this.player1Win);
            } else if (this.p1Choose === "gunting") {
              (this.comChoose === "batu") ? this.hasilGame(this.comWin) : this.hasilGame(this.player1Win);
            }
          }
      }, i * 50);
    }
  }
  reset() {
    reset.style.cursor = "pointer";
    reset.style.animation = "rotasi-reset 2s infinite";
    reset.addEventListener("click", function resetGame() {
      vs.style.display = "block";
      hasil.style.display = "none";
      reset.removeEventListener("click", resetGame)
      reset.style.cursor = "default";
      reset.style.animation = "none";
      for (const comChoice of comChoices) {
        comChoice.style.backgroundColor = "transparent";
      }
      for (const userChoice of userChoices) {
        userChoice.style.backgroundColor = "transparent";
        userChoice.style.cursor = "pointer";
        userChoice.addEventListener("click", runGame);
      }
      Player.animasiOn();
    });
  }
  endGame() {
    const round = 8;
    const remainingRound = round - (roundDraw + roundLose + roundWin);
    const gapWin = roundWin - roundLose;
    const gapLose = roundLose - roundWin;
    if (remainingRound < gapWin) {
      result('win')
    } else if (remainingRound < gapLose) {
      result('lose')
    } else if (remainingRound === 0) {
      result('draw')
    } else {
      this.reset();
    }
  }
}

async function result(result) {
  try {
    boxGames.innerHTML = `
    <div id="result">
      <h1>${result}</h1>
      <a href="/playgame">Play Again</a>
      <a href="/" >Home</a>
    </div>
    `;
    // fetch
    await fetch('/api/v1/history', {
      method: 'POST',
      body: JSON.stringify({roundDraw, roundLose, roundWin}),
      headers: {'Content-Type': 'application/json'}
    });
  } catch (error) {
    console.log(error)
  }
}
 
function runGame() {
  for (const userChoice of userChoices) {
    userChoice.removeEventListener("click", runGame);
    userChoice.style.cursor = "default";
  }
  const p1 = new Player(this);
  Player.changeBgColor(this);
  Player.animasiOff();

  const com = new Computer;
  
  const game = new Game(p1.choose, com.random)
  game.logic();
  setTimeout(() => {
    game.endGame();
  }, 1500);
}
for (const userChoice of userChoices) {
  userChoice.addEventListener("click", runGame)
}