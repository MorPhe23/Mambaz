if ('speechSynthesis' in window) {
  var utterance = new SpeechSynthesisUtterance();
  utterance.voice = speechSynthesis.getVoices()[0];
  var speakButton = document.getElementById('speak-button');
  var isSpeaking = false;

  speakButton.addEventListener('click', function() {
    if (!isSpeaking) {
      var pageText = document.body.innerText;
      var chunks = splitTextIntoChunks(pageText);
      speakChunksSequentially(chunks);
      isSpeaking = true;
      speakButton.innerText = "Stop";
    } else {
      stopSpeaking();
      isSpeaking = false;
      speakButton.innerText = "Speak";
    }
  });
}

function splitTextIntoChunks(text) {
  var maxLength = 15000; // maximum length per chunk
  var chunks = [];
  while (text.length > maxLength) {
    var chunk = text.substr(0, maxLength);
    var lastSpace = chunk.lastIndexOf(' ');
    if (lastSpace > 0) {
      chunk = chunk.substr(0, lastSpace);
    }
    chunks.push(chunk);
    text = text.substr(chunk.length);
  }
  chunks.push(text);
  return chunks;
}

function speakChunksSequentially(chunks) {
  if (chunks.length > 0) {
    var chunk = chunks.shift();
    var utterance = new SpeechSynthesisUtterance();
    utterance.voice = speechSynthesis.getVoices()[0];
    utterance.text = chunk;
    utterance.onend = function() {
      if (chunks.length > 0) {
        speakChunksSequentially(chunks);
      } else {
        isSpeaking = false;
        speakButton.innerText = "Speak";
      }
    };
    speechSynthesis.speak(utterance);
  }
}

function stopSpeaking() {
  speechSynthesis.cancel();
}