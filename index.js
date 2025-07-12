import readline from 'node:readline/promises';
import { displayAgentOptions, createAgentByChoice } from './src/agents/agentManager.js';
import { handleSpecialCommand } from './src/cli/commandHandler.js';
import { createCliInterface, promptUser } from './src/cli/cliInterface.js';
import { displayAgentAnswer, displayTokenUsage } from './src/cli/responseDisplay.js';

async function main() {
  const rl = createCliInterface();

  displayAgentOptions();
  const agentChoice = await promptUser(rl, 'Enter the agent number: ');
  const agent = await createAgentByChoice(agentChoice);

  if (!agent) {
    console.log('\n[Invalid choice, exiting...]\n');
    rl.close();
    return;
  }

  console.log('Type your question for the agent (type "exit" to quit):\n');

  while (true) {
    const userInput = await promptUser(rl, '> ');
    const commandResult = await handleSpecialCommand(userInput, agent);
    if (commandResult === 'exit') break;
    if (commandResult === 'reset') continue;

    try {
      const { answer, tokens } = await agent.send(userInput);
      displayAgentAnswer(answer);
      displayTokenUsage(tokens);
    } catch (error) {
      console.error('\n[Agent Error]', error.message, '\n');
    }
  }

  rl.close();
}

main();
