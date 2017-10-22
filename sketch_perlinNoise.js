var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff =0;
var perlinParticles = [];
var flowfield;

function setup() {
    createCanvas(200, 200);
	cols = floor(width/ scl);
	rows = floor(height/scl);
	
	flowfield = new Array (cols*rows);
	
	for (var i = 0;  i < 500; i++) {
		perlinParticles[i] = new PerlinParticle();
	}
	background(255);
	
}

function draw() {
	var yoff = 0;
	for (var y = 0; y < rows; y++) {
		var xoff = 0;
		for (var x = 0; x < cols; x++) {
			//var index = (x + y*width)*4;
			var index = x + y*cols;
			var angle = noise (xoff, yoff, zoff)* TWO_PI *4;
			var v = p5.Vector.fromAngle(angle);
			v.setMag(1);
			flowfield[index] = v;
			xoff += inc;
			stroke(0, 50);
			//push();
			//translate(x*scl, y*scl);
			//rotate(v.heading());
			//strokeWeight(1);
			//line(0, 0, scl, 0);
			//pop();
		}
		yoff += inc;
		zoff += 0.0004;
	}
	for (var i = 0;  i <perlinParticles.length; i++) {
		perlinParticles[i].follow(flowfield);
		perlinParticles[i].update();
		perlinParticles[i].show();
		perlinParticles[i].edges();
	}
}