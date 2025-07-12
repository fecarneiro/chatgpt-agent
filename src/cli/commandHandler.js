export async function handleSpecialCommand(userInput, agent) {
  const command = userInput.trim().toLowerCase();

  if (command === 'exit') {
    console.log('Exiting...');
    return 'exit';
  }

  if (command === 'reset') {
    if (typeof agent.resetHistory === 'function') {
      await agent.resetHistory();
      console.log('[Agent] Chat history reset!\n');
    } else {
      console.log('[Agent] This agent does not support resetting history.\n');
    }
    return 'reset';
  }
  return null;
}
