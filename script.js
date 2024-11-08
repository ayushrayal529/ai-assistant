let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let femaleVoice = null; // Constant for female voice

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB"; // Set the language
    text_speak.voice = femaleVoice;
    window.speechSynthesis.speak(text_speak);
}

window.addEventListener('load', () => {
    wishMe();
    loadVoices(); // Load available voices
});

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good morning! How may I assist you today?");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon! How may I assist you today?");
    } else {
        speak("Good evening! How may I assist you today?");
    }
}

// Load voices when the browser is ready
function loadVoices() {
    let voices = window.speechSynthesis.getVoices();
    voices.forEach((voice) => {
        if (voice.name.includes('Female')) { // Adjust based on the actual voice names
            femaleVoice = voice;
        }
    });
}

// Button click event to start speech recognition
btn.addEventListener('click', () => {
    recognition.start(); // Start recognition
});

// Speech recognition setup
let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript; // Display recognized text
    takeCommand(transcript); // Process the command
};

recognition.onerror = (event) => {
    console.error("Speech recognition error: ", event.error);
};

// Command processing
function takeCommand(message) {
    message = message.toLowerCase(); // Normalize to lowercase

    // Respond to specific commands
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello! What can I help you with today?");
    } else if (message.includes("who are you")) {
        speak("I am your female AI assistant, dedicated to assisting you. My name is Neha jethwani");
    } else if (message.includes("i love you")) {
        speak("I love you too.");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The current time is " + time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak("Today's date is " + date);
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube.");
        window.open("https://www.youtube.com");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator.");
        window.open("calculator://");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp.");
        window.open("whatsapp://");
    } else if (message.includes('wikipedia')) {
        speak(`Searching Wikipedia for ${message.replace("wikipedia", "").trim()}.`);
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
    } else {
        speak(`Searching for ${message} on the internet.`);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`);
    }
}

// Load voices when the browser is ready
window.speechSynthesis.onvoiceschanged = loadVoices;
