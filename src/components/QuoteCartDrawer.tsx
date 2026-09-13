import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, FileText, CheckCircle, ArrowRight, Download, RefreshCw, Send, Sparkles, CameraOff, AlertCircle } from 'lucide-react';
import { CartItem, Product, QuoteRequest } from '../types';
import { getProductTierPrice, getChestEmbroideryPrice, getBackEmbroideryPrice, formatCurrency } from '../utils';
import {
  sanitizeText,
  stripMaliciousContent,
  validateName,
  validateEmail,
  validatePhone,
  checkRateLimit,
  recordSubmission,
} from '../security';
import { trackEvent } from '../analytics';
// @ts-ignore
import brandLogo from '../assets/images/logo_pre.png';
import { LOGO_PRE_URL } from '../../imaganes/Imagenes inicio/Logo';
// @ts-ignore
import poloMarino from '../assets/images/polo_marino.webp';

interface QuoteCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (
    productId: string,
    quantity: number,
    size?: string,
    color?: string,
    hasChestEmbroidery?: boolean,
    hasBackEmbroidery?: boolean,
    corte?: string,
    manga?: string
  ) => void;
  onRemoveItem: (
    productId: string,
    size?: string,
    color?: string,
    hasChestEmbroidery?: boolean,
    hasBackEmbroidery?: boolean,
    corte?: string,
    manga?: string
  ) => void;
  onClearCart: () => void;
}

export default function QuoteCartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: QuoteCartDrawerProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState<QuoteRequest | null>(null);

  if (!isOpen) return null;

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate dynamic totals using tier pricing + embroidery add-ons
  const total = cart.reduce((acc, item) => {
    const basePrice = getProductTierPrice(item.product, item.quantity);
    const chestPrice = item.hasChestEmbroidery ? getChestEmbroideryPrice(item.quantity) : 0;
    const backPrice = item.hasBackEmbroidery ? getBackEmbroideryPrice(item.quantity) : 0;
    const unitPrice = basePrice + chestPrice + backPrice;
    return acc + (unitPrice * item.quantity);
  }, 0);

  const garmentsSubtotal = cart.reduce((acc, item) => {
    return acc + (getProductTierPrice(item.product, item.quantity) * item.quantity);
  }, 0);
  const embroiderySubtotal = total - garmentsSubtotal;

  // Since prices are IVA Included, we extract subtotal and IVA mathematically for standard invoice format
  const subtotal = total / 1.16;
  const iva = total - subtotal;

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setRateLimitError(null);

    // Rate Limit check (Tope de solicitudes de cotización)
    const rateLimit = checkRateLimit();
    if (!rateLimit.allowed) {
      setRateLimitError(
        `Has alcanzado el límite de seguridad (máximo 3 solicitudes cada 10 minutos). Por favor espera ${rateLimit.retryAfterMinutes} minuto(s) o contáctanos de forma directa al 998 937 0850 / 998 341 5683.`
      );
      return;
    }

    // Input Validation
    const newErrors: Record<string, string> = {};
    const nameVal = validateName(name);
    if (!nameVal.isValid) newErrors.name = nameVal.error!;

    const emailVal = validateEmail(email);
    if (!emailVal.isValid) newErrors.email = emailVal.error!;

    const phoneVal = validatePhone(phone);
    if (!phoneVal.isValid) newErrors.phone = phoneVal.error!;

    if (cart.length === 0) {
      newErrors.cart = 'Debes tener al menos 1 prenda en tu cotizador.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Sanitize user strings before storing / PDF / WhatsApp
    const cleanName = sanitizeText(stripMaliciousContent(name));
    const cleanCompany = sanitizeText(stripMaliciousContent(company)) || 'Particular';
    const cleanEmail = sanitizeText(stripMaliciousContent(email));
    const cleanPhone = sanitizeText(stripMaliciousContent(phone));
    const cleanNotes = sanitizeText(stripMaliciousContent(notes));

    // Simulate official quote number and storage
    setTimeout(() => {
      recordSubmission();
      trackEvent('submit_quote', { itemsCount: cart.length, totalAmount: total });

      const quoteId = `PRE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newQuote: QuoteRequest = {
        id: quoteId,
        items: [...cart],
        customerName: cleanName,
        customerEmail: cleanEmail,
        customerPhone: cleanPhone,
        customerCompany: cleanCompany,
        notes: cleanNotes,
        status: 'completed',
        createdAt: new Date().toLocaleDateString('es-MX', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setSubmittedQuote(newQuote);
      setIsSubmitting(false);
      onClearCart(); // Empty the cart
    }, 1200);
  };

  const getWhatsAppURL = (quote: QuoteRequest) => {
    const itemsText = quote.items
      .map((item) => {
        const basePrice = getProductTierPrice(item.product, item.quantity);
        const chestPrice = item.hasChestEmbroidery ? getChestEmbroideryPrice(item.quantity) : 0;
        const backPrice = item.hasBackEmbroidery ? getBackEmbroideryPrice(item.quantity) : 0;
        const finalUnit = basePrice + chestPrice + backPrice;
        const lineTotal = finalUnit * item.quantity;

        let details = `Talla: ${item.size || 'Unica'}`;
        if (item.corte) details += ` | Corte: ${item.corte}`;
        if (item.manga) details += ` | Manga: ${item.manga}`;
        if (item.color) details += ` | Color: ${item.color}`;
        if (item.hasChestEmbroidery) details += ` | +Bordado Frente`;
        if (item.hasBackEmbroidery) details += ` | +Bordado Espalda`;

        return `• *${item.quantity} pz* x ${item.product.name} (${item.product.code})\n  _${details}_\n  Subtotal: ${formatCurrency(lineTotal)}`;
      })
      .join('\n\n');

    const totalQuoteAmount = quote.items.reduce((acc, item) => {
      const basePrice = getProductTierPrice(item.product, item.quantity);
      const chestPrice = item.hasChestEmbroidery ? getChestEmbroideryPrice(item.quantity) : 0;
      const backPrice = item.hasBackEmbroidery ? getBackEmbroideryPrice(item.quantity) : 0;
      const finalUnit = basePrice + chestPrice + backPrice;
      return acc + (finalUnit * item.quantity);
    }, 0);

    const text = `*SOLICITUD DE COTIZACIÓN PRE: ${quote.id}*\n\n` +
      `👤 *Cliente:* ${quote.customerName}\n` +
      `🏢 *Empresa:* ${quote.customerCompany}\n` +
      `📞 *WhatsApp:* ${quote.customerPhone}\n` +
      `📧 *Email:* ${quote.customerEmail}\n\n` +
      `📋 *PRENDAS SOLICITADAS:*\n${itemsText}\n\n` +
      `💰 *Total Estimado:* ${formatCurrency(totalQuoteAmount)} MXN (IVA Incluido)\n\n` +
      (quote.notes ? `📝 *Notas:* ${quote.notes}\n\n` : '') +
      `📌 _Generado en la web oficial de Uniformes PRE Cancún._`;

    return `https://wa.me/529989370850?text=${encodeURIComponent(text)}`; // Official Cancun sales line
  };

  const handleDownloadPDF = async (quote: QuoteRequest) => {
    try {
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const quoteTotal = quote.items.reduce((acc, item) => {
        const basePrice = getProductTierPrice(item.product, item.quantity);
        const chestPrice = item.hasChestEmbroidery ? getChestEmbroideryPrice(item.quantity) : 0;
        const backPrice = item.hasBackEmbroidery ? getBackEmbroideryPrice(item.quantity) : 0;
        const finalUnit = basePrice + chestPrice + backPrice;
        return acc + (finalUnit * item.quantity);
      }, 0);

      // Color Palette
      const navy = [11, 20, 48];
      const orange = [249, 115, 22];
      const lightGray = [245, 247, 250];
      const borderGray = [220, 225, 235];

      // Header Background Accent
      doc.setFillColor(navy[0], navy[1], navy[2]);
      doc.rect(0, 0, 210, 36, 'F');

      // Company Logo Image & Address
      try {
        const logoImg = await new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = brandLogo;
        });

        // Compute aspect ratio preserving fit
        const maxW = 55;
        const maxH = 18;
        const ratio = (logoImg.naturalWidth && logoImg.naturalHeight)
          ? (logoImg.naturalWidth / logoImg.naturalHeight)
          : 2.8;
        let w = maxW;
        let h = maxW / ratio;
        if (h > maxH) {
          h = maxH;
          w = maxH * ratio;
        }

        doc.addImage(logoImg, 'PNG', 15, 6, w, h);
      } catch (imgErr) {
        // Fallback text if image fails to render
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.text('UNIFORMES', 15, 18);
        doc.setTextColor(orange[0], orange[1], orange[2]);
        doc.text('PRE', 72, 18);
      }

      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(200, 210, 230);
      doc.text('SM 92 MEGA Soriana López Portillo, Local 7, Cancún, Q. Roo', 15, 30);

      // Quote Reference & Date Box
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(138, 7, 57, 21, 2, 2, 'F');
      doc.setTextColor(navy[0], navy[1], navy[2]);
      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'bold');
      doc.text(`COTIZACIÓN: ${quote.id}`, 142, 15);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 110);
      doc.text(quote.createdAt, 142, 22);

      // Customer Information Card
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
      doc.roundedRect(15, 42, 180, 26, 2, 2, 'FD');

      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(130, 130, 140);
      doc.text('DATOS DEL CLIENTE:', 20, 48);
      doc.text('CONTACTO:', 110, 48);

      doc.setFontSize(10);
      doc.setTextColor(navy[0], navy[1], navy[2]);
      doc.text(quote.customerName, 20, 55);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 90);
      doc.text(`Empresa: ${quote.customerCompany || 'Particular'}`, 20, 62);

      doc.text(`Email: ${quote.customerEmail}`, 110, 55);
      doc.text(`Tel: ${quote.customerPhone}`, 110, 62);

      // Table Header
      let currentY = 74;
      doc.setFillColor(navy[0], navy[1], navy[2]);
      doc.rect(15, currentY, 180, 8, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text('DESCRIPCIÓN DE PRENDA Y ACABADOS', 18, currentY + 5.5);
      doc.text('CANT.', 130, currentY + 5.5, { align: 'center' });
      doc.text('P. UNIT', 155, currentY + 5.5, { align: 'right' });
      doc.text('TOTAL', 190, currentY + 5.5, { align: 'right' });

      currentY += 8;

      // Table Items
      quote.items.forEach((item, index) => {
        const basePrice = getProductTierPrice(item.product, item.quantity);
        const chestPrice = item.hasChestEmbroidery ? getChestEmbroideryPrice(item.quantity) : 0;
        const backPrice = item.hasBackEmbroidery ? getBackEmbroideryPrice(item.quantity) : 0;
        const unitPrice = basePrice + chestPrice + backPrice;
        const lineTotal = unitPrice * item.quantity;

        // Row background
        if (index % 2 === 0) {
          doc.setFillColor(252, 252, 254);
        } else {
          doc.setFillColor(242, 245, 250);
        }
        doc.rect(15, currentY, 180, 14, 'F');
        doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
        doc.line(15, currentY + 14, 195, currentY + 14);

        // Product Title
        doc.setTextColor(navy[0], navy[1], navy[2]);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(item.product.name, 18, currentY + 5);

        // Specs
        let specs = `Talla: ${item.size || 'Unitalla'}`;
        if (item.corte) specs += ` | Corte: ${item.corte}`;
        if (item.manga) specs += ` | Manga: ${item.manga}`;
        if (item.color) specs += ` | Color: ${item.color}`;
        if (item.hasChestEmbroidery) specs += ` | +Bordado Pecho`;
        if (item.hasBackEmbroidery) specs += ` | +Bordado Espalda`;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(110, 110, 120);
        doc.text(specs, 18, currentY + 10);

        // Quantity, Unit Price, Total
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(navy[0], navy[1], navy[2]);
        doc.text(`${item.quantity} pz`, 130, currentY + 8, { align: 'center' });

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 90);
        doc.text(formatCurrency(unitPrice), 155, currentY + 8, { align: 'right' });

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(navy[0], navy[1], navy[2]);
        doc.text(formatCurrency(lineTotal), 190, currentY + 8, { align: 'right' });

        currentY += 14;
      });

      // Total Box
      currentY += 6;
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.setDrawColor(orange[0], orange[1], orange[2]);
      doc.setLineWidth(0.6);
      doc.roundedRect(110, currentY, 85, 16, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(navy[0], navy[1], navy[2]);
      doc.text('Total Estimado:', 115, currentY + 10);

      doc.setFontSize(13);
      doc.setTextColor(orange[0], orange[1], orange[2]);
      doc.text(`${formatCurrency(quoteTotal)} MXN`, 190, currentY + 10.5, { align: 'right' });

      // Notes if any
      currentY += 24;
      if (quote.notes) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(navy[0], navy[1], navy[2]);
        doc.text('Notas / Desglose de tallas:', 15, currentY);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(90, 90, 100);
        doc.text(quote.notes, 15, currentY + 5, { maxWidth: 180 });
        currentY += 14;
      }

      // Mandatory WhatsApp Notice Box
      doc.setFillColor(236, 253, 245);
      doc.setDrawColor(52, 211, 153);
      doc.setLineWidth(0.4);
      doc.roundedRect(15, currentY, 180, 18, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(6, 95, 70);
      doc.text('¡IMPORTANTE PARA CULMINAR SU PEDIDO!', 20, currentY + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(4, 120, 87);
      doc.text('Para culminar y procesar su cotización con éxito, es indispensable y forzoso enviarla vía WhatsApp', 20, currentY + 11);
      doc.text('a nuestro equipo de atención en Cancún al 998 937 0850 o 998 341 5683 para validar inventario y producción.', 20, currentY + 15);

      // Footer
      doc.setFontSize(7.5);
      doc.setTextColor(140, 140, 150);
      doc.text('Uniformes PRE Cancún • SM 92 MEGA Soriana López Portillo • Tel. 998 937 0850 / 998 341 5683 • ventas@uniformespre.com', 105, 285, { align: 'center' });

      doc.save(`Cotizacion-${quote.id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      window.print();
    }
  };

  const handleReset = () => {
    setSubmittedQuote(null);
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setNotes('');
  };

  // Calculate submitted quote total directly from quote items
  const submittedQuoteTotal = submittedQuote
    ? submittedQuote.items.reduce((acc, item) => {
        const basePrice = getProductTierPrice(item.product, item.quantity);
        const chestPrice = item.hasChestEmbroidery ? getChestEmbroideryPrice(item.quantity) : 0;
        const backPrice = item.hasBackEmbroidery ? getBackEmbroideryPrice(item.quantity) : 0;
        const unitPrice = basePrice + chestPrice + backPrice;
        return acc + (unitPrice * item.quantity);
      }, 0)
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="quote-cart-drawer">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-xs cursor-pointer" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-xl bg-slate-900 border-l border-slate-850 text-slate-200 shadow-2xl flex flex-col h-full relative">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-2.5">
              <FileText className="h-5 w-5 text-orange-500" />
              <h3 className="font-display text-2xl text-white tracking-wider">
                {submittedQuote ? 'Hoja de Cotización' : 'Mi Cotización'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            {submittedQuote ? (
              // ==================================================
              // PRINTABLE & WHATSAPP GENERATED COOPERATE CONFIRMATION
              // ==================================================
              <div className="space-y-6 animate-fade-in" id="printable-quote">
                <div className="text-center space-y-2 border-b border-slate-800 pb-5">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-3xl mb-1 animate-bounce">
                    ✓
                  </div>
                  <h4 className="font-display text-2xl text-white tracking-wide">
                    ¡COTIZACIÓN PREPARADA!
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                    Su solicitud ha sido pre-procesada. <strong className="text-orange-400 font-semibold">Para poder culminar el proceso y validar existencias, es forzoso e indispensable enviar esta cotización vía WhatsApp</strong> a nuestro asesor de ventas en Cancún.
                  </p>
                </div>

                {/* Printable Quote Sheet */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 font-sans text-xs shadow-inner">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                    <div>
                      <span className="font-display text-2xl text-white tracking-wider">
                        UNIFORMES <span className="text-orange-500">PRE</span>
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1">SM 92 MEGA Soriana López Portillo, Cancún, Q.Roo</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-orange-600/10 text-orange-400 border border-orange-500/20 font-mono text-[10px] font-bold px-2.5 py-1 rounded">
                        {submittedQuote.id}
                      </span>
                      <p className="text-[10px] text-slate-500 mt-1">{submittedQuote.createdAt}</p>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="grid grid-cols-2 gap-4 border-b border-slate-800 pb-4 text-slate-300">
                    <div>
                      <span className="text-[9px] uppercase text-slate-500 block font-bold tracking-wider">CLIENTE:</span>
                      <span className="font-bold text-white">{submittedQuote.customerName}</span>
                      <p className="text-slate-400 mt-0.5 font-mono">{submittedQuote.customerCompany}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase text-slate-500 block font-bold tracking-wider">CONTACTO:</span>
                      <p className="text-slate-400 font-mono">{submittedQuote.customerEmail}</p>
                      <p className="text-slate-400 font-mono">{submittedQuote.customerPhone}</p>
                    </div>
                  </div>

                  {/* Items list with dynamic prices */}
                  <div className="space-y-3">
                    <span className="text-[9px] uppercase text-slate-500 block font-bold tracking-wider">DETALLE DE PRENDAS Y ACABADOS:</span>
                    <div className="divide-y divide-slate-800/60 max-h-48 overflow-y-auto pr-1">
                      {submittedQuote.items.map((item, idx) => {
                        const basePrice = getProductTierPrice(item.product, item.quantity);
                        const chestPrice = item.hasChestEmbroidery ? getChestEmbroideryPrice(item.quantity) : 0;
                        const backPrice = item.hasBackEmbroidery ? getBackEmbroideryPrice(item.quantity) : 0;
                        const finalUnit = basePrice + chestPrice + backPrice;
                        const rowTotal = finalUnit * item.quantity;

                        return (
                          <div key={idx} className="py-2.5 flex justify-between gap-4 text-slate-300">
                            <div>
                              <span
                                className="font-bold text-white text-xs"
                                style={{ fontFamily: 'Verdana, sans-serif' }}
                              >
                                {item.product.name}
                              </span>
                              <div className="flex flex-wrap gap-1.5 items-center mt-1">
                                <span className="px-1.5 py-0.5 rounded bg-slate-900 text-[8px] font-mono font-bold text-orange-400">
                                  Talla {item.size || 'Unitalla'}
                                </span>
                                {item.corte && (
                                   <span className="px-1.5 py-0.5 rounded bg-slate-900 text-[8px] font-mono text-orange-300 border border-orange-500/10">
                                    {item.corte}
                                  </span>
                                )}
                                {item.manga && (
                                  <span className="px-1.5 py-0.5 rounded bg-slate-900 text-[8px] font-mono text-cyan-300 border border-cyan-500/10">
                                    {item.manga}
                                  </span>
                                )}
                                {item.color && (
                                  <span className="px-1.5 py-0.5 rounded bg-slate-900 text-[8px] font-mono text-slate-300">
                                    Col: {item.color}
                                  </span>
                                )}
                                {item.hasChestEmbroidery && (
                                  <span className="px-1.5 py-0.5 rounded bg-orange-950/40 border border-orange-500/20 text-[8px] font-mono text-orange-300">
                                    + Pecho
                                  </span>
                                )}
                                {item.hasBackEmbroidery && (
                                  <span className="px-1.5 py-0.5 rounded bg-orange-950/40 border border-orange-500/20 text-[8px] font-mono text-orange-300">
                                    + Espalda
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-500 mt-1 font-mono">
                                Prenda: {formatCurrency(basePrice)}
                                {item.hasChestEmbroidery && ` | Bordado Pecho: +${formatCurrency(chestPrice)}`}
                                {item.hasBackEmbroidery && ` | Bordado Espalda: +${formatCurrency(backPrice)}`}
                              </p>
                            </div>
                            <div className="text-right font-mono text-slate-300 shrink-0 self-center">
                              <span className="block font-bold text-slate-400">{item.quantity} pz</span>
                              <span className="block font-bold text-white text-xs mt-0.5">
                                {formatCurrency(rowTotal)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Calculated Total */}
                  <div className="border-t border-slate-800 pt-3 flex justify-between items-center text-sm font-bold font-mono">
                    <span className="text-white font-sans text-sm">Total Estimado:</span>
                    <span className="text-orange-500 text-base font-bold">{formatCurrency(submittedQuoteTotal)} MXN</span>
                  </div>

                  {submittedQuote.notes && (
                    <div className="border-t border-slate-800 pt-3 text-[10px] text-slate-400 leading-relaxed text-left">
                      <strong>Notas Especiales / Desglose de tallas:</strong>
                      <p className="text-slate-500 mt-1 italic">{submittedQuote.notes}</p>
                    </div>
                  )}

                  <p className="text-[9px] text-center text-slate-500 leading-tight">
                    * Esta es una pre-cotización formal preliminar. Al contactar por WhatsApp, validaremos existencias inmediatas en Cancún y optimizaremos su logotipo para producción.
                  </p>
                </div>

                {/* Primary WhatsApp sending and PDF Download */}
                <div className="space-y-2">
                  <a
                    href={getWhatsAppURL(submittedQuote)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20"
                    id="send-whatsapp-quote-btn"
                  >
                    <Send className="h-4 w-4 shrink-0" />
                    Enviar a WhatsApp Cancún (Atención 2 hrs)
                  </a>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownloadPDF(submittedQuote)}
                      className="flex-1 py-2.5 px-3 rounded-lg border border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-white font-semibold text-[11px] uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      id="download-pdf-quote-btn"
                    >
                      <Download className="h-3.5 w-3.5 text-orange-500" /> Descargar PDF
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-[11px] uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="h-3.5 w-3.5" /> Nueva Cotización
                    </button>
                  </div>
                </div>
              </div>
            ) : cart.length === 0 ? (
              // ==================================================
              // EMPTY CART STATE
              // ==================================================
              <div className="flex flex-col items-center justify-center text-center h-[65vh] space-y-4">
                <div className="p-4 bg-slate-850 rounded-2xl border border-slate-800 text-slate-500 text-4xl shadow-inner">
                  📋
                </div>
                <div>
                  <h4
                    className="font-bold text-white text-lg sm:text-xl uppercase tracking-wider"
                    style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}
                  >
                    Su lista de cotización está vacía
                  </h4>
                  <p
                    className="text-xs text-slate-400 mt-2 max-w-[300px] mx-auto leading-relaxed"
                    style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}
                  >
                    Explore el catálogo de uniformes oficiales PRE, elija sus modelos, asigne tallas e inicie su presupuesto corporativo.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-2 py-2.5 px-6 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  Regresar al Catálogo
                </button>
              </div>
            ) : (
              // ==================================================
              // STANDARD CART ITEMS & FORM
              // ==================================================
              <div className="space-y-6">
                {/* Cart Items List with exact configuration matches */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    <span>Prendas en Cotizador ({totalItems})</span>
                    <button
                      onClick={onClearCart}
                      className="text-red-400 hover:text-red-300 hover:underline transition-colors text-[10px] font-semibold uppercase cursor-pointer"
                    >
                      Vaciar lista
                    </button>
                  </div>

                  <div className="divide-y divide-slate-800 max-h-[300px] overflow-y-auto pr-1">
                    {cart.map((item, index) => {
                      const basePrice = getProductTierPrice(item.product, item.quantity);
                      const chestPrice = item.hasChestEmbroidery ? getChestEmbroideryPrice(item.quantity) : 0;
                      const backPrice = item.hasBackEmbroidery ? getBackEmbroideryPrice(item.quantity) : 0;
                      const finalUnit = basePrice + chestPrice + backPrice;
                      const rowTotal = finalUnit * item.quantity;

                      return (
                        <div key={index} className="py-3 flex gap-3 text-slate-300">
                          {(() => {
                            const itemImg = (() => {
                              if (item.color && item.product.colors) {
                                const matchedColor = item.product.colors.find(
                                  (c) => c.name.toLowerCase() === item.color?.toLowerCase()
                                );
                                if (matchedColor?.image) return matchedColor.image;
                              }
                              return item.product.image || '';
                            })();

                            if (itemImg) {
                              return (
                                <img
                                  src={itemImg}
                                  alt={item.product.name}
                                  className="w-14 h-14 object-cover rounded bg-slate-950 shrink-0 border border-slate-800"
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    if (item.product.image && e.currentTarget.src !== item.product.image) {
                                      e.currentTarget.src = item.product.image;
                                    }
                                  }}
                                />
                              );
                            }

                            return (
                              <div className="w-14 h-14 rounded bg-slate-950 shrink-0 border border-slate-800 flex items-center justify-center text-slate-500">
                                <CameraOff className="w-5 h-5 stroke-[1.5]" />
                              </div>
                            );
                          })()}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white text-xs truncate leading-tight font-verdana" style={{ fontFamily: 'Verdana' }}>{item.product.name}</h4>
                            <div className="flex flex-wrap items-center gap-1.5 mt-1">
                              <span className="text-[9px] text-slate-500 uppercase font-mono">{item.product.code}</span>
                              <span className="px-1.5 py-0.5 rounded bg-slate-950 text-[8px] font-mono font-bold text-orange-400">
                                Talla {item.size || 'Unitalla'}
                              </span>
                              {item.corte && (
                                <span className="px-1.5 py-0.5 rounded bg-slate-950 text-[8px] font-mono text-orange-300 border border-orange-500/10">
                                  {item.corte}
                                </span>
                              )}
                              {item.manga && (
                                <span className="px-1.5 py-0.5 rounded bg-slate-950 text-[8px] font-mono text-cyan-300 border border-cyan-500/10">
                                  {item.manga}
                                </span>
                              )}
                              {item.color && (
                                <span className="px-1.5 py-0.5 rounded bg-slate-950 text-[8px] font-mono text-slate-300">
                                  {item.color}
                                </span>
                              )}
                            </div>
                            
                            {/* Embroidery options badges */}
                            {(item.hasChestEmbroidery || item.hasBackEmbroidery) && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {item.hasChestEmbroidery && (
                                  <span className="text-[8px] bg-orange-950/40 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/20 font-mono">
                                    +Bordado Pecho (+{formatCurrency(chestPrice)})
                                  </span>
                                )}
                                {item.hasBackEmbroidery && (
                                  <span className="text-[8px] bg-orange-950/40 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/20 font-mono">
                                    +Bordado Espalda (+{formatCurrency(backPrice)})
                                  </span>
                                )}
                              </div>
                            )}

                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-mono text-slate-400">
                                P/Pza: {formatCurrency(finalUnit)}
                              </span>
                              <span className="text-[10px] font-mono text-orange-400 font-semibold">
                                • Renglón: {formatCurrency(rowTotal)}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col justify-between items-end shrink-0">
                            {/* Trash action */}
                            <button
                              onClick={() =>
                                onRemoveItem(
                                  item.product.id,
                                  item.size,
                                  item.color,
                                  item.hasChestEmbroidery,
                                  item.hasBackEmbroidery,
                                  item.corte,
                                  item.manga
                                )
                              }
                              className="text-slate-500 hover:text-red-400 p-0.5 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                            {/* Scale Quantity Counter */}
                            <div className="flex items-center bg-slate-800/80 border border-slate-700 rounded px-1 py-0.5 mt-1.5">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(
                                    item.product.id,
                                    Math.max(1, item.quantity - 1),
                                    item.size,
                                    item.color,
                                    item.hasChestEmbroidery,
                                    item.hasBackEmbroidery,
                                    item.corte,
                                    item.manga
                                  )
                                }
                                className="p-1 text-slate-400 hover:text-white cursor-pointer"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={item.quantity === 0 ? '' : item.quantity}
                                onChange={(e) => {
                                  const cleanValue = e.target.value.replace(/\D/g, '');
                                  const newQty = cleanValue === '' ? 0 : parseInt(cleanValue, 10);
                                  onUpdateQuantity(
                                    item.product.id,
                                    newQty,
                                    item.size,
                                    item.color,
                                    item.hasChestEmbroidery,
                                    item.hasBackEmbroidery,
                                    item.corte,
                                    item.manga
                                  );
                                }}
                                onBlur={() => {
                                  if (item.quantity < 1) {
                                    onUpdateQuantity(
                                      item.product.id,
                                      1,
                                      item.size,
                                      item.color,
                                      item.hasChestEmbroidery,
                                      item.hasBackEmbroidery,
                                      item.corte,
                                      item.manga
                                    );
                                  }
                                }}
                                className="w-10 bg-transparent border-0 text-center font-mono text-xs font-semibold text-white focus:outline-none focus:ring-0 p-0"
                              />
                              <button
                                onClick={() =>
                                  onUpdateQuantity(
                                    item.product.id,
                                    item.quantity + 1,
                                    item.size,
                                    item.color,
                                    item.hasChestEmbroidery,
                                    item.hasBackEmbroidery,
                                    item.corte,
                                    item.manga
                                  )
                                }
                                className="p-1 text-slate-400 hover:text-white cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Totals Box */}
                <div className="bg-slate-950 border border-slate-800/60 rounded-xl p-4 space-y-2 font-mono text-xs shadow-inner">
                  <div className="flex justify-between text-slate-400">
                    <span>Prendas base ({totalItems} pz):</span>
                    <span>{formatCurrency(garmentsSubtotal)} MXN</span>
                  </div>
                  {embroiderySubtotal > 0 && (
                    <div className="flex justify-between text-orange-400">
                      <span>Bordados computarizados:</span>
                      <span>+{formatCurrency(embroiderySubtotal)} MXN</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal sin IVA:</span>
                    <span>{formatCurrency(subtotal)} MXN</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>IVA Trasladado (16%):</span>
                    <span>{formatCurrency(iva)} MXN</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-orange-500 border-t border-slate-800 pt-2 font-sans">
                    <span className="text-white">Total Estimado Neto:</span>
                    <span>{formatCurrency(total)} MXN</span>
                  </div>
                </div>

                {/* Rate limit error warning */}
                {rateLimitError && (
                  <div className="bg-red-950/70 border border-red-500/50 text-red-300 p-3.5 rounded-xl flex items-start gap-2.5 text-xs animate-fade-in mt-3">
                    <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold text-white mb-0.5">Límite de solicitudes</strong>
                      <span>{rateLimitError}</span>
                    </div>
                  </div>
                )}

                {/* Contact and Company Form */}
                <form onSubmit={handleSubmitQuote} className="border-t border-slate-800 pt-4 space-y-4" noValidate>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                      Información Corporativa
                    </h4>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Proporcione sus datos fiscales/corporativos para preparar un presupuesto formal con el descuento aplicable por mayoreo.
                    </p>
                  </div>

                  {errors.cart && (
                    <p className="text-xs text-red-400 bg-red-950/50 border border-red-500/30 p-2 rounded-lg flex items-center gap-1.5">
                      <AlertCircle className="h-3.5 w-3.5" /> {errors.cart}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="quote-name" className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="quote-name"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        placeholder="Ej. Lic. Carlos Méndez"
                        className={`w-full bg-slate-800 border rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition-colors ${
                          errors.name ? 'border-red-500 focus:border-red-400' : 'border-slate-700 focus:border-orange-500'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="h-3 w-3" /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="quote-company" className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                        Empresa / Hotel
                      </label>
                      <input
                        type="text"
                        id="quote-company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Ej. Hotel Westin Cancún"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="quote-email" className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        id="quote-email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        placeholder="ejemplo@empresa.com"
                        className={`w-full bg-slate-800 border rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition-colors ${
                          errors.email ? 'border-red-500 focus:border-red-400' : 'border-slate-700 focus:border-orange-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="h-3 w-3" /> {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="quote-phone" className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        id="quote-phone"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                        }}
                        placeholder="Ej. 998 555 0199"
                        className={`w-full bg-slate-800 border rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition-colors ${
                          errors.phone ? 'border-red-500 focus:border-red-400' : 'border-slate-700 focus:border-orange-500'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="h-3 w-3" /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="quote-notes" className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                      Desglose de Tallas, Notas de Logotipo o Requerimientos de Color
                    </label>
                    <textarea
                      id="quote-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ej. Requerimos 12 camisas en talla S azul marino y 12 en talla M color blanco. Logotipo bordado en el pecho izquierdo."
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-orange-950/20 disabled:opacity-50 active:scale-95"
                  >
                    {isSubmitting ? 'Generando Cotización Oficial...' : 'Generar Hoja de Cotización'}
                    {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
