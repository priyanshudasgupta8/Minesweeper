var mineSound, billyPlay;
var grid;

var cols;
var rows;
var w = 20;

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function setup() {
  mineSound = loadSound('Explosion+1.mp3');
  billyPlay = loadSound('endState.mp3')
  var canvas = createCanvas(500, 500);

  cols = floor(width/w);
  rows = floor(height/w);

  grid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i*w, j*w, w);
    }
  }
}

function draw() {
  background(100);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].display();
    }
  }
  
}

function mousePressed(event) {
  if (event.button == 0) {
    console.log("No");
    mineSound.play();
  } else {
    billyPlay.loop();
  }
}
