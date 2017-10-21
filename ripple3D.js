function Ripple3D(x, y, z, rippleWidth, rippleHeight, color) {
  this.position = createVector(x, y, z);
  this.lifespan = 100;
  this.width = rippleWidth;
  this.height = rippleHeight;
  this.color = color;

  this.show = function() {
    colorMode(HSB);
    noStroke();
    fill(color, 255, 255, this.lifespan);
    torus(this.width, this.height);
    translate(this.position.x, this.position.y, this.position.z);
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

