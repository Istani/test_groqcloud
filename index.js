var debug = require("@istani/debug")(require('./package.json').name);

var envpath = __dirname + '/.env';
var config = require('dotenv').config({ path: envpath });

const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.API_KEY });

async function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// Funktion zum starten der text generation
async function TextGeneration(prompt, callback) {
  try {
    //console.log("P:" + JSON.stringify(prompt));
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "user",
          "content": prompt
        }
      ],
      //"model": "llama-3.2-90b-text-preview",
      "model": "gemma2-9b-it",
      "temperature": 1,
      "max_tokens": 8192,
      "top_p": 1,
      "stream": false,
      "stop": null
    });
  
    //console.log(chatCompletion.choices[0].message.content);
    callback(chatCompletion.choices[0].message.content.replaceAll("\n",""));
  }
  catch (E) {
    debug.error(JSON.stringify(E));
    await sleep(30*1000);
    TextGeneration(prompt, callback)
  }
}
// Funktion zum starten der image generation
async function ImageGeneration(prompt, callback) {
  debug.error("AI Without Image Generation!");
  callback("");
}

exports.ImageGeneration = ImageGeneration;
exports.TextGeneration = TextGeneration;
