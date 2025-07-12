export function displayAgentAnswer(answer) {
  console.log('\n[Agent Reply]\n', answer, '\n');
}

export function displayTokenUsage(tokens) {
  if (!tokens) return;
  console.log(
    `[Token usage] Prompt: ${tokens.prompt_tokens} | Completion: ${tokens.completion_tokens} | Total: ${tokens.total_tokens}\n`,
  );
}
