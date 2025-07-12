import readline from 'node:readline/promises';
import { displayAgentOptions, createAgentByChoice } from './src/agents/agentManager.js';
import { handleSpecialCommand } from './src/cli/commandHandler.js';

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  displayAgentOptions();
  const choice = (await rl.question('Type 1 or 2: ')).trim();
  const agent = await createAgentByChoice(choice);

  if (!agent) {
    console.log('\n[Invalid choice, exiting...]\n');
    rl.close();
    return;
  }

  console.log('Type your question for the agent (type "exit" to quit):\n');

  while (true) {
    const userInput = await rl.question('> ');
    const commandResult = await handleSpecialCommand(userInput, agent);
    if (commandResult === 'exit') break;
    if (commandResult === 'reset') continue;

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
