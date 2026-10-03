import { useState, useEffect } from 'react';
import { X, Send, ExternalLink, MessageCircle } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: 'user' | 'agent'; text: string; time: string }[]
  >([
    {
      sender: 'agent',
      text: '¡Hola! Bienvenido a Uniformes PRE. Soy Raquel, asesora textil de Cancún. ¿En qué puedo ayudarte hoy?',
      time: 'Justo ahora',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const faqList = [
    {
      q: '¿Dónde están ubicados?',
      a: 'Estamos ubicados en SM 92, Manzana 57, 58, 59 Y 60, Dentro de la MEGA Soriana López Portillo, Local 7, Cancún, Q.R. ¡Ven a visitarnos para conocer nuestras telas físicamente!',
    },
    {
      q: '¿Tienen compra mínima?',
      a: 'Para prendas lisas no manejamos compra mínima. Para pedidos con bordado o personalización, la cantidad mínima es a partir de 6 piezas.',
    },
    {
      q: '¿Hacen envíos a todo México?',
      a: '¡Sí! Realizamos envíos a toda la República Mexicana por paquetería express, además de entregas locales programadas en Cancún y toda la Riviera Maya.',
    },
    {
      q: '¿Tiempos de entrega y bordado?',
      a: 'Prendas lisas en inventario entrega inmediata. Para pedidos con bordado: si ya cuentas con ponchado es de 48 a 72 hrs; para ponchados nuevos, de 5 a 7 días hábiles.',
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
      }, 1000);
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
        <div className="w-80 sm:w-96 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[520px] animate-fade-in">
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
                <h4 className="font-bold text-sm text-white" style={{ fontFamily: 'Verdana' }}>Raquel</h4>
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
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-900 min-h-[200px] max-h-[260px]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[85%] ${
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

          {/* Preset Questions (FAQ list chips - non-truncated, clear buttons) */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/90 flex flex-col gap-2">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Preguntas Rápidas:
            </span>
            <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto pr-1">
              {faqList.map((faq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleFaqClick(faq)}
                  className="text-[11px] text-left bg-slate-900 hover:bg-emerald-950/50 hover:border-emerald-500/60 hover:text-white text-slate-300 py-2 px-3 rounded-lg border border-slate-800/80 transition-all cursor-pointer leading-snug flex items-center justify-between group shadow-sm"
                >
                  <span>{faq.q}</span>
                  <span className="text-emerald-400 text-xs opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all ml-1.5 shrink-0">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Real WhatsApp Button - Solid green with white text */}
          <div className="p-3 bg-slate-950 border-t border-slate-800/80">
            <a
              href="https://wa.me/529989370850"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-900/40 transition-all cursor-pointer"
            >
              <MessageCircle className="h-4 w-4 fill-white" />
              <span>Iniciar Chat Real de WhatsApp</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
