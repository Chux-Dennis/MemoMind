
import fs from 'fs';
import readline from 'readline';
import { NonSharedBuffer } from 'buffer';
import   stringSimilarity  from 'string-similarity';


const qaFile = 'base.json';
let qaData = fs.existsSync(qaFile)
  ? JSON.parse(fs.readFileSync(qaFile, 'utf-8'))
  : {};


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion() {
  rl.question('Ask your question: ', (question) => {
    const keys = Object.keys(qaData);
    const match = stringSimilarity.findBestMatch(question, keys);

    if (match.bestMatch.rating > 0.8) {
      console.log(`Answer: ${qaData[match.bestMatch.target]}`);
      rl.close();
    } else if (qaData[question]) {
      console.log(`Answer: ${qaData[question]}`);
      rl.close();
    } else {
      rl.question("I don't know that. Can you provide the answer? ", (answer) => {
        qaData[question] = answer;
        fs.writeFileSync(qaFile, JSON.stringify(qaData, null, 2));
        console.log("Thanks! I've saved your answer.");
        rl.close();
      });
    }
  });
}

askQuestion();
