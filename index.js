import readline from 'node:readline/promises';
import { agent } from './src/agent.js';

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('\nType your question for the agent (type "exit" to quit):\n');

  while (true) {
    const userInput = await rl.question('> ');
    if (userInput.trim().toLowerCase() === 'exit' || userInput.trim().toLowerCase() === 'sair') {
      console.log('Exiting...');
      break;
    }

    const { answer, tokens } = await agent(userInput);
    console.log('\nResponse from the agent:\n', answer);
    console.log('\nToken usage:', tokens);
  }
  rl.close();
}

main();
