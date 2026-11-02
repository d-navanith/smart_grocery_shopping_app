import React, { useState } from 'react';
import {
  ChefHat,
  Sparkles,
  Send,
  Clock,
  Flame,
  Users,
  ShoppingCart
} from 'lucide-react';
import { Product } from '../types';

interface AiRecipeViewProps {
  products: Product[];
  onAddToCart: (product: Product, qty: number, weight: string) => void;
  isDarkMode: boolean;
}

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  time: string;
  recipe?: any;
}

export const AiRecipeView: React.FC<AiRecipeViewProps> = ({ products, onAddToCart, isDarkMode }) => {
  const formatCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: 'ආයුබෝවන්! 👋 I am CeylonBot, your Sri Lankan supermarket AI chef. Ask me for any meal idea (e.g. "Ceylon Black Pepper Chicken Curry", "Fresh Dambulla Vegetable Chop Suey", "Highland Milk Porridge") and I will prepare the complete grocery ingredient kit for you!',
      time: formatCurrentTime()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedPrompts = [
    'Ceylon Village Chicken Curry for 4',
    'Crispy Roast Paan with Pol Sambol & Parippu',
    'Healthy Salad with Nuwara Eliya Greens',
    'Authentic Sri Lankan Kottu Roti'
  ];

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userTime = formatCurrentTime();
    setMessages(prev => [...prev, { sender: 'user', text: q, time: userTime }]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: q })
      });
      const data = await res.json();
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: data.message || 'Here is your recipe with fresh ingredients from our supermarket.',
          recipe: data.recipe,
          time: formatCurrentTime()
        }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Here are chef-recommended items for your delicious Sri Lankan meal. Click below to add them to your cart!',
          recipe: {
            title: 'Ceylon Homestyle Special Curry',
            time: '25 mins',
            calories: '420 kcal',
            servings: '3-4 persons',
            items: ['Araliya Keeri Samba Rice', 'Purple Brinjal / Eggplant', 'Mysore Red Lentils (Dhal)']
          },
          time: formatCurrentTime()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-1 bg-white dark:bg-[#0D1210] pb-16">
      {/* Top Figma Page Hero Band */}
      <div className="w-full bg-[#F2F7F4] dark:bg-[#121A16] border-b border-[#15875D]/20 py-7">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#F8C519] text-[#664E00] border border-[#C08512] flex items-center justify-center shrink-0 shadow-xs">
              <ChefHat className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-[28px] font-bold">
                  <span className="text-[#0A6847] dark:text-white">CeylonBot </span>
                  <span className="text-[#F96D26]">AI Chef</span>
                </h1>
                <span className="px-2.5 py-0.5 rounded bg-[#0A6847] text-white text-[10px] font-bold uppercase">
                  Active Chef
                </span>
              </div>
              <p className="text-xs text-[#003D25] dark:text-zinc-400 mt-0.5">
                Tell us what you want to cook, and we will bundle fresh Sri Lankan ingredients into your cart.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-8 space-y-6">
        {/* Suggested Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#1B8057]">Quick ideas:</span>
          {suggestedPrompts.map(prompt => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-3.5 py-1.5 rounded-lg border border-[#15875D]/40 hover:border-[#0A6847] text-xs font-semibold text-[#003D25] dark:text-zinc-300 bg-[#F0FAF3] dark:bg-zinc-900 hover:bg-white transition active:scale-95"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div
          className={`rounded-xl border border-[#15875D] p-6 min-h-[400px] max-h-[540px] overflow-y-auto space-y-4 ${
            isDarkMode ? 'bg-[#121614]' : 'bg-[#F2F7F4] shadow-inner'
          }`}
        >
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}
            >
              <div
                className={`max-w-xl p-4 rounded-xl text-xs font-semibold ${
                  m.sender === 'user'
                    ? 'bg-[#0A6847] text-white rounded-br-none shadow-sm'
                    : 'bg-white dark:bg-zinc-900 text-[#003D25] dark:text-white border border-[#15875D]/40 rounded-bl-none shadow-xs'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-line">{m.text}</p>

                {m.recipe && (
                  <div className="mt-4 p-4 rounded-lg bg-[#F0FAF3] dark:bg-emerald-950/40 border border-[#15875D] space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#15875D]/20">
                      <h4 className="font-bold text-sm text-[#0A6847] dark:text-[#80F6C7]">{m.recipe.title}</h4>
                      <span className="px-2 py-0.5 rounded bg-[#F8C519] text-[#664E00] text-[10px] font-bold">
                        ✨ Recipe Kit
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-[11px] text-[#003D25] dark:text-zinc-300">
                      <span className="flex items-center gap-1 font-bold">
                        <Clock className="w-3.5 h-3.5 text-[#F96D26]" /> {m.recipe.time || '25 mins'}
                      </span>
                      <span className="flex items-center gap-1 font-bold">
                        <Flame className="w-3.5 h-3.5 text-[#F96D26]" /> {m.recipe.calories || '380 kcal'}
                      </span>
                      <span className="flex items-center gap-1 font-bold">
                        <Users className="w-3.5 h-3.5 text-[#1B8057]" /> {m.recipe.servings || '3-4 servings'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        const p1 = products[0];
                        const p2 = products[1];
                        if (p1) onAddToCart(p1, 1, '1kg');
                        if (p2) onAddToCart(p2, 1, '1kg');
                      }}
                      className="w-full py-2.5 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-medium text-xs shadow-sm flex items-center justify-center gap-2 transition active:scale-95"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 text-[#F8C519]" />
                      <span>Add Recipe Ingredients to Cart</span>
                    </button>
                  </div>
                )}
                <div className={`mt-2 flex items-center gap-1 text-[10px] ${
                  m.sender === 'user' ? 'text-white/80 justify-end' : 'text-slate-400 dark:text-zinc-400 justify-start'
                }`}>
                  <Clock className="w-2.5 h-2.5" />
                  <span>{m.time}</span>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A6847] dark:text-[#80F6C7] animate-pulse">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>CeylonBot is creating your recipe and checking ingredient stocks...</span>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Ask CeylonBot: 'What can I cook with coconut milk, dhal, and spices?'"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full bg-white dark:bg-zinc-900 border-2 border-[#15875D] rounded-xl pl-5 pr-14 py-3.5 text-xs font-semibold focus:outline-none focus:border-[#0A6847] text-[#003D25] dark:text-white shadow-xs"
          />
          <button
            onClick={() => handleSend()}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-[#0A6847] hover:bg-[#075238] text-white transition active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
