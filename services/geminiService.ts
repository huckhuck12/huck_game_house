import { GoogleGenAI, Chat } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// 如果可能的话，我们保留一个实例，或者按需创建。
// 注意：在实际应用中，您可能需要更稳健地处理密钥轮换或验证。
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const createGameChat = (gameTitle: string): Chat | null => {
  if (!ai) return null;

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `你是一个热情且乐于助人的 AI 游戏助手，专为游戏“${gameTitle}”设计。
      你的目标是与玩家聊天，在被询问时提供战略建议，为他们加油，并成为一个有趣的伙伴。
      除非解释复杂的规则，否则回复请保持简洁（50字以内）。
      风趣幽默，并适当使用游戏术语。请全程使用中文回答。`,
    },
  });
};

export const streamResponse = async (chat: Chat, message: string, onChunk: (text: string) => void) => {
  try {
    const responseStream = await chat.sendMessageStream({ message });
    
    for await (const chunk of responseStream) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("\n[连接错误：请检查您的 API 密钥]");
  }
};