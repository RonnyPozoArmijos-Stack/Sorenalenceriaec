import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = 3000;

  // Initialize Gemini Client server-side with user agent header as required
  const apiKey = process.env.GEMINI_API_KEY || "";
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Helper function for intelligent size calculation, dynamic product recommendation & varied replies for ALL topics
  function getSmartSizeReply(messages: Array<{ role: string; content: string }>): string {
    const userMsgs = messages.filter(m => m.role === 'user');
    const lastMsg = userMsgs[userMsgs.length - 1]?.content || "";
    const prevAssistantMsgs = messages.filter(m => m.role === 'assistant').map(m => m.content);
    const text = lastMsg.toLowerCase().trim();

    // Helper to pick a random item from array that wasn't used in recent responses
    const pickVaried = (options: string[]): string => {
      const unused = options.filter(opt => !prevAssistantMsgs.some(prev => prev.includes(opt.slice(0, 15))));
      const pool = unused.length > 0 ? unused : options;
      return pool[Math.floor(Math.random() * pool.length)];
    };

    const greetings = [
      "✨ ¡Hola hermosa!",
      "✨ ¡Hola bella!",
      "✨ ¡Con todo el gusto del mundo te ayudo!",
      "✨ ¡Hola reina!",
      "✨ ¡Qué alegría atenderte!"
    ];

    const closings = [
      "💖 ¿Te gustaría ver alguno de estos modelos en el catálogo?",
      "🌸 ¿Tienes alguna duda adicional sobre tus medidas o el calce?",
      "✨ Si deseas hacer tu pedido directo, ¡puedes agregarlo al carrito o escribirme a WhatsApp!",
      "💖 ¿Prefieres un estilo en encaje romántico o algo más audaz?",
      "✨ ¿Te puedo sugerir algún conjunto especial según la ocasión?"
    ];

    // 1. Saludos y Agradecimientos / Despedidas
    if (text.includes('gracias') || text.includes('chao') || text.includes('adiós') || text.includes('adios') || text.includes('listo') || text.includes('finalizar')) {
      return pickVaried([
        "¡Muchísimas gracias a ti hermosa! 💖 Fue un placer enorme aconsejarte. ¡Que tengas un día maravilloso e iluminado! ✨",
        "¡A ti bella! 🌸 Recuerda que siempre estaré aquí para ayudarte con tus tallas y conjuntos de Sorena Lencería. ¡Un abrazo enorme! 💖",
        "¡Gracias por escribirnos reina! ✨ Si necesitas cualquier otra recomendación, aquí me tendrás lista. ¡Disfruta mucho tu día! 💖",
        "¡Un encanto atenderte! 🌹 Si requieres asistencia con tu pedido o dudas de calce, escríbeme cuando quieras. ✨"
      ]);
    }

    if (text === 'hola' || text === 'buenas' || text === 'buenos dias' || text === 'buenas tardes' || text === 'buenas noches' || text === 'hola!') {
      return pickVaried([
        "✨ ¡Hola bella! Bienvenida a Sorena Lencería. Soy tu asesora virtual. ¿En qué puedo aconsejarte hoy? (tallas, modelos, envíos, o recomendaciones). 💖",
        "🌸 ¡Hola hermosa! Qué lindo tenerte aquí. Dime tus medidas, talla habitual o tu duda y te guiaré a encontrar tu conjunto soñado. ✨",
        "✨ ¡Hola reina! ¿Buscando la talla o modelo perfecto para ti? Dime tus consultas o medidas y te atenderé al instante. 💖"
      ]);
    }

    // 2. Materiales, telas y calidad de prendas
    if (text.includes('material') || text.includes('tela') || text.includes('encaje') || text.includes('calidad') || text.includes('algodon') || text.includes('algodón') || text.includes('saten') || text.includes('satén') || text.includes('pica')) {
      return pickVaried([
        `${pickVaried(greetings)} Nuestras prendas están confeccionadas con encajes ultra suaves de alta densidad, blondas elastizadas de tacto sedoso y forro íntimo 100% algodón hipoalergénico para tu total comodidad. 💖 ${pickVaried(closings)}`,
        `🌸 En Sorena Lencería priorizamos el confort supremo: el encaje es extremadamente suave y flexible, no pica ni causa irritación, e incluye forro de algodón puro en la parte íntima. ✨ ${pickVaried(closings)}`,
        `✨ Trabajamos con materiales de categoría premium: encajes delicados, tirantes ajustables súper suaves y accesorios metálicos antioxidantes. ¡Sentirás una suavidad incomparable! 💖 ${pickVaried(closings)}`
      ]);
    }

    // 3. Cuidado y lavado de las prendas
    if (text.includes('lavar') || text.includes('lavado') || text.includes('cuidado') || text.includes('mantenimiento') || text.includes('secadora')) {
      return pickVaried([
        `📏 Para conservar la textura y el color radiante de tu lencería: lávala a mano con agua fría y jabón neutro suave. No retuerzas la prenda ni uses secadora; déjala secar a la sombra. ✨ ${pickVaried(closings)}`,
        `✨ Cuidar tus conjuntos Sorena es muy sencillo: recomendamos lavado a mano con agua fría. Evita blanqueadores y la secadora automática para preservar la elasticidad del encaje. 💖 ${pickVaried(closings)}`
      ]);
    }

    // 4. Envíos, tiempos, costo y envío gratis
    if (text.includes('envío') || text.includes('envios') || text.includes('costo de envio') || text.includes('gratis') || text.includes('tiempo') || text.includes('demora') || text.includes('cuanto tarda') || text.includes('cuanto demora') || text.includes('provincia')) {
      return pickVaried([
        `${pickVaried(greetings)} Realizamos envíos 100% seguros a todas las ciudades del Ecuador 🇪🇨 (vía Servientrega o Tramaco). El tiempo de entrega es de 24 a 48 horas laborables. El envío estándar es de $4.50 e ¡incluye ENVÍO GRATIS en compras desde $60! 💖 ${pickVaried(closings)}`,
        `✨ ¡Llegamos a todo el Ecuador! 🇪🇨 Tu pedido te llega directo a tu domicilio o agencia Servientrega en 1 a 2 días hábiles. ¡Recuerda que por compras superiores a $60 el envío es totalmente GRATIS! 🌸 ${pickVaried(closings)}`,
        `🌸 Despachamos tus conjuntos con embalaje súper seguro a cualquier provincia de Ecuador. La entrega toma de 24 a 48 horas. ¡Aprovecha el envío gratis al llevar $60 o más! ✨ ${pickVaried(closings)}`
      ]);
    }

    // 5. Métodos de pago y proceso de compra
    if (text.includes('pago') || text.includes('transferencia') || text.includes('tarjeta') || text.includes('pichincha') || text.includes('guayaquil') || text.includes('cuenta') || text.includes('comprar') || text.includes('como pido')) {
      return pickVaried([
        `🏦 Aceptamos transferencia o depósito directo a Banco Pichincha (2206629655) o Banco Guayaquil (0056863359) a nombre de Wendy Jaritza López (CI: 2400044059). ¡Al confirmar tu bolsa se genera el mensaje listo para WhatsApp! 💖 ${pickVaried(closings)}`,
        `✨ Puedes pagar por transferencia o depósito a Banco Pichincha o Guayaquil, enviando tu comprobante el mismo día del depósito a nuestro WhatsApp +593 96 900 1613. 🌸 ${pickVaried(closings)}`
      ]);
    }

    // 6. Empaque discreto y opciones de regalo
    if (text.includes('empaque') || text.includes('discreto') || text.includes('regalo') || text.includes('caja') || text.includes('envoltura') || text.includes('anonimo') || text.includes('anónimo')) {
      return pickVaried([
        `🎁 ¡Tu privacidad y elegancia son prioridad! Todos nuestros pedidos se envían en un empaque hermoso y 100% DISCRETO, sin sellos ni palabras explícitas por fuera. Si es un regalo, ¡podemos incluir una tarjeta con dedicatoria personalizada sin costo adicional! ✨ ${pickVaried(closings)}`,
        `✨ Despachamos tu compra en un sobre o caja de presentación de lujo totalmente discreto. Nadie sabrá el contenido desde el exterior. Además, agregamos tarjetas dedicatorias gratuitas para regalos especiales. 💖 ${pickVaried(closings)}`
      ]);
    }

    // 7. Cambios, devoluciones y garantía de talla
    if (text.includes('cambio') || text.includes('devolucion') || text.includes('devolución') || text.includes('garantia') || text.includes('garantía') || text.includes('si no me queda')) {
      return pickVaried([
        `🌸 ¡Queremos que te sientas perfecta! Ofrecemos cambios de talla dentro de los primeros 3 días posteriores a la entrega, siempre que la prenda esté sin usar, impecable y conserve todas sus etiquetas e higiene intactas. ✨ ${pickVaried(closings)}`,
        `✨ Si por alguna razón la talla no te queda como esperabas, te gestionamos el cambio de manera rápida dentro de los 3 días de recibido el pedido. ¡Por eso también te ayudo a elegir la talla idónea antes de comprar! 💖 ${pickVaried(closings)}`
      ]);
    }

    // 8. Ubicación o tienda física
    if (text.includes('ubicacion') || text.includes('ubicación') || text.includes('tienda fisica') || text.includes('tienda física') || text.includes('local') || text.includes('donde estan') || text.includes('dónde están') || text.includes('direccion') || text.includes('dirección')) {
      return pickVaried([
        `✨ Somos una boutique de lencería 100% online con sede de despachos centrales en Ecuador. Despachamos pedidos diarios a todo el país con atención ultra personalizada a través de la web y WhatsApp +593 96 900 1613. 💖 ${pickVaried(closings)}`,
        `🌸 Operamos de forma 100% digital con envíos express a todas las ciudades de Ecuador. Así aseguramos la máxima frescura de stock, promociones exclusivas y atención personalizada directa a tu celular. ✨ ${pickVaried(closings)}`
      ]);
    }

    // 9. Recomendación para ocasión especial / noche de bodas / cita
    if (text.includes('especial') || text.includes('boda') || text.includes('novia') || text.includes('aniversario') || text.includes('cita') || text.includes('sexy') || text.includes('rojo') || text.includes('negro')) {
      return pickVaried([
        `🌹 ¡Para una ocasión inolvidable te recomiendo nuestros modelos de línea seducción! El conjunto Victoria ($29.99 en encaje negro sofisticado) o Amore ($29.99 en un rojo apasionante) son opciones fabulosas. ✨ ${pickVaried(closings)}`,
        `✨ Si buscas deslumbrar en una noche especial, los modelos Victoria ($29.99), Valentina ($24.99) o Amore ($29.99) tienen ligueros y detalles de encaje que lucen increíbles. 💖 ${pickVaried(closings)}`
      ]);
    }

    // 10. Talla intermedia o dudas de medida
    if (text.includes('entre dos') || text.includes('intermedia') || text.includes('duda de talla') || text.includes('no se mi talla') || text.includes('no sé mi talla')) {
      return pickVaried([
        `📏 Si estás entre dos tallas, te aconsejamos elegir la talla mayor o un modelo con tirantes y espalda regulable (como la Talla Única o nuestros conjuntos con ajustes). ¡Dime tus medidas de busto/cadera y lo evaluamos juntas! ✨ ${pickVaried(closings)}`,
        `✨ Para siluetas entre dos tallas, la recomendación ideal es guiarse por la medida del busto y optar por tirantes graduables. Si me compartes tus cm te diré la mejor alternativa. 💖 ${pickVaried(closings)}`
      ]);
    }

    // 11. Consultas por Tallas específicas (XL, L, M, S, XS, Única)
    if (/\b(xl|extra large|extra grande)\b/.test(text) || text.includes('talla xl') || text.includes('para xl') || text.includes('medidas xl')) {
      const xlResponses = [
        `✨ Para la Talla XL (Busto 103-110 cm | Cadera 109-115 cm | Brasier 38B/40B), te super recomiendo nuestros hermosos modelos: Amore ($29.99), Sofia ($24.99) y Marian ($24.99). ${pickVaried(closings)}`,
        `✨ ¡En Talla XL lucirás espectacular! Tus medidas correspondientes son busto 103-110 cm y cadera 109-115 cm. Nuestros modelos destacados en XL son Amore ($29.99) y Sofia ($24.99). ${pickVaried(closings)}`,
        `✨ En Sorena la Talla XL abarca brasieres 38B/40B y pantalón 42. Tenemos los conjuntos Amore ($29.99), Marian ($24.99) y Sofia ($24.99) disponibles. ${pickVaried(closings)}`
      ];
      return pickVaried(xlResponses);
    }

    if (text.includes('talla l') || text.includes('para l') || text.includes('medidas l') || /\b(talla l|soy l|medida l)\b/.test(text)) {
      const lResponses = [
        `✨ Para Talla L (Busto 96-102 cm | Cadera 103-108 cm | Brasier 36B/38A), te recomiendo los fabulosos modelos: Gabriela ($24.99), Selva ($24.99), Gala ($24.99) y Rocío ($19.99). ${pickVaried(closings)}`,
        `✨ En Talla L tus medidas ideales son busto 96-102 cm. Nuestros modelos estrella disponibles son Gabriela ($24.99), Gala ($24.99) y Dahlia ($19.99). ${pickVaried(closings)}`
      ];
      return pickVaried(lResponses);
    }

    if (text.includes('talla m') || text.includes('para m') || text.includes('medidas m') || /\b(talla m|soy m|medida m)\b/.test(text)) {
      const mResponses = [
        `✨ Para Talla M (Busto 90-95 cm | Cadera 97-102 cm | Brasier 34B/36A), te recomiendo nuestros hermosos conjuntos: Victoria ($29.99), Valentina ($24.99), Renna ($24.99) y Julieta ($21.99). ${pickVaried(closings)}`,
        `✨ Tu talla M corresponde a brasier 34B y pantalón 38. Los modelos más pedidos en M son Victoria ($29.99), Valentina ($24.99) y Elegancia ($21.99). ${pickVaried(closings)}`
      ];
      return pickVaried(mResponses);
    }

    if (text.includes('talla s') || text.includes('para s') || text.includes('medidas s') || /\b(talla s|soy s|medida s)\b/.test(text)) {
      const sResponses = [
        `✨ Para Talla S (Busto 84-89 cm | Cadera 91-96 cm | Brasier 32B/34A), te recomiendo los conjuntos: Lore ($24.99), Catalina ($24.99), Oliva ($24.99) y Flavia ($19.99). ${pickVaried(closings)}`,
        `✨ En Talla S tus medidas van de 84 a 89 cm de busto. Te lucirán divino los modelos Lore ($24.99), Mística ($24.99) y Romance ($19.99). ${pickVaried(closings)}`
      ];
      return pickVaried(sResponses);
    }

    if (text.includes('talla xs') || text.includes('para xs') || text.includes('medidas xs') || /\b(talla xs|soy xs|medida xs)\b/.test(text)) {
      const xsResponses = [
        `✨ Para Talla XS (Busto 78-83 cm | Cadera 85-90 cm | Brasier 30A/32A), te recomiendo los hermosos conjuntos: Isavelle ($21.99) y Ámbar ($19.99). ${pickVaried(closings)}`,
        `✨ En Talla XS disponemos de los finos modelos Isavelle ($21.99) y Ámbar ($19.99), ideales para busto 78-83 cm. ${pickVaried(closings)}`
      ];
      return pickVaried(xsResponses);
    }

    if (text.includes('unica') || text.includes('única') || text.includes('ajustable')) {
      return `✨ La Talla Única Sorena es super versátil: abarca de S a L (busto 84-98 cm, cadera 91-108 cm) gracias a sus correas y espalda regulables. ${pickVaried(closings)}`;
    }

    // 12. Búsqueda de producto específico por nombre
    const products = [
      { name: 'isavelle', price: '$21.99', size: 'XS' },
      { name: 'lore', price: '$24.99', size: 'S' },
      { name: 'catalina', price: '$24.99', size: 'S' },
      { name: 'victoria', price: '$29.99', size: 'M' },
      { name: 'valentina', price: '$24.99', size: 'M' },
      { name: 'renna', price: '$24.99', size: 'M' },
      { name: 'julieta', price: '$21.99', size: 'M' },
      { name: 'gabriela', price: '$24.99', size: 'L' },
      { name: 'amore', price: '$29.99', size: 'XL' },
      { name: 'sofia', price: '$24.99', size: 'XL' },
      { name: 'marian', price: '$24.99', size: 'XL' },
      { name: 'ambar', price: '$19.99', size: 'XS' },
      { name: 'oliva', price: '$24.99', size: 'S' },
      { name: 'flavia', price: '$19.99', size: 'S' },
      { name: 'peonia', price: '$19.99', size: 'M' },
      { name: 'lavanda', price: '$19.99', size: 'S' },
      { name: 'selva', price: '$24.99', size: 'L' },
      { name: 'mistica', price: '$24.99', size: 'S' },
      { name: 'elegancia', price: '$21.99', size: 'M' },
      { name: 'amapola', price: '$19.99', size: 'S' },
      { name: 'rocio', price: '$19.99', size: 'L' },
      { name: 'malva', price: '$19.99', size: 'S' },
      { name: 'gala', price: '$24.99', size: 'L' },
      { name: 'dahlia', price: '$19.99', size: 'L' },
      { name: 'violeta', price: '$19.99', size: 'M' },
      { name: 'selene', price: '$21.99', size: 'S' },
      { name: 'lunaria', price: '$14.99', size: 'L' },
      { name: 'romance', price: '$19.99', size: 'S' },
    ];

    const matchedProd = products.find(p => text.includes(p.name));
    if (matchedProd) {
      const prodNameCap = matchedProd.name.charAt(0).toUpperCase() + matchedProd.name.slice(1);
      return `${pickVaried(greetings)} El hermoso conjunto ${prodNameCap} tiene un precio de ${matchedProd.price} y viene disponible en Talla ${matchedProd.size}. ${pickVaried(closings)}`;
    }

    // 13. Talla de brasier habitual
    if (/\b(30a|32a|30b)\b/.test(text)) return `${pickVaried(greetings)} Según tu brasier habitual, tu talla ideal es XS. Te sugiero los modelos Isavelle ($21.99) y Ámbar ($19.99). ${pickVaried(closings)}`;
    if (/\b(32b|34a|32c)\b/.test(text)) return `${pickVaried(greetings)} Según tu brasier habitual, tu talla ideal es S. Te sugiero los modelos Lore ($24.99), Catalina ($24.99) y Oliva ($24.99). ${pickVaried(closings)}`;
    if (/\b(34b|36a|34c)\b/.test(text)) return `${pickVaried(greetings)} Según tu brasier habitual, tu talla ideal es M. Te sugiero los modelos Victoria ($29.99), Valentina ($24.99) y Julieta ($21.99). ${pickVaried(closings)}`;
    if (/\b(36b|38a|36c)\b/.test(text)) return `${pickVaried(greetings)} Según tu brasier habitual, tu talla ideal es L. Te sugiero los modelos Gabriela ($24.99), Selva ($24.99) y Gala ($24.99). ${pickVaried(closings)}`;
    if (/\b(38b|40b|38c)\b/.test(text)) return `${pickVaried(greetings)} Según tu brasier habitual, tu talla ideal es XL. Te sugiero los modelos Amore ($29.99), Sofia ($24.99) y Marian ($24.99). ${pickVaried(closings)}`;

    // 14. Medidas numéricas en cm
    const numbers = text.match(/\d+/g)?.map(Number) || [];
    if (numbers.length > 0) {
      const num = numbers[0];
      if (num >= 70 && num <= 83) return `${pickVaried(greetings)} Con tu medida de ${num} cm, tu talla ideal es XS. Te recomiendo Isavelle ($21.99) y Ámbar ($19.99). ${pickVaried(closings)}`;
      if (num >= 84 && num <= 89) return `${pickVaried(greetings)} Con tu medida de ${num} cm, tu talla ideal es S. Te recomiendo Lore ($24.99) y Catalina ($24.99). ${pickVaried(closings)}`;
      if (num >= 90 && num <= 95) return `${pickVaried(greetings)} Con tu medida de ${num} cm, tu talla ideal es M. Te recomiendo Victoria ($29.99) y Valentina ($24.99). ${pickVaried(closings)}`;
      if (num >= 96 && num <= 102) return `${pickVaried(greetings)} Con tu medida de ${num} cm, tu talla ideal es L. Te recomiendo Gabriela ($24.99) y Selva ($24.99). ${pickVaried(closings)}`;
      if (num >= 103 && num <= 115) return `${pickVaried(greetings)} Con tu medida de ${num} cm, tu talla ideal es XL. Te recomiendo Amore ($29.99) y Sofia ($24.99). ${pickVaried(closings)}`;
    }

    // 15. Cómo medir
    if (text.includes('cómo medir') || text.includes('como medir') || text.includes('dónde medir') || text.includes('donde medir') || text.includes('medida')) {
      return `${pickVaried(greetings)} 📏 Para medir tu busto, pasa la cinta sin apretar sobre la parte más prominente. Para la cadera, mide la zona más ancha. Dime tus cm o tu talla de brasier habitual y te recomendaré tu talla exacta con modelos disponibles. ${pickVaried(closings)}`;
    }

    // 16. Default respuesta variada para cualquier otra consulta
    const defaults = [
      "¡Hola bella! ✨ Dime tus medidas en cm, tu talla de brasier habitual o la consulta que tengas sobre modelos, envíos o pagos y te ayudaré encantada. 💖",
      "¡Con todo el gusto te asesoro, reina! 🌸 Escríbeme qué talla o modelo buscas en Sorena Lencería y te daré detalles de calce, disponibilidad y precios. ✨",
      "✨ ¡Bienvenida a Sorena Lencería! Estoy lista para responder cualquier duda sobre nuestras prendas, cuidados, envíos a todo Ecuador o recomendaciones de tallas. 💖"
    ];
    return pickVaried(defaults);
  }

  // API Route for AI Size Agent
  app.post("/api/size-agent", async (req, res) => {
    const messages = req.body?.messages;
    try {
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Mensajes no válidos" });
      }

      // If API key is not present, use dynamic fallback directly
      if (!apiKey) {
        const reply = getSmartSizeReply(messages);
        return res.json({ reply });
      }

      const systemInstruction = `
Eres "Sorena AI", la asesora virtual experta oficial de Sorena Lencería en Ecuador.
Tu misión es resolver CUALQUIER duda de la clienta (tallas, calce, modelos, precios, envíos, métodos de pago, cuidados de tela, empaque discreto, garantía de cambios o recomendaciones según la ocasión).

PERSONALIDAD Y TONO:
- Sumamente atenta, dulce, refinada, empática y servicial.
- Tratas a la clienta con cariño y elegancia ("✨ Hola bella...", "Con el mayor de los gustos hermosa...", "Será un placer ayudarte reina...").

BASE DE CONOCIMIENTO SOBRE SORENA LENCERÍA:
1. CATÁLOGO CON PRECIOS Y TALLAS:
   - Talla XS: Isavelle ($21.99), Ámbar ($19.99)
   - Talla S: Lore ($24.99), Catalina ($24.99), Mística ($24.99), Oliva ($24.99), Romance ($19.99), Flavia ($19.99), Lavanda ($19.99), Amapola ($19.99), Malva ($19.99), Selene ($21.99)
   - Talla M: Victoria ($29.99), Valentina ($24.99), Renna ($24.99), Julieta ($21.99), Elegancia ($21.99), Peonia ($19.99), Violeta ($19.99)
   - Talla L: Gabriela ($24.99), Selva ($24.99), Gala ($24.99), Rocío ($19.99), Dahlia ($19.99), Lunaria ($14.99)
   - Talla XL: Amore ($29.99), Sofia ($24.99), Marian ($24.99)

2. GUÍA DE TALLAS Y MEDIDAS (cm / brasier habitual):
   - XS: Busto 78-83 cm | Cadera 85-90 cm (Brasier 30A, 32A, 30B)
   - S: Busto 84-89 cm | Cadera 91-96 cm (Brasier 32B, 34A, 32C)
   - M: Busto 90-95 cm | Cadera 97-102 cm (Brasier 34B, 36A, 34C)
   - L: Busto 96-102 cm | Cadera 103-108 cm (Brasier 36B, 38A, 36C)
   - XL: Busto 103-110 cm | Cadera 109-115 cm (Brasier 38B, 40B, 38C)
   - Talla Única: Regulable de S a L (Busto 84-98 cm).

3. ENVÍOS Y PAGOS EN ECUADOR:
   - Envíos a todo el Ecuador 🇪🇨 vía Servientrega o Tramaco (24-48h).
   - Costo de envío estándar: $4.50. ¡ENVÍO GRATIS en compras desde $60!
   - Cuentas Bancarias para transferencias/depósitos:
     • Banco Pichincha: 2206629655 (Wendy Jaritza López De La O, CI: 2400044059, wendyjaritza11@gmail.com)
     • Banco Guayaquil: 0056863359 (Wendy Jaritza López De La O)
     • Nota: Enviar foto del comprobante el mismo día del depósito.
   - WhatsApp oficial de pedidos: +593 96 900 1613.
   - Tienda física multimarca: JOBMAR en La Libertad, Santa Elena.

4. MATERIALES Y CUIDADOS:
   - Encajes finos ultra suaves, blondas elásticas, forro 100% algodón íntimo hipoalergénico.
   - Cuidado: Lavar a mano con agua fría y jabón neutro. No usar secadora ni lejía.

5. EMPAQUE Y CAMBIOS:
   - Empaque 100% DISCRETO y elegante. Opción de dedicatoria de regalo gratuita.
   - Cambios de talla dentro de los 3 días de recibido (prenda nueva con etiquetas).

REGLAS DE ORO OBLIGATORIAS:
- VARIACIÓN CONTINUA: NUNCA repitas las mismas frases ni estructuras de mensajes anteriores. Varía los saludos, adjetivos y preguntas finales.
- Sé CONCISA Y EFECTIVA: Mantén tus respuestas en 1 a 3 frases claras y bonitas.
- Usa emojis delicados: ✨, 💖, 🌸, 🌹, 📏.
`;

      const formattedContents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.9,
        }
      });

      const reply = response.text || getSmartSizeReply(messages);
      return res.json({ reply });
    } catch (error: any) {
      console.warn("Gemini Size Agent using dynamic smart fallback:", error?.message || error);
      const reply = getSmartSizeReply(messages);
      return res.json({ reply });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('(.*)', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
