class Cell {
    constructor(i, j, w) {
        // t = this;
        this.i = i;
        this.j = j;
        this.x = i * w;
        this.y = j * w;
        this.w = w;
        this.neighbourCount = 0;

        this.explosion = loadSound('Explosion+1.mp3');

        if (random(1) < 0.25) {
            this.mine = true;
        } else {
            this.mine = false;
        }

        if (mode == "Extreme" || mode == "extreme") {
            if (random(1) < 0.2) {
                this.mine = true;
            } else {
                this.mine = false;
            }
        }

        this.revealed = false;
    }

    display() {
        stroke(0);
        noFill();
        rect(this.x, this.y, this.w, this.w);
        if (this.revealed) {
            if (this.mine) {
                fill('red');
                ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
            } else {
                fill('skyblue');
                noStroke();
                rect(this.x-1, this.y-1, this.w+1, this.w+1);
                textAlign(CENTER);
                if (this.neighborCount == 1) {
                    fill('darkgreen');
                } else if (this.neighborCount == 2) {
                    fill('black');;
                } else if (this.neighborCount == 3) {
                    fill('purple');
                } else if (this.neighborCount == 4) {
                    fill('hotpink')
                } else if (this.neighborCount == 0) {
                    fill('skyblue')
                } else {
                    fill('red');
                }
                textSize(25)
                text(this.neighborCount, this.x + this.w / 2, this.y + this.w / 2 + 7.5);
            }
        }
    }

    countMines() {
        if (this.mine) {
          this.neighborCount = -1;
          return;
        }
        var total = 0;
        for (var xoff = -1; xoff <= 1; xoff++) {
          var i = this.i + xoff;
          if (i < 0 || i >= cols) continue;
      
          for (var yoff = -1; yoff <= 1; yoff++) {
            var j = this.j + yoff;
            if (j < 0 || j >= rows) continue;
      
            var neighbor = grid[i][j];
            if (neighbor.mine) {
              total++;
            }
          }
        }
        this.neighborCount = total;
    };
    
    contains(x, y) {
        return (x > this.x && y > this.y && x < this.x + this.w && y < this.y + this.w);
    }

    reveal() {
        this.revealed = true;

        if (this.neighborCount == 0){
            this.floodFill();
        }
    }

    floodFill = function() {
        for (var xoff = -1; xoff <= 1; xoff++) {
          var i = this.i + xoff;
          if (i < 0 || i >= cols) continue;
      
          for (var yoff = -1; yoff <= 1; yoff++) {
            var j = this.j + yoff;
            if (j < 0 || j >= rows) continue;
      
            var neighbor = grid[i][j];
            // Note the neighbor.bee check was not required.
            // See issue #184
            if (!neighbor.revealed) {
              neighbor.reveal();
            }
          }
        }
      };



// /*  colorize() {
//         fill(100);
//         noStroke();
//         rect(this.x, this.y, this.w, this.w);
//     }

//     updateScore(score) {
//         if(mousePressed() && grid[i][j].contains(mouseX, mouseY) && this.mine == false) {
//             score++;
//             console.log(score);
//         } else if (mousePressed() && grid[i][j].contains(mouseX, mouseY) && this.mine == true) {
//             score -= 5;
//             console.log(score);
//         }
//     }    
// }
//
}