import readline from 'node:readline/promises';
import { SessionChatAgent } from './src/agents/sessionChatAgent.js';

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const agent = new SessionChatAgent();

  console.log('\nType your question for the agent (type "exit" to quit):\n');

  while (true) {
    const userInput = await rl.question('> ');
    if (userInput.trim().toLowerCase() === 'exit' || userInput.trim().toLowerCase() === 'sair') {
      console.log('Exiting...');
      break;
    }

    const { answer, tokens } = await agent.send(userInput);
    console.log('\nResponse from the agent:\n', answer);
    console.log('\nToken usage:', tokens);
  }
  rl.close();
}

main();
