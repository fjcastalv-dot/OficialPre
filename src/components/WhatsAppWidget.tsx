import { useState, useEffect } from 'react';
import { X, Send, ExternalLink, MessageCircle } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: 'user' | 'agent'; text: string; time: string }[]
  >([
    {
      sender: 'agent',
      text: '¡Hola! Bienvenido a Uniformes PRE. Soy Sofía, asesora textil de Cancún. ¿En qué puedo ayudarte hoy?',
      time: 'Justo ahora',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const faqList = [
    {
      q: '¿Dónde están ubicados?',
      a: 'Estamos ubicados en SM 92, Manzana 57, 58, 59 Y 60, Dentro de la MEGA Soriana López Portillo, Local 7, Cancún, Q.R. ¡Ven a visitarnos para conocer nuestras telas físicamente!',
    },
    {
      q: '¿Tienen compra mínima?',
      a: 'Para pedidos con bordado o sublimado personalizado, nuestra cantidad mínima recomendada es de 10 piezas para ofrecerle el mejor precio por volumen.',
    },
    {
      q: '¿Hacen entregas en Playa del Carmen?',
      a: '¡Sí! Hacemos envíos y entregas programadas en toda la Riviera Maya: Cancún, Isla Mujeres, Playa del Carmen, Cozumel, Tulum y Chetumal.',
    },
    {
      q: '¿Cuánto tardan los bordados?',
      a: 'Una vez autorizada la pre-prensa y muestra física del logotipo, el tiempo promedio de entrega es de 5 a 8 días hábiles, dependiendo del volumen.',
    },
  ];

  const handleSendMessage = (text: string, isUserMessage = true) => {
    if (!text.trim()) return;

    const currentTime = new Date().toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
    });

    if (isUserMessage) {
      setMessages((prev) => [...prev, { sender: 'user', text, time: currentTime }]);
      setInputVal('');

      // Find matching FAQ response
      const matchedFaq = faqList.find((faq) => text.toLowerCase().includes(faq.q.toLowerCase()) || faq.q.toLowerCase().includes(text.toLowerCase()));
      const responseText = matchedFaq
        ? matchedFaq.a
        : '¡Excelente pregunta! Para darte una cotización a medida sobre ese requerimiento, te sugiero iniciar un chat directo con nuestro equipo comercial de Cancún.';

      // Simulate Agent typing delay
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { sender: 'agent', text: responseText, time: currentTime }]);
      }, 1200);
    }
  };

  const handleFaqClick = (faq: { q: string; a: string }) => {
    handleSendMessage(faq.q, true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans" id="whatsapp-widget">
      {/* Floating Green circular button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none cursor-pointer group"
          aria-label="Chat de WhatsApp"
          id="whatsapp-fab"
        >
          <MessageCircle className="h-7 w-7 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute right-16 bg-slate-900 border border-slate-800 text-slate-100 font-semibold text-xs py-1.5 px-3 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            ¿Dudas? Chat con nosotros
          </span>
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[500px] animate-fade-in">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-slate-800 border border-emerald-400 flex items-center justify-center text-lg">
                  👩‍💼
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-400 rounded-full border border-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white" style={{ fontFamily: 'Verdana' }}>Sofía</h4>
                <p className="text-[10px] text-emerald-100">En línea • Uniformes PRE</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full bg-emerald-700/50 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-900 min-h-[220px] max-h-[300px]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[80%] ${
                  msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div
                  style={{ fontFamily: 'system-ui' }}
                  className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-0.5">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2 bg-slate-800 text-slate-400 rounded-lg rounded-bl-none text-xs w-16">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce [animation-delay:0.2s]">.</span>
                <span className="animate-bounce [animation-delay:0.4s]">.</span>
              </div>
            )}
          </div>

          {/* Preset Questions (FAQ list chips) */}
          <div className="p-2 border-t border-slate-800 bg-slate-900/50 flex gap-1.5 overflow-x-auto scrollbar-none">
            {faqList.map((faq, idx) => (
              <button
                key={idx}
                onClick={() => handleFaqClick(faq)}
                className="text-[10px] bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 py-1.5 px-3.5 rounded-full shrink-0 border border-slate-700/80 transition-colors cursor-pointer"
              >
                {faq.q}
              </button>
            ))}
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputVal)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-600"
            />
            <button
              onClick={() => handleSendMessage(inputVal)}
              className="p-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Real WhatsApp link */}
          <div className="bg-emerald-950/40 p-2 border-t border-slate-800/50 text-center">
            <a
              href="https://wa.me/529989370850"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold uppercase tracking-wider"
            >
              Iniciar Chat Real de WhatsApp <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
