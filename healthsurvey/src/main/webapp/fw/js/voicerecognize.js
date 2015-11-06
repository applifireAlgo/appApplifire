var searchCommand = [];
searchCommand.push("search");
searchCommand.push("find");
searchCommand.push("go");
var currentScope;
var final_span = "";
var interim_span = "";
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
	upgrade();
} else {
	start_button = 'inline-block';
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;

	recognition.onstart = function() {
		recognizing = true;
		currentScope.up().up().up().down("#voice").setIcon(
				'images/mic-animate.gif');
	};

	recognition.onerror = function(event) {
		if (event.error == 'no-speech') {
			
			currentScope.up().up().up().down("#voice")
					.setIcon('images/mic.gif');
			alert("No speech was detected. You may need to adjust your microphone");
			ignore_onend = true;
		}
		if (event.error == 'audio-capture') {
			
			currentScope.up().up().up().down("#voice")
					.setIcon('images/mic.gif');
			alert("No microphone was found. Ensure that a microphone is installed");
			ignore_onend = true;
		}
		if (event.error == 'not-allowed') {
			if (event.timeStamp - start_timestamp < 100) {
				alert("Permission to use microphone is blocked.");
			} else {
				alert("Permission to use microphone was denied.");
			}
			ignore_onend = true;
		}
	};

	recognition.onend = function() {
		recognizing = false;
		if (ignore_onend) {

			return;
		}
		currentScope.up().up().up().down("#voice").setIcon('images/mic.gif');

		if (!final_transcript) {

			return;
		}
		showInfo('');
		if (window.getSelection) {
			window.getSelection().removeAllRanges();
			var range = document.createRange();
			range.selectNode(document.getElementById('final_span'));
			window.getSelection().addRange(range);
		}

	};

	recognition.onresult = function(event) {

		var interim_transcript = '';
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
				final_transcript = event.results[i][0].transcript;
			} else {
				interim_transcript += event.results[i][0].transcript;
			}
		}
		var isSearchCommand = false;
		var inputWords = final_transcript.split(' ');

		for (var k = 0; k < inputWords.length; k++) {

			if (searchCommand.indexOf(inputWords[k]) != -1) {

				isSearchCommand = true;
				final_transcript = final_transcript.replace(inputWords[k], '');
			}
		}
		currentScope.up().up().up().down("#searchs").setValue(final_transcript.trim());
		if (isSearchCommand) {
			searchButtonCommand(currentScope);
		}
		if (recognizing) {

			recognition.stop();
			return;
		}

		if (final_transcript || interim_transcript) {
			showButtons('inline-block');
		}
	};
}

function upgrade() {
	start_button.style.visibility = 'hidden';
	alert("Web Speech API is not supported by this browser.");
}