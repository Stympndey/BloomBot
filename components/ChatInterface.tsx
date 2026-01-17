
import React, { useState, useEffect, useRef } from 'react';
import { startGardenChat } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current = startGardenChat(
      "You are BloomBot, an expert gardener and plant scientist. You provide helpful, concise, and scientifically accurate gardening advice. If asked about things unrelated to plants, gardening, or nature, politely redirect the user back to botanical topics."
    );
    
    setMessages([
      { role: 'model', text: "Hello! I'm BloomBot. I can help with plant diseases, soil questions, or even landscaping ideas. What's on your mind?", timestamp: Date.now() }
    ]);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const result = await chatRef.current.sendMessageStream({ message: input });
      
      let fullText = '';
      const placeholderId = Date.now();
      
      setMessages(prev => [...prev, { role: 'model', text: '', timestamp: placeholderId }]);

      for await (const chunk of result) {
        fullText += chunk.text;
        setMessages(prev => 
          prev.map(msg => msg.timestamp === placeholderId ? { ...msg, text: fullText } : msg)
        );
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, my root system is a bit tangled. Could you try asking again?", timestamp: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-160px)] flex flex-col">
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-emerald-900/5 border border-emerald-100 flex-grow flex flex-col overflow-hidden">
        <div className="p-6 border-b border-emerald-50 bg-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-900 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-900/20">🪴</div>
            <div>
              <h3 className="font-serif font-bold text-xl text-emerald-950">BloomBot Expert</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Always Rooted & Ready</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-8 bg-emerald-50/20">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-[1.5rem] px-6 py-4 shadow-sm ${
                msg.role === 'user' 
                ? 'bg-emerald-900 text-white rounded-tr-none' 
                : 'bg-white text-emerald-950 border border-emerald-100 rounded-tl-none font-medium'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <span className={`text-[9px] font-black uppercase tracking-widest mt-2 block ${msg.role === 'user' ? 'text-emerald-400' : 'text-emerald-300'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-emerald-100 rounded-[1.5rem] rounded-tl-none px-6 py-4 shadow-sm flex items-center gap-2">
                <span className="text-xs font-black text-emerald-300 uppercase tracking-widest">Thinking</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        <form onSubmit={handleSend} className="p-6 bg-white border-t border-emerald-50">
          <div className="flex gap-3 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about plants..."
              className="flex-grow bg-emerald-50/50 border-2 border-emerald-100 focus:border-emerald-900 focus:ring-0 rounded-[1.5rem] px-6 py-4 text-sm font-medium text-emerald-950 transition-colors"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-emerald-900 text-white p-4 rounded-[1.5rem] hover:bg-emerald-800 transition-all disabled:opacity-50 shadow-lg shadow-emerald-900/20 active:scale-95"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-center text-emerald-800/30 mt-4 font-bold uppercase tracking-widest">Expert botanical advice generated in real-time</p>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
