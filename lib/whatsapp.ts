import { CartItem } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

export interface CheckoutOptions {
  whatsappNumber?: string;
  customerNote?: string;
}

/**
 * Genera una plantilla de checkout clara, elegante y profesional para WhatsApp
 * con codificación completa de emojis para móvil y web.
 */
export function generateWhatsAppCheckoutLink(
  items: CartItem[],
  options: CheckoutOptions = {}
): string {
  if (!items || items.length === 0) return '#';

  const rawNumber = options.whatsappNumber || WHATSAPP_NUMBER;
  const cleanNumber = rawNumber.replace(/\D/g, '');
  
  const total = items.reduce((acc, item) => {
    const price = item.discountPercentage 
      ? item.price * (1 - item.discountPercentage / 100)
      : item.price;
    return acc + (price * item.qty);
  }, 0);

  let message = `✨ ¡Gracias por tu compra en Sorena Lencería! ✨\n\n`;

  items.forEach((item) => {
    message += `🛍️ ${item.title} — Talla ${item.size} (x${item.qty})\n`;
  });

  message += `💳 Total: $${total.toFixed(2)} USD\n\n`;

  message += `🏦 Pago por transferencia/depósito:\n\n`;
  message += `Pichincha: 2206629655\n`;
  message += `Guayaquil: 0056863359\n`;
  message += `Titular: Wendy Jaritza López De La O\n`;
  message += `C.I.: 2400044059\n\n`;

  message += `📸 Envíanos la foto del comprobante el mismo día para coordinar tu envío. ¡Gracias por tu compra! 🌸`;

  if (options.customerNote) {
    message += `\n\n📝 Nota: ${options.customerNote}`;
  }

  // Se utiliza el endpoint directo de la API oficial de WhatsApp para evitar que redirecciones intermedias (como wa.me) corrompan los emojis UTF-8 en móviles
  const encodedText = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedText}`;
}
