import { getOpenAIResponse } from '../openaiService.js';

export class SessionChatAgent {
  constructor(systemPrompt = 'You are a helpful assistant.') {
    this.chatHistory = [{ role: 'system', content: systemPrompt }];
  }

  async send(userInput) {
    this.chatHistory.push({ role: 'user', content: userInput });
    const { answer, tokens } = await getOpenAIResponse(this.chatHistory);
    this.chatHistory.push({ role: 'assistant', content: answer });
    return { answer, tokens };
  }
}
