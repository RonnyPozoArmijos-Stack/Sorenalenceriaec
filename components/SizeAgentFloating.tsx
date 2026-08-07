import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, Ruler, RefreshCw, MessageSquare, Image, Check, Bot } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

const SizeAgentFloating: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'table'>('chat');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  
  const initialGreeting: Message = {
    id: '1',
    role: 'assistant',
    content: '¡Hola bella! ✨ Soy tu Asesora Virtual de Tallas en Sorena Lencería. ¿Quieres saber cuál es tu talla ideal? Escríbeme tus medidas de busto/cadera o tu talla habitual de brasier (ej. 34B) y te aconsejaré con todo el gusto del mundo. 💖',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const [messages, setMessages] = useState<Message[]>([initialGreeting]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, isOpen, activeTab]);

  const handleRestartChat = () => {
    setMessages([{
      id: Date.now().toString(),
      role: 'assistant',
      content: '¡Hola de nuevo bella! ✨ Estoy lista para ayudarte con tus medidas o consultas sobre Sorena Lencería. ¿En qué te puedo asesorar hoy? 💖',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setIsEnded(false);
    setInput('');
  };

  const handleEndConversation = () => {
    if (isEnded) return;
    const farewellMsg: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: '¡Muchas gracias por consultar con Sorena Lencería! 💖 Fue un verdadero placer y un honor atenderte. Si necesitas cualquier otra asesoría para resaltar tu elegancia, aquí estaré siempre para ti. ¡Que tengas un día radiante y maravilloso! ✨🌸',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, farewellMsg]);
    setIsEnded(true);
  };

  const getSmartFallbackReply = (userText: string): string => {
    const text = userText.toLowerCase().trim();

    // 1. Despedidas o finalización
    if (text.includes('gracias') || text.includes('chao') || text.includes('adiós') || text.includes('adios') || text.includes('hasta luego') || text.includes('finalizar') || text.includes('listo')) {
      return "¡Muchas gracias a ti bella! 💖 Fue un placer ayudarte a encontrar tu calce perfecto. Si necesitas cualquier otra cosa, siempre estaré aquí para ti. ¡Que tengas un día radiante y maravilloso! ✨";
    }

    // 2. Consultas directas por Tallas específicas (XL, L, M, S, XS, Única)
    if (/\b(xl|extra large|extra grande)\b/.test(text) || text.includes('talla xl') || text.includes('para xl') || text.includes('medidas xl')) {
      return "✨ Para Talla XL: Busto 103-110 cm (Brasier 38B/40B/38C) y Cadera 109-115 cm (Pantalón 42). 💖";
    }

    if (text.includes('talla l') || text.includes('para l') || text.includes('medidas l') || /\b(talla l|soy l|medida l)\b/.test(text)) {
      return "✨ Para Talla L: Busto 96-102 cm (Brasier 36B/38A/36C) y Cadera 103-108 cm (Pantalón 40). 💖";
    }

    if (text.includes('talla m') || text.includes('para m') || text.includes('medidas m') || /\b(talla m|soy m|medida m)\b/.test(text)) {
      return "✨ Para Talla M: Busto 90-95 cm (Brasier 34B/36A/34C) y Cadera 97-102 cm (Pantalón 38). 💖";
    }

    if (text.includes('talla s') || text.includes('para s') || text.includes('medidas s') || /\b(talla s|soy s|medida s)\b/.test(text)) {
      return "✨ Para Talla S: Busto 84-89 cm (Brasier 32B/34A/32C) y Cadera 91-96 cm (Pantalón 36). 💖";
    }

    if (text.includes('talla xs') || text.includes('para xs') || text.includes('medidas xs') || /\b(talla xs|soy xs|medida xs)\b/.test(text)) {
      return "✨ Para Talla XS: Busto 78-83 cm (Brasier 30A/32A/30B) y Cadera 85-90 cm (Pantalón 34). 💖";
    }

    if (text.includes('unica') || text.includes('única') || text.includes('ajustable')) {
      return "✨ La Talla Única Sorena es super versátil: abarca de S a L (busto 84-98 cm, cadera 91-108 cm) gracias a sus correas regulables. 💖";
    }

    // 3. Talla de brasier habitual
    if (/\b(30a|32a|30b)\b/.test(text)) return "✨ Según tu brasier habitual, tu talla ideal en Sorena Lencería es XS. 💖";
    if (/\b(32b|34a|32c)\b/.test(text)) return "✨ Según tu brasier habitual, tu talla ideal en Sorena Lencería es S. 💖";
    if (/\b(34b|36a|34c)\b/.test(text)) return "✨ Según tu brasier habitual, tu talla ideal en Sorena Lencería es M. 💖";
    if (/\b(36b|38a|36c)\b/.test(text)) return "✨ Según tu brasier habitual, tu talla ideal en Sorena Lencería es L. 💖";
    if (/\b(38b|40b|38c)\b/.test(text)) return "✨ Según tu brasier habitual, tu talla ideal en Sorena Lencería es XL. 💖";

    // 4. Medidas en cm expresadas en números
    const numbers = text.match(/\d+/g)?.map(Number) || [];
    if (numbers.length > 0) {
      const num = numbers[0];
      if (num >= 70 && num <= 83) return `✨ Para tu medida de ${num} cm, tu talla ideal en Sorena Lencería es XS. 💖`;
      if (num >= 84 && num <= 89) return `✨ Para tu medida de ${num} cm, tu talla ideal en Sorena Lencería es S. 💖`;
      if (num >= 90 && num <= 95) return `✨ Para tu medida de ${num} cm, tu talla ideal en Sorena Lencería es M. 💖`;
      if (num >= 96 && num <= 102) return `✨ Para tu medida de ${num} cm, tu talla ideal en Sorena Lencería es L. 💖`;
      if (num >= 103 && num <= 115) return `✨ Para tu medida de ${num} cm, tu talla ideal en Sorena Lencería es XL. 💖`;
    }

    // 5. Instrucciones de cómo tomar medidas
    if (text.includes('cómo medir') || text.includes('como medir') || text.includes('dónde medir') || text.includes('donde medir')) {
      return "📏 Para medir tu busto, pasa la cinta sin apretar por la parte más prominente. Para la cadera, mide la parte más ancha. ¡Dime tus cm y te aconsejo tu talla al instante! ✨";
    }

    // 6. Mensaje por defecto
    return "¡Hola bella! ✨ Dime tus medidas de busto/cadera en cm, tu talla de brasier habitual (ej. 34B) o la talla que deseas consultar (XS, S, M, L, XL) y te diré las medidas exactas. 💖";
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    if (isEnded) {
      setIsEnded(false);
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!customText) setInput('');
    setIsLoading(true);

    try {
      const apiMessages = newMessages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/size-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });

      const data = await res.json();
      const replyText = data?.reply || getSmartFallbackReply(textToSend);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.warn("Error connecting to AI size agent, using local fallback:", err);
      const fallbackReply = getSmartFallbackReply(textToSend);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "¿Qué talla soy si uso brasier 34B?",
    "Tengo 90 cm de busto y 96 cm de cadera",
    "¿Cómo mido mi busto y cadera?",
    "¿Qué significa Talla Única?"
  ];

  return (
    <>
      {/* Floating Button Icon */}
      <div className="fixed left-6 bottom-20 md:left-8 md:bottom-8 z-[60]">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative group flex items-center justify-center p-3.5 md:p-4 rounded-full bg-gradient-to-r from-rose-gold via-[#C0788A] to-rose-gold text-white shadow-[0_10px_30px_rgba(212,165,165,0.5)] border border-white/40 cursor-pointer"
        >
          {/* Animated Glow Aura */}
          <div className="absolute inset-0 rounded-full bg-rose-gold opacity-50 animate-ping pointer-events-none" />
          <div className="absolute inset-0 rounded-full bg-rose-gold/30 blur-xl animate-pulse pointer-events-none" />

          <div className="relative flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
            <span className="hidden sm:inline font-sans text-[10px] font-bold uppercase tracking-[0.2em] pr-1">
              ¿Tu Talla?
            </span>
          </div>

          {/* Badge Tooltip */}
          <span className="absolute -top-2 -right-2 bg-rich-black text-white text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-rose-gold/50 shadow-md">
            IA
          </span>
        </motion.button>
      </div>

      {/* Floating Chat Modal Popover & Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop Overlay to dismiss on tap */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs z-[9998]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="fixed inset-x-2 top-8 bottom-16 sm:inset-x-3 sm:top-12 sm:bottom-20 md:top-auto md:bottom-24 md:left-8 md:right-auto z-[9999] w-auto md:w-[420px] max-h-[85vh] md:h-[530px] bg-white dark:bg-luxury-gray rounded-2xl border border-rose-gold/30 shadow-[0_25px_60px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-rich-black via-warm-charcoal to-rich-black text-white px-3.5 py-3 sm:px-4 sm:py-3.5 flex items-center justify-between border-b border-rose-gold/20 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-rose-gold to-white/20 flex items-center justify-center p-0.5 shadow-md shrink-0">
                    <div className="w-full h-full bg-rich-black rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-rose-gold animate-pulse" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full border border-rich-black" />
                  </div>
                  <div>
                    <h3 className="font-serif italic text-sm sm:text-base text-white font-medium flex items-center gap-1.5 leading-tight">
                      Asesora de Tallas Sorena
                    </h3>
                    <p className="text-[9px] text-rose-gold uppercase tracking-[0.2em] font-semibold">
                      Inteligencia Artificial
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Botón X de Cierre destacado y de gran visibilidad */}
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Cerrar asistente"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-gold hover:bg-rose-gold-dark text-white text-[11px] font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-all border border-white/40 cursor-pointer shrink-0"
                    aria-label="Cerrar asistente virtual"
                  >
                    <span>Cerrar</span>
                    <X className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>

            {/* Navigation Tabs (Chat vs Tabla) */}
            <div className="flex border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 text-[10px] font-bold uppercase tracking-[0.2em] shrink-0">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2.5 flex items-center justify-center gap-2 border-b-2 transition-all ${
                  activeTab === 'chat'
                    ? 'border-rose-gold text-rose-gold bg-white dark:bg-luxury-gray'
                    : 'border-transparent text-gray-400 hover:text-warm-charcoal dark:hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Asistente IA</span>
              </button>
              <button
                onClick={() => setActiveTab('table')}
                className={`flex-1 py-2.5 flex items-center justify-center gap-2 border-b-2 transition-all ${
                  activeTab === 'table'
                    ? 'border-rose-gold text-rose-gold bg-white dark:bg-luxury-gray'
                    : 'border-transparent text-gray-400 hover:text-warm-charcoal dark:hover:text-white'
                }`}
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Tabla de Medidas</span>
              </button>
            </div>

            {/* Tab Body */}
            {activeTab === 'chat' ? (
              <div className="flex-1 flex flex-col min-h-0 bg-ivory-light/30 dark:bg-black/40">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-3.5 space-y-3 no-scrollbar">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {m.role === 'assistant' && (
                        <div className="w-6 h-6 rounded-full bg-rose-gold/15 border border-rose-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-3.5 h-3.5 text-rose-gold" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] p-2.5 sm:p-3 rounded-2xl text-xs leading-relaxed shadow-sm font-sans ${
                          m.role === 'user'
                            ? 'bg-rose-gold text-white rounded-br-none'
                            : 'bg-white dark:bg-luxury-gray border border-gray-100 dark:border-white/10 text-warm-charcoal dark:text-soft-white rounded-bl-none'
                        }`}
                      >
                        <p className="whitespace-pre-line">{m.content}</p>
                        <span
                          className={`block text-[8px] mt-1 opacity-60 text-right ${
                            m.role === 'user' ? 'text-white' : 'text-gray-400'
                          }`}
                        >
                          {m.time}
                        </span>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-2 justify-start">
                      <div className="w-6 h-6 rounded-full bg-rose-gold/15 border border-rose-gold/30 flex items-center justify-center shrink-0">
                        <Bot className="w-3.5 h-3.5 text-rose-gold" />
                      </div>
                      <div className="bg-white dark:bg-luxury-gray border border-gray-100 dark:border-white/10 p-2.5 rounded-2xl rounded-bl-none flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-rose-gold rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-rose-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-2 h-2 bg-rose-gold rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Botones de acción fija y sugerencias prediseñadas */}
                <div className="p-2.5 bg-white/90 dark:bg-black/40 border-t border-gray-100 dark:border-white/5 space-y-2 shrink-0">
                  {/* Botones de Acciones Predeterminadas (Opciones para terminar o seguir) */}
                  <div className="flex items-center justify-between gap-1.5">
                    {!isEnded ? (
                      <button
                        onClick={handleEndConversation}
                        className="flex-1 py-1.5 px-2 rounded-full bg-rose-gold/10 hover:bg-rose-gold border border-rose-gold/30 text-rose-gold hover:text-white text-[9px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1"
                      >
                        <span>✨ Finalizar Chat</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleRestartChat}
                        className="flex-1 py-1.5 px-2 rounded-full bg-rose-gold text-white text-[9px] font-bold uppercase tracking-wider shadow-sm hover:bg-rose-gold-dark transition-all flex items-center justify-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Nueva Consulta</span>
                      </button>
                    )}

                    <button
                      onClick={() => setActiveTab('table')}
                      className="flex-1 py-1.5 px-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-warm-charcoal dark:text-soft-white text-[9px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1"
                    >
                      <Ruler className="w-3 h-3" />
                      <span>Ver Tabla</span>
                    </button>
                  </div>

                  {/* Sugerencias Rápidas */}
                  {!isEnded && (
                    <div className="flex gap-1 overflow-x-auto no-scrollbar pt-0.5">
                      {quickPrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(prompt)}
                          className="whitespace-nowrap text-[9px] bg-rose-gold/5 hover:bg-rose-gold/15 text-warm-charcoal dark:text-soft-white border border-rose-gold/20 px-2.5 py-1 rounded-full transition-all shrink-0"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Input Area */}
                {!isEnded && (
                  <div className="p-2.5 bg-white dark:bg-luxury-gray border-t border-gray-100 dark:border-white/10 flex items-center gap-2 shrink-0">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Escribe tu medida o talla habitual..."
                      className="flex-1 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-full px-3.5 py-2 text-xs text-warm-charcoal dark:text-soft-white placeholder-gray-400 focus:outline-none focus:border-rose-gold transition-colors"
                    />
                    <button
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isLoading}
                      className="p-2 rounded-full bg-rose-gold text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-rose-gold-dark transition-all shadow-md active:scale-95"
                      title="Enviar mensaje"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Tab: Visual Size Chart Image */
              <div className="flex-1 p-3 overflow-y-auto flex flex-col items-center justify-center bg-gray-50 dark:bg-black/30">
                <div className="relative w-full h-full min-h-[260px] rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 flex items-center justify-center p-2 shadow-inner">
                  <img
                    src="https://res.cloudinary.com/dyqz0n0to/image/upload/v1780535886/WhatsApp_Image_2026-06-03_at_7.04.25_PM_pmkxff.jpg"
                    alt="Tabla de Tallas Sorena Lencería"
                    className="max-w-full max-h-full object-contain rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 italic text-center mt-2 font-serif">
                  Medidas estándar para tops, brasieres y pantis Sorena.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
};

export default SizeAgentFloating;
