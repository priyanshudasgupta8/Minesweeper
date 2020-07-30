var mineSound, billyPlay, winMp3;
var grid;

var cols;
var rows;
var w = 30;

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var options = [];


function setup() {
  mineSound = loadSound('Explosion+1.mp3');
  billyPlay = loadSound('endState.mp3');
  winMp3 = loadSound('scenario.mp3');
  var canvas = createCanvas(150, 150);

  cols = floor(width/w);
  rows = floor(height/w);

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
  background(150);

  // for (var i = 0; i < cols; i++) {
  //   for (var j = 0; j < rows; j++) {
  //     grid[i][j].updateScore();
  //   }
  // }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].display();
    }
  }
 
}

function mousePressed(event) {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          grid[i][j].reveal();
        }
      }
    }
}

// function mousePressed() {
//   for (var i = 0; i < cols; i++) {
//     for (var j = 0; j < rows; j++) {
//       if (grid[i][j].contains(mouseX, mouseY)) {
//         grid[i][j].colorize();
//       }
//     }
//   }
// }
