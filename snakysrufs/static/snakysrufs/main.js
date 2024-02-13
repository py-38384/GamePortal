let btn_outline = '5px solid #8AC8FF';
let inputDir = { x: 0, y: 0 };
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let pause = false;
let gameOver = false;
let playing = false;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

let highScore = JSON.parse(localStorage.getItem('highScore'));
if (highScore === null) {
  highScore = 0;
}

function isMobile() {
  return window.navigator.maxTouchPoints > 1
}

const is_mobile = isMobile()
if(is_mobile){}else{
  document.querySelector('.button-wrapper').style.display = 'none'
  document.querySelector('#displayBoard').style.height = '90vh'
  document.querySelector('#displayBoard').style.width = '30vw'
  document.querySelector('#scoreBoard').style.fontSize = '2vw'
  document.querySelector('#highScoreBoard').style.fontSize = '2vw'
}



//Left Button button functionality
function leftBtn(ele) {
  ele.style.outline = btn_outline;
  setTimeout(() => {
    ele.style.outline = 'none';
  }, 100);
  gameOver = false;
  playing = true;
  if (pause) {} else {
    if (document.getElementById('notice').innerText === 'GAME OVER') {
      document.getElementById('notice').style.display = 'none';
    }
    if (inputDir.x === 1 && inputDir.y === 0) {} else {
      inputDir = { x: -1, y: 0 };
    }
  }
}

//Right Button button functionality
function rightBtn(ele) {
  ele.style.outline = btn_outline;
  setTimeout(() => {
    ele.style.outline = 'none';
  }, 100);
  gameOver = false;
  playing = true;
  if (pause) {} else {
    if (document.getElementById('notice').innerText === 'GAME OVER') {
      document.getElementById('notice').style.display = 'none';
    }
    if (inputDir.x === -1 && inputDir.y === 0) {} else {
      inputDir = { x: 1, y: 0 };
    }
  }
}

//Top Button button functionality
function topBtn(ele) {
  ele.style.outline = btn_outline;
  setTimeout(() => {
    ele.style.outline = 'none'
  }, 100)
  gameOver = false;
  playing = true;
  if (pause) {} else {
    if (document.getElementById('notice').innerText === 'GAME OVER') {
      document.getElementById('notice').style.display = 'none';
    }
    if (inputDir.x === 0 && inputDir.y === 1) {} else {
      inputDir = { x: 0, y: -1 };
    }
  }
}

//Bottom Button button functionality
function bottomBtn(ele) {
  ele.style.outline = btn_outline;
  setTimeout(() => {
    ele.style.outline = 'none'
  }, 100)
  gameOver = false;
  playing = true;
  if (pause) {} else {
    if (document.getElementById('notice').innerText === 'GAME OVER') {
      document.getElementById('notice').style.display = 'none';
    }
    if (inputDir.x === 0 && inputDir.y === -1) {} else {
      inputDir = { x: 0, y: 1 };
    }
  }
}

//pause button functionality
function pauseGame(ele) {
  ele.style.outline = btn_outline;
  setTimeout(() => {
    ele.style.outline = 'none'
  }, 100)
  bgSound.pause();
  if (gameOver) {} else {
    document.getElementById('notice').innerText = 'GAME PAUSE';
    if (pause) {
      notice.style.display = 'none';
      pause = false;
    } else {
      notice.style.display = 'block';
      pause = true;
    }
  }
}

window.addEventListener('keydown', function (e) {
  if(e.key === 'w'){
    topBtn(this.document.createElement('div'))
  }else if(e.key === 'd'){
    rightBtn(this.document.createElement('div'))
  }else if(e.key === 'a'){
    leftBtn(this.document.createElement('div'))
  }else if(e.key === 's'){
    bottomBtn(this.document.createElement('div'))
  }else if(e.key === ' '){
    pauseGame(this.document.createElement('div'))
  }
})

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  if (pause) {} else { gameEngine() }
}

//Collision detection function
function isCollide(snake) {
  // If you bump into yourself 
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      playing = false;
      bgSound.pause();
      bgSound.currentTime = 0;
      gameOverSound.play();
      gameOver = true;
      document.getElementById('notice').innerText = 'GAME OVER';
      notice.style.display = 'block';
      return true;
    }
  }
  return false;
}

function gameEngine() {
  if(playing){
    bgSound.play();
  }
  scoreBoard.innerHTML = `Score:${score}`;
  highScoreBoard.innerHTML = `HighScore:${highScore}`;
  // Part 1: Updating the snake array & Food
  if (isCollide(snakeArr)) {
    inputDir = { x: 0, y: 0 };
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
  }

  // If you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 100;
    if (score > highScore) {
      highScore = score;
    }
    localStorage.setItem('highScore', JSON.stringify(highScore));
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
    let a = Math.round(2 + Math.random() * 14);;
    let b = Math.round(2 + Math.random() * 24);
    food = { x: a, y: b }
  }
  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  if ((snakeArr[0].x - 2) <= -1 && inputDir.x === -1) {
    snakeArr[0].x = 19;
    snakeArr[0].y += inputDir.y
  } else if ((snakeArr[0].x + 2) > 19 && inputDir.x === 1) {
    snakeArr[0].x = 1;
    snakeArr[0].y += inputDir.y;
  } else if ((snakeArr[0].y - 2) <= -1 && inputDir.y === -1) {
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y = 28;
  } else if ((snakeArr[0].y + 2) > 28 && inputDir.y === 1) {
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y = 1;
  } else {
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
  }

  // Part 2: Display the snake and Food
  // Display the snake
  displayBoard.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add('head');
    }
    else {
      snakeElement.classList.add('sbody');
    }
    displayBoard.appendChild(snakeElement);
  });
  //console.log(snakeArr.length);
  // Display the food
  foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food')
  displayBoard.appendChild(foodElement);
}
window.requestAnimationFrame(main);
