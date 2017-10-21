var waterDrops = [];

var gravity;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

 
  colorMode(HSB);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {

  colorMode(RGB);
  background(0, 0, 0, 75);

  if (random(1) < 0.15) {
	waterDrops.push(new waterDrop());
  }
  for (var i = waterDrops.length-1; i>=0; i--) {
  	waterDrops[i].update();
 	waterDrops[i].show();

	if (waterDrops[i].done()) {
      		waterDrops.splice(i, 1);
	}
  }
}

  

