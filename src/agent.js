import { getOpenAIResponse } from './openaiService.js';

/**
 * ChatAgent manages the full context of the conversation in memory.
 */
export class ChatAgent {
  constructior(systemPrompt = 'You are a helpful assistant.') {
    this.chatHistory = [{ role: 'system', content: systemPrompt }];
  }

  /**
   * Handles a user message, updates history, and returns the model's answer.
   * @param {string} userInput
   * @returns {Promise<{ answer: string, tokens: object }>}
   */
  async send(userInput) {
    this.chatHistory.push({ role: 'user', content: userInput });

    const { answer, tokens } = await getOpenAIResponse(this.chatHistory);

    this.chatHistory.push({ role: 'assistant', content: answer });

    return { answer, tokens };
  }
}
