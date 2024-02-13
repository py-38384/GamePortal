let Board = document.querySelector('#displayBoard');
let btn_outline = '5px solid #D4EFFF';
let lastPrintTime = 0;
let frameRate = 2.4;
let curBrick = [];
let isSet = false;
let index = 0;
let indexArr = [0, 0, 0, 0, 0, 0, 0];
let pause = false;
let gameOver = false;
let indexX = -1;
let playing = false;
var score = 0;
var highScore = JSON.parse(localStorage.getItem('highScore2'));
if (highScore === null) { highScore = 0 }
document.getElementById('scoreBoard').innerHTML = `Score:${score}`;
document.getElementById('highScoreBoard').innerHTML = `Highscore:${highScore}`;
document.getElementById('notice').innerText = 'Press any key(without middle one)';
document.getElementById('notice').innerHTML = 'START GAME';
document.getElementById('notice').style.display = 'block';
let lavelUp = setInterval(() => {
  frameRate += 0.2
}, 120000);

let groundBrick = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [{ x: 1, y: 28 }, { x: 2, y: 28 }, { x: 3, y: 28 }, { x: 4, y: 28 }, { x: 5, y: 28 }, { x: 6, y: 28 }, { x: 7, y: 28 }, { x: 8, y: 28 }, { x: 9, y: 28 }, { x: 10, y: 28 }, { x: 11, y: 28 }, { x: 12, y: 28 }, { x: 13, y: 28 }, { x: 14, y: 28 }, { x: 15, y: 28 }, { x: 16, y: 28 }, { x: 17, y: 28 }, { x: 18, y: 28 }]];
let objArr = [
  [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }],
  [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
  [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }],
  [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
];
let Brick1Alt = [[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }]];
let Brick2Alt = [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }], [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }], [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }]];
let Brick3Alt = [[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }], [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }]];
let Brick4Alt = [[{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }]];
let Brick5Alt = [[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }], [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }]];
let Brick6Alt = [[{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }], [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }]];
let Brick7Alt = [[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]];

// All brick representing here...
/* 1st brick = *
               *
               *
               *
               
   2nd brick =  *
               ***
               
   3rd brick =  *
               **
               *
               
   4th brick = *
               **
                *
                
   5th brick = **
               *
               *
               
   6th brick = **
                *
                *
                
   7th brick = **
               **
      
 */


//Utility functions...⚙️
function arrange(num) {
  scoreMusic.play();
  score += 100;
  for (let i = num; i > 0; i--) {
    groundBrick[i - 1].forEach((e) => {
      e.y += 1;
    })
    groundBrick[i] = groundBrick[i - 1];
  }
  groundBrick[0] = [];
}

function existInX(num, arr) {
  for (e of arr) {
    if (e.x === num) {
      return e;
    }
  }
  return false;
}

function downFall(groundCell, brickCell) {
  brickY = brickCell.y;
  brickCell.y = groundCell.y - 1;
  resultY = brickCell.y - brickY;
  brickCell.y = brickY;
  curBrick.forEach((e) => {
    e.y += resultY;
  })
  if (setGround()) { } else { return false }
  isSet = false;
  return true;
}

function setGround() {
  tempGroundBrickHolder = JSON.parse(JSON.stringify(groundBrick));
  for (e of curBrick) {
    for (ele of groundBrick[e.y - 1]) {
      if (ele.x === e.x && ele.y === e.y) {
        groundBrick = tempGroundBrickHolder;
        return false;
      }
    }
    groundBrick[e.y - 1].push(e);
  }
  return true;
}

function printBrick(arr) {
  document.getElementById('scoreBoard').innerHTML = `Score:${score}`;
  document.getElementById('highScoreBoard').innerHTML = `Highscore:${highScore}`;
  arr.forEach((e, index) => {
    let brickElement = document.createElement('div');
    brickElement.style.gridRowStart = e.y;
    brickElement.style.gridColumnStart = e.x;
    brickElement.classList.add('brick');
    Board.appendChild(brickElement);
  });
}

function changeBrick(altArr, index) {
  curY = curBrick[0].y;
  curX = curBrick[0].x;
  curBrick = JSON.parse(JSON.stringify(altArr[indexArr[index]]));
  indexArr[index]++;
  curBrick.forEach((e, i) => {
    curBrick[i].x += curX;
    curBrick[i].y += curY;
  });
  if (indexArr[index] >= altArr.length) { indexArr[index] = 0 }
}

function resetGame() {
  score = 0;
  groundBrick = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [{ x: 1, y: 28 }, { x: 2, y: 28 }, { x: 3, y: 28 }, { x: 4, y: 28 }, { x: 5, y: 28 }, { x: 6, y: 28 }, { x: 7, y: 28 }, { x: 8, y: 28 }, { x: 9, y: 28 }, { x: 10, y: 28 }, { x: 11, y: 28 }, { x: 12, y: 28 }, { x: 13, y: 28 }, { x: 14, y: 28 }, { x: 15, y: 28 }, { x: 16, y: 28 }, { x: 17, y: 28 }, { x: 18, y: 28 }]];
  curBrick = [];
  isSet = false;
  index = 0;
  indexArr = [0, 0, 0, 0, 0, 0, 0];
  indexX = -1;
  pause = false;
  gameOver = false;
  playing = false;
  document.getElementById('notice').innerText = '';
  notice.style.display = 'none';
}

//-------Button Functions------🖲️
function btnFun(ele) {
  if (ele) {
    ele.style.outline = btn_outline;
    setTimeout(() => {
      ele.style.outline = 'none';
    }, 100);
    if (gameOver) {
      resetGame();
    }
  }
}

function leftBtn(ele = null) {
  btnFun(ele);
  if (pause) { } else {
    playing = true
    if (gameOver) { } else {
      if (isSet) {
        lowestX = { x: Infinity, y: Infinity };
        curBrick.forEach((e) => {
          if (e.x < lowestX.x) {
            lowestX = e;
          }
        })
        tempCurBrick = JSON.parse(JSON.stringify(curBrick));
        if (lowestX.x > 1) {
          curBrick.forEach((e) => {
            e.x -= 1;
          })
        } else { return }
        for (e of curBrick) {
          for (ele of groundBrick[e.y - 1]) {
            if (ele.x === e.x && ele.y === e.y) {
              curBrick = tempCurBrick;
            }
          }
        }
      }
    }
  }
}

function rightBtn(ele = null) {
  btnFun(ele);
  if (pause) { } else {
    playing = true
    if (gameOver) { } else {
      if (isSet) {
        highestX = { x: -1, y: -1 };
        curBrick.forEach((e) => {
          if (e.x > highestX.x) {
            highestX = e;
          }
        })
        tempCurBrick = JSON.parse(JSON.stringify(curBrick));
        if (highestX.x < 18) {
          curBrick.forEach((e) => {
            e.x += 1;
          })
        } else { return }
        for (e of curBrick) {
          for (ele of groundBrick[e.y - 1]) {
            if (ele.x === e.x && ele.y === e.y) {
              curBrick = tempCurBrick;
            }
          }
        }
      }
    }
  }
}

function topBtn(ele = null) {
  btnFun(ele);
  if (pause) { } else {
    playing = true
    if (gameOver) { } else {
      switch (index) {
        case 0:
          changeBrick(Brick1Alt, 0);
          break;
        case 1:
          changeBrick(Brick2Alt, 1);
          break;
        case 2:
          changeBrick(Brick3Alt, 2);
          break;
        case 3:
          changeBrick(Brick4Alt, 3);
          break;
        case 4:
          changeBrick(Brick5Alt, 4);
          break;
        case 5:
          changeBrick(Brick6Alt, 5);
          break;
        case 6:
          changeBrick(Brick7Alt, 6);
          break;
      }
    }
  }
}

function bottomBtn(ele = null) {
  btnFun(ele);
  if (pause) { } else {
    playing = true
    if (gameOver) { } else {
      arrE = [];
      breakFree = false;
      breakTolavel1 = false;
      curBrick.forEach((e) => {
        eBrick = existInX(e.x, arrE)
        if (eBrick) {
          if (eBrick.y < e.y) {
            arrE.forEach((element, index) => {
              if (arrE[index] === eBrick) {
                arrE.splice(index, 1);
              }
            })
            arrE.push(e);
          }
        } else {
          arrE.push(e);
        }
      })
      for (let i = 0; i < groundBrick.length; i++) {
        for (let j = 0; j < groundBrick[i].length; j++) {
          for (e of arrE) {
            if (groundBrick[i][j].x === e.x) {
              if (downFall(groundBrick[i][j], e)) {
                breakFree = true;
              } else {
                breakTolavel1 = true;
              }
            }
            if (breakFree) { break }
            if (breakTolavel1) { break }
          }
          if (breakFree) { break }
          if (breakTolavel1) {
            breakTolavel1 = false;
          }
        }
        if (breakFree) { break }
      }
      for (let i = 0; i < groundBrick.length - 1; i++) {
        if (groundBrick[i].length >= 18) {
          groundBrick[i].splice(0, groundBrick[i].length);
          arrange(i);
        }
      }
    }
  }
}

function pauseGame(ele = null) {
  if(ele){
    ele.style.outline = btn_outline;
    setTimeout(() => {
      ele.style.outline = 'none';
    }, 100);
  }
  if (gameOver) { } else {
    if (pause) {
      playing = true;
      pause = false;
    } else {
      bg.pause();
      playing = false;
      document.getElementById('notice').innerHTML = "PAUSE";
      document.getElementById('notice').style.display = 'block';
      pause = true;
    }
  }
}

//-------Main Function-------👑
// Program's main function responsible for controlling  frame rate and game Engine....
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPrintTime) / 1000 < 1 / frameRate) {
    return;
  }
  lastPrintTime = ctime;
  if (frameRate >= 5) { clearInterval(lavelUp) }
  if (gameOver || pause || !playing) { } else { gameEngine() }
}

//-------Game Function--------
// This function is the base of all game logic. it is the controlling function for all logic function....
function gameEngine() {
  document.getElementById('notice').innerHTML = "";
  document.getElementById('notice').style.display = 'none';
  if (playing) {
    bg.play();
  }
  groundBrick.forEach((r) => {
    r.forEach((e) => {
      if (e.y <= 2) {
        document.getElementById('notice').innerText = 'GAME OVER';
        notice.style.display = 'block';
        playing = false;
        bg.pause();
        bg.currentTime = 0;
        gameOverMusic.play();
        gameOver = true;
      }
    })
  })
  if (!isSet) {
    index = Math.floor(Math.random() * 7);
    curBrick = JSON.parse(JSON.stringify(objArr[index]));
    curBrick.forEach((e) => {
      e.x = e.x + 9;
      e.y = e.y + 1;
    });
    isSet = true;
  } else {
    curBrick.forEach((e, i) => {
      curBrick[i].y += 1;
    })
  }
  Board.innerHTML = '';
  printBrick(curBrick);
  groundBrick.forEach((element) => {
    element.forEach((e) => {
      curBrick.forEach((ele) => {
        if (e.x === ele.x && e.y - 1 === ele.y) {
          isSet = false;
        }
      })
    })
  })
  if (!isSet) {
    setGround();
  }
  groundBrick.forEach((ele) => {
    printBrick(ele);
  })
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore2', JSON.stringify(highScore));
  }
  for (let i = 0; i < groundBrick.length - 1; i++) {
    if (groundBrick[i].length >= 18) {
      groundBrick[i].splice(0, groundBrick[i].length);
      arrange(i);
    }
  }
}
// This is the starting point of the program...
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'W':
    case 'w':
        topBtn();
      break;
    case 'A':
    case 'a':
        leftBtn();
      break;
    case 'D':
    case 'd':
        rightBtn();
      break;
    case 'S':
    case 's':
        bottomBtn();
      break;
    case " ":
        pauseGame();
      break;
    default:
      break;
  }
})
function isMobile() {
  return window.navigator.maxTouchPoints > 1
}

const is_mobile = isMobile()
if(is_mobile){}else{
  document.querySelector('.button-wrapper').style.display = 'none'
  document.querySelector('#displayBoard').style.height = '90vh'
  document.querySelector('#displayBoard').style.width = '30vw'
  document.querySelector('#scoreBoard').style.fontSize = '1vw'
  document.querySelector('#highScoreBoard').style.fontSize = '1vw'
}
