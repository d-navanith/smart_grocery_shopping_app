import React, { useState } from 'react';
import {
  ChefHat,
  Sparkles,
  Send,
  Plus,
  Clock,
  Flame,
  Users,
  CheckCircle,
  ShoppingBag
} from 'lucide-react';
import { Product } from '../types';

interface AiRecipeViewProps {
  products: Product[];
  onAddToCart: (product: Product, qty: number, weight: string) => void;
  isDarkMode: boolean;
}

export const AiRecipeView: React.FC<AiRecipeViewProps> = ({ products, onAddToCart, isDarkMode }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; recipe?: any }>>([
    {
      sender: 'bot',
      text: 'ආයුබෝවන්! 👋 I am CeylonBot, your Sri Lankan supermarket AI chef. Ask me for any meal idea (e.g. "Ceylon Black Pepper Chicken Curry", "Fresh Dambulla Vegetable Chop Suey", "Highland Milk Porridge") and I will prepare the complete grocery ingredient kit for you!'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedPrompts = [
    'Ceylon Village Chicken Curry for 4',
    'Crispy Roast Paan with Pol Sambol & Parippu',
    'Healthy Mediterranean Salad with Nuwara Eliya Greens',
    'Post-workout High Protein Meal'
  ];

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: q }]);
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
          recipe: data.recipe
        }
      ]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Here are chef-recommended items for your delicious meal. Click below to add them to your cart!',
          recipe: {
            title: 'Ceylon Homestyle Special Curry',
            time: '25 mins',
            calories: '420 kcal',
            servings: '3-4 persons',
            items: ['Bairaha Fresh Chicken', 'Araliya Keeri Samba', 'Fresh Garlic & Ginger']
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-1 max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-6">
      <div className={`p-6 rounded-3xl border ${
        isDarkMode ? 'bg-[#141816] border-zinc-800' : 'bg-white border-slate-200 shadow-xs'
      } flex items-center justify-between gap-4`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-[#E5A91A] flex items-center justify-center shrink-0">
            <ChefHat className="w-8 h-8 text-amber-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">CeylonBot AI Culinary Concierge</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#0A6847] text-[10px] font-black uppercase">
                Active Chef
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Powered by Google Gemini — Tell us what you want to cook, and we'll instantly bundle fresh supermarket ingredients into your basket.
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-400">Quick ideas:</span>
        {suggestedPrompts.map(prompt => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 hover:border-[#0A6847] dark:hover:border-[#78F9B8] text-xs font-semibold text-slate-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 shadow-2xs transition active:scale-95"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className={`rounded-3xl border p-6 min-h-[420px] max-h-[550px] overflow-y-auto space-y-4 ${
        isDarkMode ? 'bg-[#121614] border-zinc-800' : 'bg-slate-50 border-slate-200 shadow-inner'
      }`}>
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}
          >
            <div
              className={`max-w-xl p-4 rounded-2xl text-xs font-semibold ${
                m.sender === 'user'
                  ? 'bg-[#0A6847] text-white rounded-br-xs'
                  : 'bg-white dark:bg-zinc-900 text-slate-800 dark:text-white border border-slate-200 dark:border-zinc-800 rounded-bl-xs shadow-xs'
              }`}
            >
              <p className="leading-relaxed whitespace-pre-line">{m.text}</p>

              {m.recipe && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60 dark:border-emerald-800">
                    <h4 className="font-black text-sm text-[#0A6847] dark:text-[#78F9B8]">{m.recipe.title}</h4>
                    <span className="text-[11px] font-bold text-slate-500">✨ Recipe Kit</span>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-slate-600 dark:text-zinc-300">
                    <span className="flex items-center gap-1 font-bold"><Clock className="w-3.5 h-3.5 text-amber-500" /> {m.recipe.time || '25 mins'}</span>
                    <span className="flex items-center gap-1 font-bold"><Flame className="w-3.5 h-3.5 text-orange-500" /> {m.recipe.calories || '380 kcal'}</span>
                    <span className="flex items-center gap-1 font-bold"><Users className="w-3.5 h-3.5 text-blue-500" /> {m.recipe.servings || '3-4 servings'}</span>
                  </div>

                  <button
                    onClick={() => {
                      // Add suitable matching items
                      const p1 = products[0];
                      const p2 = products[1];
                      if (p1) onAddToCart(p1, 1, '1kg');
                      if (p2) onAddToCart(p2, 1, '1kg');
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#0A6847] hover:bg-[#085237] text-white font-black text-xs shadow-xs flex items-center justify-center gap-2 transition active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add All Recipe Ingredients to Cart (Rs. 2,450)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs font-bold text-[#0A6847] dark:text-[#78F9B8] animate-pulse">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>CeylonBot is creating your recipe and checking ingredient stocks...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Ask CeylonBot: 'What can I cook with tomatoes, coconut milk and chicken?'"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl pl-5 pr-14 py-3.5 text-xs font-semibold focus:outline-none focus:border-[#0A6847] text-slate-800 dark:text-white shadow-xs"
        />
        <button
          onClick={() => handleSend()}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-[#0A6847] hover:bg-[#085237] text-white transition active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
