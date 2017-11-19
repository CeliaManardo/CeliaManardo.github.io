var Reverb = function(context, parameters) {

	this.context = context;
	this.input = context.createGain();

	var convolver = context.createConvolver();
	
	var request = new XMLHttpRequest();
	request.open('GET', "./music1.mp3", true);
	request.responseType = 'arraybuffer';
	request.onload = function() {
		context.decodeAudioData(request.response, function(buffer) {
	    		convolver.buffer = buffer; 
			convolver.loop = true;
			convolver.normalize = true;  
		});
	}
	request.send();

	// create nodes
	this.wetGain = context.createGain(); 
	this.dryGain = context.createGain();

	// connect 
	this.input.connect(this.dryGain);
	this.input.connect(convolver);
	convolver.connect(this.wetGain);

	this.dryGain.connect(this.context.destination);
	this.wetGain.connect(this.context.destination);

	this.wetGain.gain.value = parameters.reverbWetDry;
	this.dryGain.gain.value = (1-parameters.reverbWetDry);

	this.parameters = parameters;

}

Reverb.prototype.updateParams = function (params, value) {

	switch (params) {		
		case 'reverb_dry_wet':
			this.parameters.reverbWetDry = value;
			this.wetGain.gain.value = value;
			this.dryGain.gain.value = 1 - value;
			break;		
	}
}
