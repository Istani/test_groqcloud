var ai = require("@istani/groq-cloud.ai");
ai.TextGeneration("Tell me a Joke", (response) => {console.log(response);});
