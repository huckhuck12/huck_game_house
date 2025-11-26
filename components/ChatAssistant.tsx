import React, { useState, useRef, useEffect } from 'react';
import { Chat } from '@google/genai';
import { createGameChat, streamResponse } from '../services/geminiService';
import { Send, Bot, User, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../types';

interface ChatAssistantProps {
  gameTitle: string;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ gameTitle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatInstance = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.API_KEY;

  useEffect(() => {
    if (apiKey) {
      chatInstance.current = createGameChat(gameTitle);
      setMessages([{
        role: 'model',
        text: `嗨！我是 **${gameTitle}** 的 AI 玩伴。遇到困难了吗？问我吧！`
      }]);
    } else {
        setMessages([{
            role: 'model',
            text: `⚠ 未检测到 API 密钥。`
        }]);
    }
  }, [gameTitle, apiKey]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatInstance.current) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    let fullResponse = '';
    setMessages(prev => [...prev, { role: 'model', text: '', isLoading: true }]);

    await streamResponse(chatInstance.current, userMsg, (chunk) => {
      fullResponse += chunk;
      setMessages(prev => {
        const newMsgs = [...prev];
        const lastMsg = newMsgs[newMsgs.length - 1];
        if (lastMsg.role === 'model') {
          lastMsg.text = fullResponse;
          lastMsg.isLoading = false;
        }
        return newMsgs;
      });
    });

    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!apiKey) {
      return (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center text-gray-400 bg-white">
              <AlertCircle className="mb-2 text-gray-300" size={48} />
              <p className="font-bold">AI 助手已休眠</p>
              <p className="text-xs mt-1">请配置 API Key 以唤醒</p>
          </div>
      )
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 头部 */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2 text-gray-800 font-black text-lg">
          <Sparkles className="text-yellow-400 fill-yellow-400" size={20} />
          <span>AI 助手</span>
        </div>
        <div className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-wider">
          Gemini Powered
        </div>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border
              ${msg.role === 'user' ? 'bg-blue-500 border-blue-600 text-white' : 'bg-white border-gray-200 text-purple-500'}
            `}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={18} />}
            </div>
            
            <div className={`
              max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
              ${msg.role === 'user' 
                ? 'bg-blue-500 text-white rounded-tr-sm' 
                : 'bg-white text-gray-700 rounded-tl-sm border border-gray-100'}
            `}>
              {msg.isLoading && !msg.text ? (
                 <div className="flex gap-1 items-center h-5 px-2">
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-150"></span>
                 </div>
              ) : (
                <div className="prose prose-sm max-w-none prose-p:my-0 prose-headings:my-1 [&>p]:text-inherit [&>h1]:text-inherit [&>h2]:text-inherit [&>h3]:text-inherit [&>strong]:text-inherit">
                  <ReactMarkdown>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入框 */}
      <div className="p-3 bg-white border-t border-gray-100">
        <div className="relative flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="问点什么..."
            disabled={isTyping}
            className="flex-1 bg-gray-100 text-gray-800 rounded-full pl-4 pr-10 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white resize-none h-11 overflow-hidden"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-11 h-11 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors shadow-btn hover:shadow-btn-hover active:translate-y-[2px] active:shadow-none"
          >
            {isTyping ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} className="ml-0.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;