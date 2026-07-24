import { CartItem } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

export interface CheckoutOptions {
  whatsappNumber?: string;
  customerNote?: string;
}

/**
 * Genera una plantilla de checkout enriquecida y formateada para WhatsApp
 */
export function generateWhatsAppCheckoutLink(
  items: CartItem[],
  options: CheckoutOptions = {}
): string {
  if (!items || items.length === 0) return '#';

  const number = options.whatsappNumber || WHATSAPP_NUMBER;
  const total = items.reduce((acc, item) => {
    const price = item.discountPercentage 
      ? item.price * (1 - item.discountPercentage / 100)
      : item.price;
    return acc + (price * item.qty);
  }, 0);

  let message = `✨ *NUEVO PEDIDO - SORENA LENCERÍA* ✨\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `🛍️ *PRODUCTOS SELECCIONADOS:*\n\n`;

  items.forEach((item, index) => {
    const unitPrice = item.discountPercentage 
      ? item.price * (1 - item.discountPercentage / 100)
      : item.price;
    const subtotal = unitPrice * item.qty;

    message += `${index + 1}. *${item.title}*\n`;
    message += `   • Talla: *${item.size}*\n`;
    message += `   • Cantidad: *x${item.qty}*\n`;
    message += `   • Precio unitario: $${unitPrice.toFixed(2)}\n`;
    message += `   • Subtotal: *$${subtotal.toFixed(2)}*\n\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💳 *TOTAL ESTIMADO: $${total.toFixed(2)} USD*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `📍 *Coordinación de Entrega y Pago*\n`;
  message += `Hola, deseo confirmar mi pedido. Quedo atenta a las instrucciones de pago (Transferencia / Depósito / Efectivo) y detalles del envío. 🌸`;

  if (options.customerNote) {
    message += `\n\n📝 *Nota:* ${options.customerNote}`;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
