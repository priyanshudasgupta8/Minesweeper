function Cell(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.bee = true;
    this.revealed = true;
}

Cell.prototype.display = function() {
    fill('rgba(0,0,0, 0)');
    rect(this.x, this.y, this.w, this.w);
}