var pulseSynth    = new Tone.Synth(pulseOptions).toMaster();
var squareSynth   = new Tone.Synth(squareOptions).toMaster();
var triangleSynth = new Tone.Synth(triangleOptions).toMaster();
var noiseSynth    = new Tone.NoiseSynth().toMaster();

var song = {};
var pulsePart    = new Tone.Part();
var squarePart   = new Tone.Part();
var trianglePart = new Tone.Part();
var noisePart    = new Tone.Part();

var noteNamesPulse = [];
var noteNamesSquare = [];
var noteNamesTriangle = [];
var noteNamesNoise = [];

var button0 = document.getElementById('song0');
var button1 = document.getElementById('song1');
var button_record = document.getElementById('btn_record');
var button_record_stop = document.getElementById('btn_record_stop');
var button_play = document.getElementById('btn_play');
var button_stop = document.getElementById('btn_stop');
var button_pulse1 = document.getElementById('pulse1');
var button_pulse2 =document.getElementById('pulse2');
var button_triangle =document.getElementById('triangle');
var button_noise =document.getElementById('noise');

var t = 0;
var recording_on = false;

var chebyshevSlider = document.getElementById("chebyshev");
var freeverbSlider = document.getElementById("freeverb");

var keyCodeNotes = {
  81: 'B4', // q
  87: 'A#4', // w
  69: 'A4', // e
  82: 'G#4', // r
  84: 'G4', // t
  89: 'F#4', // y
  85: 'F4', // u
  73: 'E4', // i
  79: 'D#4', // o
  80: 'D4', // p
  219: 'C#4', // [
  221: 'B3', // ]

  65: 'A#3', // a
  83: 'A3', // s
  68: 'G#3', // d
  70: 'F#3', // f
  71: 'F3', // g
  72: 'E3', // h
  74: 'D#3', // j
  75: 'C#3', // k
  76: 'C3', // l
  186: 'E5', // ;
  222: 'F5', // '

  90: 'D5', // z
  88: 'C5', // x
  67: 'A#2', // c
  86: 'G#2', // v
  66: 'F#2', // b
  78: 'A2', // n
  77: 'F2', // m
  188: 'G2', // ,
  190: 'B2', // .
  191: 'F1', // /

};

var keyNotesCode = {
  'B4' : 81, // q
  'A#4' : 87, // w
  'A4' : 69, // e
  'G#4' : 82, // r
  'G4' : 84, // t
  'F#4' : 89, // y
  'F4' : 85, // u
  'E4' : 73, // i
  'D#4': 79, // o
  'D4' : 80, // p
  'C#4' : 219, // [
  'B3' : 221, // ]

  'A#3' : 65, // a
  'A3' : 83, // s
  'G#3': 68, // d
  'F#3' : 70, // f
  'F3' : 71, // g
  'E3' : 72, // h
  'D#3' : 74, // j
  'C#3' : 75, // k
  'C3' : 76, // l
  'E5' : 186, // ;
  'F5' : 222, // '

  'D5' : 90, // z
  'C5' : 88, // x
  'A#2' : 67, // c
  'G#2' : 86, // v
  'F#2' : 66, // b
  'A2': 78, // n
  'F2' : 77, // m
  'G2' : 188, // ,
  'B2' : 190, // .
  'F1' : 191, // /

};

// INITIALISATION
var OscChosen = "pulse1";

var reverbSend = pulseSynth.send("reverb", -Infinity);
var reverb = new Tone.Freeverb(0.8, 4000).receive("reverb").toMaster();

var chebySend = pulseSynth.send("cheby", -Infinity);
var cheby = new Tone.Chebyshev(100).receive("cheby").toMaster();


freeverbSlider.oninput = function() {
	reverbSend.gain.value = freeverbSlider.value;
}

chebyshevSlider.oninput = function() {
	chebySend.gain.value = chebyshevSlider.value;
}

button_pulse1.addEventListener('click', function(){
	OscChosen = "pulse1";
	reverbSend = pulseSynth.send("reverb", -Infinity);
	chebySend = pulseSynth.send("cheby", -Infinity);
})
button_pulse2.addEventListener('click', function(){
	OscChosen = "pulse2";
	reverbSend = squareSynth.send("reverb", -Infinity);
	chebySend = squareSynth.send("cheby", -Infinity);
})
button_triangle.addEventListener('click', function(){
	OscChosen = "triangle";
	reverbSend = triangleSynth.send("reverb", -Infinity);
	chebySend = triangleSynth.send("cheby", -Infinity);
})
button_noise.addEventListener('click', function(){
	OscChosen = "noise";
	reverbSend = noiseSynth.send("reverb", -Infinity);
	chebySend = noiseSynth.send("cheby", -Infinity);
})


function setSong(index) {
  
  song = songs[index];
  
  pulsePart.removeAll();
  squarePart.removeAll();
  trianglePart.removeAll();
  noisePart.removeAll();
  
  if(song.pulse != null) {
    pulsePart = new Tone.Part(function(time, note){
      pulseSynth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
	  if (OscChosen == "pulse1") {
		var keyCodetoPush = keyNotesCode[note.name];
		if (keyCodetoPush != null) {
			init();
			changeKeyElemDown( keyCodetoPush, 'add' );
			setTimeout(function() {
				changeKeyElemDown( keyCodetoPush, 'remove' );
			}, note.duration);
		}
	  }
    }, song.pulse);
  }
  
  if(song.square != null) {
    squarePart = new Tone.Part(function(time, note){  
      squareSynth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
	  if (OscChosen == "pulse2") {
		var keyCodetoPush = keyNotesCode[note.name];
		if (keyCodetoPush != null) {
			init();
			changeKeyElemDown( keyCodetoPush, 'add' );
			setTimeout(function() {
				changeKeyElemDown( keyCodetoPush, 'remove' );
			}, note.duration);
		}
	  }
    }, song.square);
  }
  
  if(song.triangle != null) {
    trianglePart = new Tone.Part(function(time, note){
      triangleSynth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
	  if (OscChosen == "triangle") {
		var keyCodetoPush = keyNotesCode[note.name];
		console.log(keyCodetoPush);
		if (keyCodetoPush != null) {
			init();
			changeKeyElemDown( keyCodetoPush, 'add' );
			setTimeout(function() {
				changeKeyElemDown( keyCodetoPush, 'remove' );
			}, note.duration);
		}
	  }
    }, song.triangle);
  }
  
  if(song.noise != null) {
    noisePart = new Tone.Part(function(time, note){
      noiseSynth.triggerAttackRelease(note.duration, time, note.velocity);
	  if (OscChosen == "noise") {
		init();
		var keyCodetoPush = 81;
		changeKeyElemDown( keyCodetoPush, 'add' );
		setTimeout(function() {
			changeKeyElemDown( keyCodetoPush, 'remove' );
		}, note.duration);
	  }
    }, song.noise);
  }
  
}

function start_recording() {
	noteNamesPulse = [];
    noteNamesSquare = [];
	noteNamesTriangle = [];
	noteNamesNoise = [];
	recording_on = true;
	t = 0;
}
function stop_recording() {
	recording_on = false;
}

function start() {

  if(song.pulse != null)    pulsePart.start(0);
  if(song.square != null)   squarePart.start(0);
  if(song.triangle != null) trianglePart.start(0);
  if(song.noise != null)    noisePart.start(0); 

}

function stop() {

  if(song.pulse != null)    pulsePart.stop(0);
  if(song.square != null)   squarePart.stop(0);
  if(song.triangle != null) trianglePart.stop(0);
  if(song.noise != null)    noisePart.stop(0);
  

}


button0.addEventListener('click', function(){
	setSong(0);  
  if(button0.textContent =='Stop') {
    Tone.Transport.stop();
    button0.textContent = 'Zelda'; 

    stop();

  } else {
    
    Tone.Transport.start('+0.1', 0);   
    
    start();
    
    Tone.Transport.stop('+' + song.length);
    
    button0.textContent = 'Stop'; 
	button1.textContent = 'Mario';
  }
})

button1.addEventListener('click', function(){
  setSong(1);
  if(button1.textContent =='Stop') {
    Tone.Transport.stop();
    button1.textContent = 'Mario'; 

    stop();

  } else {
    
    Tone.Transport.start('+0.1', 0);   
    
    start();
    
    Tone.Transport.stop('+' + song.length);
    
    button1.textContent = 'Stop'; 
	button0.textContent = 'Zelda';
  }
})

var keyboardElem = document.querySelector('.keyboard');

function changeKeyElemDown( keyCode, method ) {
  var keyElem = keyboardElem.querySelector( '.keyboard__key--' + keyCode );
  keyElem.classList[ method ]('is-down');
}

document.addEventListener('keydown', function(event) {	
init();
changeKeyElemDown( event.keyCode, 'add' );
// keyboard mapping
if (recording_on) {
	var noteName =  keyCodeNotes[ event.keyCode ];
	if (OscChosen == "pulse1") {
		pulseSynth.triggerAttackRelease(noteName, "8n");
		noteNamesPulse[t] = [t, noteName];
		
	} else if (OscChosen == "pulse2") {
		squareSynth.triggerAttackRelease(noteName, "8n");
		noteNamesSquare[t] = [t, noteName];
	} else if (OscChosen == "triangle") {
		triangleSynth.triggerAttackRelease(noteName, "8n");
		noteNamesTriangle[t] = [t, noteName];
	} else if (OscChosen == "noise") {
		noiseSynth.triggerAttackRelease("8n");
		noteNamesNoise[t] = [t, noteNamesNoise];
	}	
	t = t+1;
} else {	
	var noteName =  keyCodeNotes[ event.keyCode ];
	if (OscChosen == "pulse1") {
		pulseSynth.triggerAttackRelease(noteName, "8n");
	} else if (OscChosen == "pulse2") {
		squareSynth.triggerAttackRelease(noteName, "8n");
	} else if (OscChosen == "triangle") {
		triangleSynth.triggerAttackRelease(noteName, "8n");
	} else if (OscChosen == "noise") {
		noiseSynth.triggerAttackRelease("8n");
	}
	
}
});

document.addEventListener('keyup', function(event) {	
	changeKeyElemDown( event.keyCode, 'remove' );
});

button_record.addEventListener('click', function(){
  start_recording();
})

button_record_stop.addEventListener('click', function(){
  stop_recording();
})

button_play.addEventListener('click', function(){
	console.log(noteNamesPulse);
	console.log(noteNamesSquare);
	console.log(noteNamesTriangle);
	console.log(noteNamesNoise);
	Tone.Transport.start('+0.1', 0);  
	if (noteNamesPulse != null) {
		var pulse_part = new Tone.Part(function(time, note){
			pulseSynth.triggerAttackRelease(note, "8n", time);
		}, noteNamesPulse).start(0);
	}
	if (noteNamesSquare != null) {
		var square_part = new Tone.Part(function(time, note){
			squareSynth.triggerAttackRelease(note, "8n", time);
		}, noteNamesSquare).start(0);
	}
	if (noteNamesTriangle != null) {
		var triangle_part = new Tone.Part(function(time, note){
			triangleSynth.triggerAttackRelease(note, "8n", time);
		}, noteNamesTriangle).start(0);
	}
	if (noteNamesNoise != null) {
		var noise_part = new Tone.Part(function(time, note){
			noiseSynth.triggerAttackRelease("8n");
		}, noteNamesNoise).start(0);
	}
	Tone.Transport.stop('+' + t);
})

button_stop.addEventListener('click', function(){
  pulsePart.stop(0);
  squarePart.stop(0);
  trianglePart.stop(0);
  noisePart.stop(0);
})