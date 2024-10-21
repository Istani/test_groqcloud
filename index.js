var debug = require("@istani/debug")(require('./package.json').name);

var envpath = __dirname + '/.env';
var config = require('dotenv').config({ path: envpath });

const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.API_KEY });


// Todo: Irgendwas mit Datenbank damit die Generation nicht verschwindet und gleichzeitig den Callback ersetzen?

// Funktion zum starten der text generation
async function TextGeneration(prompt, callback) {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "user",
        "content": prompt
      }
    ],
    "model": "llama3-8b-8192",
    "temperature": 1,
    "max_tokens": 8192,
    "top_p": 1,
    "stream": false,
    "stop": null
  });

  //console.log(chatCompletion.choices[0].message.content);
  callback(chatCompletion.choices[0].message.content);
}
// Funktion zum starten der image generation
async function ImageGeneration(prompt, callback) {
  callback("");
}

exports.ImageGeneration = ImageGeneration;
exports.TextGeneration = TextGeneration;
