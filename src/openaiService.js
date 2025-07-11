import dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();
const openai = new OpenAI();

export async function getOpenAIResponse(messages) {
  const chatCompletition = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    temperature: 0.7,
  });
  const answer = chatCompletition.choices[0].message.content;
  const tokens = chatCompletition.usage.total_tokens;

  return { answer, tokens };
}
