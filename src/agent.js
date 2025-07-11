import { getOpenAIResponse } from './openaiService.js';

/**
 * Main agent function.
 * @param {string} input - User's input
 * @returns {Promise<{ answer: string, tokens: object }>}
 */
export async function agent(input) {
  const { answer, tokens } = await getOpenAIResponse(input);
  return { answer, tokens };
}
