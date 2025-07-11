import dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();
const openai = new OpenAI();

/**
 * Sends a message to the OpenAI API and returns the result, including token usage.
 * @param {string} userMessage - The user's input
 * @returns {Promise<{ answer: string, tokens: object }>} - The answer and token stats
 */
export async function getOpenAIResponse(userMessage) {
  const chatCompletition = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Make no-sense fun jokes' },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.1,
  });
  const answer = chatCompletition.choices[0].message.content;
  const tokens = chatCompletition.usage.total_tokens;

  return { answer, tokens };
}
