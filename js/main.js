// Check if speechSynthesis API is supported by the browser
if ('speechSynthesis' in window) {
  // Create an instance of SpeechSynthesisUtterance
  const utterance = new SpeechSynthesisUtterance();
  // Set the voice for the utterance
  utterance.voice = speechSynthesis.getVoices()[0];

  // Get the speak button element
  const speakButton = document.getElementById('speak-button');
  // Set a flag to keep track of whether the browser is speaking or not
  let isSpeaking = false;

  // Add event listener for when the speak button is clicked
  speakButton.addEventListener('click', function() {
    if (!isSpeaking) {
      // Get the text content of the current page
      const pageText = document.body.innerText;
      // Split the text content into chunks
      const chunks = splitTextIntoChunks(pageText);
      // Speak the chunks sequentially
      speakChunksSequentially(chunks);
      // Set the flag to true and update the text of the speak button
      isSpeaking = true;
      speakButton.innerText = "Stop";
    } else {
      // Stop speaking and set the flag to false
      stopSpeaking();
      isSpeaking = false;
      // Update the text of the speak button
      speakButton.innerText = "Speak";
    }
  });
}

// Split the given text into chunks with a maximum length of 15000 characters
function splitTextIntoChunks(text) {
  const maxLength = 15000;
  const chunks = [];
  while (text.length > maxLength) {
    let chunk = text.substr(0, maxLength);
    // Find the last space in the chunk and split it there
    const lastSpace = chunk.lastIndexOf(' ');
    if (lastSpace > 0) {
      chunk = chunk.substr(0, lastSpace);
    }
    // Add the chunk to the chunks array and update the remaining text
    chunks.push(chunk);
    text = text.substr(chunk.length);
  }
  // Add the remaining text as the last chunk
  chunks.push(text);
  return chunks;
}

// Speak the given chunks sequentially
function speakChunksSequentially(chunks) {
  if (chunks.length > 0) {
    // Get the first chunk and create an utterance for it
    const chunk = chunks.shift();
    const utterance = new SpeechSynthesisUtterance();
    utterance.voice = speechSynthesis.getVoices()[0];
    utterance.text = chunk;
    // When the utterance ends, speak the remaining chunks or stop speaking
    utterance.onend = function() {
      if (chunks.length > 0) {
        speakChunksSequentially(chunks);
      } else {
        stopSpeaking();
      }
    };
    // Speak the utterance
    speechSynthesis.speak(utterance);
  }
}

// Stop speaking
function stopSpeaking() {
  speechSynthesis.cancel();
}

// Get the submit button element
const submitBtn = document.getElementById("submit-btn");

// Add event listener for when the submit button is clicked
submitBtn.addEventListener("click", function(event) {
  // Prevent the form from submitting and reloading the page
  event.preventDefault();
  
  // Get the selected date from the input element
  const dateInput = document.getElementById("bookingclass");
  const selectedDate = dateInput.value;
  
  // Load the bookings from localStorage
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  
  // Add the new booking to the array and save the updated bookings to localStorage
  bookings.push(selectedDate);
  localStorage.setItem("bookings",

