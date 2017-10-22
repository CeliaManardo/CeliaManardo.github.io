function PerlinParticle() {
	this.position = createVector(random(width), random(height));
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);
	this.maxspeed = 2;
	
	this.prevPos = this.pos.copy();
	
	this.update = function() {
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxspeed);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
	}
	
	this.applyForce = function(force) {
		this.acceleration.add(force);
	}
	
	this.follow = function(vectors) {
		var x = floor(this.position.x/scl);
		var y = floor(this.position.y/scl);
		var index = x + y*cols;
		var force = vectors[index];
		this.applyForce(force);
	}
	
	this.show = function() {
		stroke(0, 5);
		strokeWeight(1);
		line (this.position.x, this.position.y, this.prevPos.x, this.prevPos.y);
		//point(this.position.x, this.position.y);
		this.updatePrev();
	}
	
	this.updatePrev = function() {
		this.prevPos.x = this.position.x;
		this.prevPos.y = this.position.y;
	}
	
	this.edges = function() {
		if (this.position.x > width) {
			this.position.x = 0;
			this.updatePrev();
		}
		if (this.position.x < 0 ) {
			this.position.x = width;
			this.updatePrev();
		}
		if (this.position.y > height) {
			this.position.y = 0;
			this.updatePrev();
		}
		if (this.position.y < 0) {
			this.position.y = height;
			this.updatePrev();
		}
}