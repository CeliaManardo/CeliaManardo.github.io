function waterDrop() {
 colorMode(RGB);
 this.color = color(bass, mid, treb);
 this.ended = false;
 this.ripples = [];
 this.rms = analyzer.getLevel(); // Get the average (root mean square) amplitude

 this.waterDrop = new Particle(random(-width, width), -height, 5+this.rms*15, this.color); 


  this.update = function() {
    if (!this.ended) {
    	this.waterDrop.applyForce(gravity, this.mass);
    	this.waterDrop.update();
    	if (this.waterDrop.position.y >= random(100,150)) {
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
		newHeight = this.ripples[i].height + 10;
		if (this.ripples[i].width < 100 && this.ripples[i].height < 50) {
			var r2 = new Ripple(this.waterDrop.position.x,  this.waterDrop.position.y, newWidth, newHeight, this.waterDrop.color);
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
 	var r = new Ripple(this.waterDrop.position.x,  this.waterDrop.position.y, this.rms,this.rms, this.waterDrop.color);
        this.ripples.push(r);
    }
  }
  
  this.show = function() {
    if (!this.ended) {
    	this.waterDrop.show();
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
 
