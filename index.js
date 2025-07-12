import readline from 'node:readline/promises';
import { SessionChatAgent } from './src/agents/sessionChatAgent.js';
import { PersistentChatAgent } from './src/agents/persistentChatAgent.js';

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(
    '\nChoose your agent:\n1 - SessionMemoryAgent (RAM only)\n2 - PersistentChatAgent (lowdb)\n',
  );
  const choice = await rl.question('Type 1 or 2: ');

  let agent;
  if (choice.trim() === '1') {
    agent = new SessionChatAgent();
    await agent();
    console.log('\n[SessionMemoryAgent loaded. Memory lasts only for this session.]\n');
  } else {
    choice.trim() === '2';
    agent = new PersistentChatAgent();
    await agent.init();
    console.log('\n[PersistentChatAgent loaded. Type "reset" to clear memory.]\n');
  }

  console.log('Type your question for the agent (type "exit" to quit):\n');

  while (true) {
    const userInput = await rl.question('> ');
    if (userInput.trim().toLowerCase() === 'exit' || userInput.trim().toLowerCase() === 'sair') {
      console.log('Exiting...');
      break;
    }
    if (userInput.trim().toLowerCase() === 'reset') {
      await agent.resetHistory();
      console.log('[Agent]Chat history reset!\n');
      continue;
    }

    try {
      const { answer, tokens } = await agent.send(userInput);
      console.log('\n[Agent Reply]\n', answer, '\n');
      console.log(
        `[Token usage] Prompt: ${tokens.prompt_tokens} | Completion: ${tokens.completion_tokens} | Total: ${tokens.total_tokens}\n`,
      );
    } catch (error) {
      console.error('\n[Agent Error]', error.message, '\n');
    }
  }

  rl.close();
}

main();
