var mineSound, billyPlay, winMp3;
var grid;
var bg;
var score = 100;

var cols;
var rows;
var w = 30;

let GameState = 'play';

var mode = prompt("Which mode do you want to play in (Easy / Medium / Hard / Extreme) USE GRAMMATICAL RULES");

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function preload() {
  bg = loadImage("background.jpg");
}

var options = [];
let canvas;

function setup() {
  mineSound = loadSound('Explosion+1.mp3');
  billyPlay = loadSound('endState.mp3');
  winMp3 = loadSound('scenario.mp3');

  if (mode == "easy" || mode == "Easy"){
    canvas = createCanvas(210, 210);
    canvas.center();
  } else if (mode == "medium" || mode == "Medium") {
    canvas = createCanvas(300, 300);
    canvas.center();
  } else if (mode == "Hard" || mode == "hard") {
    canvas = createCanvas(450, 450);
    canvas.center();
  } else if (mode == "Extreme" || mode == "extreme") {
    canvas = createCanvas(windowWidth, windowHeight);
  } else {
    canvas = createCanvas(210, 210);
    canvas.center();
  }

  cols = floor(width/w);
  rows = floor((height-10)/w);

  grid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].countMines();
    }
  }
}

function draw() {
  if (GameState == 'play') {
    background('turquoise');

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j].display();
      }
    }

    textSize(25);
    fill(0);
    text(`Score: ${score}`, width - (width - 60), height - 7.5);
  }

  if (GameState == 'end') {
    background('red');

    fill('blue');
    textSize(15);
    text("Game Over \n You Stepped on a Mine \n Make Better and \n Thought-through \n Decisions Next Time \n \n Reload to Play Again", width/2, (height/2) - 50)
  }
}

function mousePressed(event) {
  if (event.button == 0) {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          grid[i][j].reveal();
          if (!grid[i][j].mine) {
            score++;
          } else {
            score = 0;
            GameState = 'end';
          }
        }
      }
    }
  }
  
}
