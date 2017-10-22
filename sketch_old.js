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

function preload() {
  song = loadSound('./demo1.mp3');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

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
  
  angleMode(DEGREES);
  colorMode(HSB);
  fill(random(100, 200), 255, 80);
  noStroke();
  translate(width/2, height/2);
  beginShape();
  for (var i = 0; i < spectrum.length; i++) {
    var angle = map(i, 0, spectrum.length, 0, 360);
    var thisLevel = spectrum[i];
    var r = map(thisLevel, 0, 256, 20, 100);
    var x = r*cos(angle);
    var y = r*sin(angle);
    vertex(x,y);
  }
  endShape();

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
  backgroundColor = color(random(0, 80), random(0, 80), random(0, 80) );
}


