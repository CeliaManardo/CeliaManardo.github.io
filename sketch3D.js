var waterDrops = [];
var gravity;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);

  //perspective(45 / 180 * PI, width/height, 0.5, 0);
  //var fov = 45 / 180 * PI;
  //var cameraZ = (height/2.0) / tan(fov/2.0);
  //perspective(fov, width/height, cameraZ * 0.1, cameraZ * 10);

 
  colorMode(HSB);
  gravity = createVector(0, 0.2, 0);
  background(0);
}

function draw() {

  // viewer's pespective
  camera(0, 0, 0);

  // add interactivity
  orbitControl();

  colorMode(RGB);
  //background(0, 0, 0, 75);
  background(0);

  if (random(1) < 0.3) {
	waterDrops.push(new waterDrop3D());
  }
  for (var i = waterDrops.length-1; i>=0; i--) {
  	waterDrops[i].update();
 	waterDrops[i].show();

	if (waterDrops[i].done()) {
      		waterDrops.splice(i, 1);
	}
  }
}

