import { getOpenAIResponse } from '../openaiService.js';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const DB_FILE = './db/chatHistory.json';

export class PersistentChatAgent {
  constructor(systemPrompt = 'You are a helpful assistant.') {
    this.db = new Low(new JSONFile(DB_FILE));
    this.systemPrompt = systemPrompt;
    this.chatHistory = null;
  }

  async init() {
    await this.db.read();
    if (!this.db.data) {
      this.db.data = {
        chatHistory: [{ role: 'system', content: this.systemPrompt }],
      };
      await this.db.write();
    }
    this.chatHistory = this.db.data.chatHistory;
  }

  async send(userInput) {
    this.chatHistory.push({ role: 'user', content: userInput });
    const { answer, tokens } = await getOpenAIResponse(this.chatHistory);
    this.chatHistory.push({ role: 'assistant', content: answer });
    await this.saveHistory();
    return { answer, tokens };
  }

  async saveHistory() {
    this.db.data.chatHistory = this.chatHistory;
    await this.db.write();
  }

  async resetHistory() {
    this.chatHistory = [{ role: 'system', content: this.systemPrompt }];
    await this.saveHistory();
  }
}
