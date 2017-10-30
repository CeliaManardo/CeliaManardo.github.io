function Ripple(x, y, rippleWidth, rippleHeight, color) {
  this.position = createVector(x, y);
  this.lifespan = 100;
  this.width = rippleWidth;
  this.height = rippleHeight;
  this.color = color;

  this.show = function() {
    colorMode(HSB);
    noFill();
    stroke(color, 255, 255, this.lifespan);
    strokeWeight(2);
    ellipse(this.position.x, this.position.y, this.width, this.height);
  }

  this.update = function() {
    this.lifespan -= 2;
    
  }

  this.done = function() {
    if (this.lifespan <= 0) {
	return true;
    } else {
	return false;
    }
  }
}

