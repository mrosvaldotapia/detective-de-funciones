
import React, { useState, useRef, useEffect } from 'react';
import { Message, Case } from '../types';
import { getInspectorFeedback } from '../geminiService';

interface Props {
  currentCase: Case;
}

export const Assistant: React.FC<Props> = ({ currentCase }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Saludos, detective. Soy el Inspector Lógica. He revisado los expedientes del caso "${currentCase.title}". ¿Qué has descubierto en las evidencias hasta ahora?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const feedback = await getInspectorFeedback(currentCase, messages, input);
    setMessages(prev => [...prev, { role: 'assistant', content: feedback }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[600px] glass-panel rounded-2xl overflow-hidden">
      <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center">
        <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center mr-3 shadow-lg">
          <span className="text-xl">🕵️‍♂️</span>
        </div>
        <div>
          <h4 className="font-bold text-slate-100">Inspector Lógica</h4>
          <p className="text-xs text-slate-400">Cuartel General de Matemáticas</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              m.role === 'user' 
                ? 'bg-yellow-600 text-slate-900 font-semibold' 
                : 'bg-slate-700 text-slate-200 border border-slate-600'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 p-3 rounded-2xl animate-pulse flex space-x-2">
              <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-800/50 border-t border-slate-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu hipótesis o duda..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 text-slate-200"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-yellow-600 hover:bg-yellow-500 text-slate-900 px-4 py-2 rounded-xl font-bold transition-colors disabled:opacity-50"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};
