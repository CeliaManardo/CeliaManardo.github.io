var backgroundColor;
var gravity;

var song, analyzer;

// FFT variable
var fft;
var binCount = 1024;
var smoothing = 0.8;

// Beat detection variable
var beatHoldFrames = 30;
var beatThreshold = 0.11;
var beatCutoff = 0;
var beatDecayRate = 0.98; 
var framesSinceLastBeat = 0;

var waterDrops = [];

var bass, mid, treb;

// Background Perlin Noise
var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff =0;
var perlinParticles = [];
var flowfield;

function preload() {
  song = loadSound('./demo1.mp3');
}

function setup() {
  createCanvas(550, 400);

  colorMode(HSB);
  gravity = createVector(0, 0.2);

  song.loop();

  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();

  // Patch the input to an volume analyzer
  analyzer.setInput(song);


  fft = new p5.FFT(smoothing, binCount);
  fft.setInput(song);

  stroke(255);
  strokeWeight(4);
  colorMode(RGB);
  backgroundColor = color(0, 0, 0);

	cols = floor(width/ scl);
	rows = floor(height/scl);
	
	flowfield = new Array (cols*rows);
	
	for (var i = 0;  i < 200; i++) {
		perlinParticles[i] = new PerlinParticle();
	}

}

function draw() {
  colorMode(RGB);
  background(backgroundColor);

  var level = analyzer.getLevel();
  detectBeat(level);

  var spectrum = fft.analyze(binCount);

  bass = fft.getEnergy('bass');
  mid = fft.getEnergy('mid');
  treb = fft.getEnergy('treble');


  if (random(1) < 0.3) {
	waterDrops.push(new waterDrop());
  }
  
  //angleMode(DEGREES);
  //colorMode(HSB);
  //fill(random(100, 200), 255, 80);
  //noStroke();
	var yoff = 0;
	for (var y = 0; y < rows; y++) {
		var xoff = 0;
		for (var x = 0 ; x < cols; x++) {
			//var index = (x + y*width)*4;
			var index = x + y*cols;
			var angle = noise (xoff, yoff, zoff)* TWO_PI *4;
			//var v = p5.Vector.fromAngle(angle);
			//v.setMag(0.5);
                        var thisLevel = spectrum[index];
    			var new_angle = map(thisLevel, 0, 256, 0, angle);
			var v = p5.Vector.fromAngle(new_angle);
			v.setMag(0.5);
			flowfield[index] = v;
			xoff += inc;
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
                perlinParticles[i].edges();
		//beginShape();
		perlinParticles[i].show();
		//endShape();
	}
  translate(width/2, height/2);
  for (var i = waterDrops.length-1; i>=0; i--) {
       waterDrops[i].update();
       waterDrops[i].show();

	if (waterDrops[i].done()) {
      		waterDrops.splice(i, 1);
	}
  }
  

}

function detectBeat(level) {
  if (level  > beatCutoff && level > beatThreshold){
    onBeat();
    beatCutoff = level *1.2;
    framesSinceLastBeat = 0;
  } else{
    if (framesSinceLastBeat <= beatHoldFrames){
      framesSinceLastBeat ++;
    }
    else{
      beatCutoff *= beatDecayRate;
      beatCutoff = Math.max(beatCutoff, beatThreshold);
    }
  }
}

function onBeat() {
  colorMode(HSB);
  backgroundColor = color(random(0, 40), random(0, 40), random(0, 40) );
}


