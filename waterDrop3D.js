function waterDrop3D() {
 this.color = random(255);
 this.waterDrop3D = new Particle3D(random(-width/2, width/2), -height/2, random(-1000, 1000), random(4, 15), this.color);
 this.ended = false;
 this.ripples = [];

  this.update = function() {
    if (!this.ended) {
    	this.waterDrop3D.applyForce(gravity, this.waterDrop3D.mass);
    	this.waterDrop3D.update();
    	if (this.waterDrop3D.position.y >= height/2 - random(50, 150)) {
		this.ended = true;
                this.end();
    	}	
     }

     for (var i = this.ripples.length - 1; i>=0; i--) {
        this.ripples[i].show();
	this.ripples[i].update();
	while (!this.ripples[i].done()) {
	  this.ripples[i].update();
	  if (this.ripples[i].lifespan === 0) {
		newWidth = this.ripples[i].width + 20;
		if (this.ripples[i].width < 100) {
			var r2 = new Ripple3D(this.waterDrop3D.position.x,  this.waterDrop3D.position.y, this.waterDrop3D.position.z, newWidth, this.waterDrop3D.height, this.waterDrop3D.color);
        		this.ripples.push(r2);
		}
	  }
	}

	if (this.ripples[i].done()) {
          this.ripples.splice(i, 1);
        }
    }
  }

  this.end = function() {
    for (var i = 0; i < 100; i++) {
 	var r = new Ripple3D(this.waterDrop3D.position.x,  this.waterDrop3D.position.y, this.waterDrop3D.position.z, 50, 4, this.waterDrop3D.color);
        this.ripples.push(r);
    }
  }
  
  this.show = function() {
    if (!this.ended) {
    	this.waterDrop3D.show();
    }
  }
  

  
  this.done = function() {
    if (this.ended && this.ripples.length === 0) {
      return true;
    } else {
      return false;
    }
  }
}
 
