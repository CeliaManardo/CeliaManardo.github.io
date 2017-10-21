function Particle3D(x, y, z, size, color) {
  this.position = createVector(x, y, z);
  this.size = size;
  this.mass = size*1;
  this.velocity = createVector(0, random(4, 8)); 
  this.acceleration = createVector(0, 0);
  this.color = color;

  this.applyForce = function(force, mass){
    this.acceleration.add(force/mass);
  }

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.show = function() {
    
    colorMode(HSB);
    noStroke();
    fill(color, 255, 255);
    translate(this.position.x, this.position.y, this.position.z); 
    sphere(size);
    
        
  }

}
