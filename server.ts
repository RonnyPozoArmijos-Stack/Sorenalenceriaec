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

  // Helper function for intelligent size calculation, dynamic product recommendation & varied replies
  function getSmartSizeReply(messages: Array<{ role: string; content: string }>): string {
    const userMsgs = messages.filter(m => m.role === 'user');
    const lastMsg = userMsgs[userMsgs.length - 1]?.content || "";
    const prevAssistantMsgs = messages.filter(m => m.role === 'assistant').map(m => m.content);
    const text = lastMsg.toLowerCase().trim();

    // Helper to pick a random item from array that wasn't used in last response
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
      "💖 ¿Prefieres un estilo en encaje romántico o algo más audaz?"
    ];

    // 1. Saludos / Despedidas
    if (text.includes('gracias') || text.includes('chao') || text.includes('adiós') || text.includes('adios') || text.includes('listo') || text.includes('finalizar')) {
      return pickVaried([
        "¡Muchísimas gracias a ti hermosa! 💖 Fue un placer enorme aconsejarte. ¡Que tengas un día maravilloso e iluminado! ✨",
        "¡A ti bella! 🌸 Recuerda que siempre estaré aquí para ayudarte con tus tallas y conjuntos de Sorena Lencería. ¡Un abrazo enorme! 💖",
        "¡Gracias por escribirnos reina! ✨ Si necesitas cualquier otra recomendación, aquí me tendrás lista. ¡Disfruta mucho tu día! 💖"
      ]);
    }

    // 2. Envíos / Compras / WhatsApp / Ubicación
    if (text.includes('envío') || text.includes('envios') || text.includes('comprar') || text.includes('pago') || text.includes('whatsapp') || text.includes('tienda') || text.includes('donde') || text.includes('dónde') || text.includes('ecuador')) {
      return `${pickVaried(greetings)} Hacemos envíos 100% seguros a todo el Ecuador 🇪🇨. Puedes realizar tu pedido desde esta web o escribirnos directo a nuestro WhatsApp +593 96 900 1613. ${pickVaried(closings)}`;
    }

    // 3. Consultas por Tallas específicas (XL, L, M, S, XS, Única)
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

    // 4. Búsqueda de producto específico por nombre
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

    // 5. Talla de brasier habitual
    if (/\b(30a|32a|30b)\b/.test(text)) return `${pickVaried(greetings)} Según tu brasier habitual, tu talla ideal es XS. Te sugiero los modelos Isavelle ($21.99) y Ámbar ($19.99). ${pickVaried(closings)}`;
    if (/\b(32b|34a|32c)\b/.test(text)) return `${pickVaried(greetings)} Según tu brasier habitual, tu talla ideal es S. Te sugiero los modelos Lore ($24.99), Catalina ($24.99) y Oliva ($24.99). ${pickVaried(closings)}`;
    if (/\b(34b|36a|34c)\b/.test(text)) return `${pickVaried(greetings)} Según tu brasier habitual, tu talla ideal es M. Te sugiero los modelos Victoria ($29.99), Valentina ($24.99) y Julieta ($21.99). ${pickVaried(closings)}`;
    if (/\b(36b|38a|36c)\b/.test(text)) return `${pickVaried(greetings)} Según tu brasier habitual, tu talla ideal es L. Te sugiero los modelos Gabriela ($24.99), Selva ($24.99) y Gala ($24.99). ${pickVaried(closings)}`;
    if (/\b(38b|40b|38c)\b/.test(text)) return `${pickVaried(greetings)} Según tu brasier habitual, tu talla ideal es XL. Te sugiero los modelos Amore ($29.99), Sofia ($24.99) y Marian ($24.99). ${pickVaried(closings)}`;

    // 6. Medidas numéricas en cm
    const numbers = text.match(/\d+/g)?.map(Number) || [];
    if (numbers.length > 0) {
      const num = numbers[0];
      if (num >= 70 && num <= 83) return `${pickVaried(greetings)} Con tu medida de ${num} cm, tu talla ideal es XS. Te recomiendo Isavelle ($21.99) y Ámbar ($19.99). ${pickVaried(closings)}`;
      if (num >= 84 && num <= 89) return `${pickVaried(greetings)} Con tu medida de ${num} cm, tu talla ideal es S. Te recomiendo Lore ($24.99) y Catalina ($24.99). ${pickVaried(closings)}`;
      if (num >= 90 && num <= 95) return `${pickVaried(greetings)} Con tu medida de ${num} cm, tu talla ideal es M. Te recomiendo Victoria ($29.99) y Valentina ($24.99). ${pickVaried(closings)}`;
      if (num >= 96 && num <= 102) return `${pickVaried(greetings)} Con tu medida de ${num} cm, tu talla ideal es L. Te recomiendo Gabriela ($24.99) y Selva ($24.99). ${pickVaried(closings)}`;
      if (num >= 103 && num <= 115) return `${pickVaried(greetings)} Con tu medida de ${num} cm, tu talla ideal es XL. Te recomiendo Amore ($29.99) y Sofia ($24.99). ${pickVaried(closings)}`;
    }

    // 7. Cómo medir
    if (text.includes('cómo medir') || text.includes('como medir') || text.includes('dónde medir') || text.includes('donde medir') || text.includes('medida')) {
      return `${pickVaried(greetings)} 📏 Para medir tu busto, pasa la cinta sin apretar sobre la parte más prominente. Para la cadera, mide la zona más ancha. Dime tus cm o tu talla de brasier habitual y te recomendaré tu talla exacta con modelos disponibles. ${pickVaried(closings)}`;
    }

    // 8. Default respuesta variada
    const defaults = [
      "¡Hola bella! ✨ Dime tu medida en cm, tu talla de brasier habitual (ej. 34B, 38B) o la talla que deseas buscar (XS, S, M, L, XL) y te aconsejaré tu calce perfecto con nuestros modelos y precios. 💖",
      "¡Con todo el gusto te asesoro, reina! 🌸 Escríbeme qué talla sueles usar o qué modelo te gusta de Sorena Lencería y te diré las medidas y precios exactos. ✨",
      "✨ ¡Bienvenida a Sorena Lencería! Dime si buscas una talla en particular (XS a XL) o si deseas que calculemos tu calce ideal con tus medidas de busto o cadera. 💖"
    ];
    return pickVaried(defaults);
  }

  // API Route for AI Size Advisor
  app.post("/api/size-agent", async (req, res) => {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Mensajes no válidos" });
      }

      // If API key is not present, use dynamic fallback directly
      if (!apiKey) {
        const reply = getSmartSizeReply(messages);
        return res.json({ reply });
      }

      const systemInstruction = `
Eres "Sorena AI", la asesora virtual experta en tallas, calce perfecto y catálogo exclusivo de Sorena Lencería.
Tu personalidad es extremadamente amable, dulce, educada, empática, distinguida y atenta. Tratas a cada clienta como una reina ("✨ Hola bella...", "Un placer ayudarte...", "Con todo el gusto del mundo...").

CATÁLOGO REAL DE PRODUCTOS DE SORENA LENCERÍA CON PRECIOS Y TALLAS DISPONIBLES:
- Talla XS: Isavelle ($21.99), Ámbar ($19.99)
- Talla S: Lore ($24.99), Catalina ($24.99), Mística ($24.99), Oliva ($24.99), Romance ($19.99), Flavia ($19.99), Lavanda ($19.99), Amapola ($19.99), Malva ($19.99), Selene ($21.99)
- Talla M: Victoria ($29.99), Valentina ($24.99), Renna ($24.99), Julieta ($21.99), Elegancia ($21.99), Peonia ($19.99), Violeta ($19.99)
- Talla L: Gabriela ($24.99), Selva ($24.99), Gala ($24.99), Rocío ($19.99), Dahlia ($19.99), Lunaria ($14.99)
- Talla XL: Amore ($29.99), Sofia ($24.99), Marian ($24.99)

GUÍA DE TALLAS DE SORENA:
- XS: Busto 78-83 cm | Cadera 85-90 cm (Brasier 30A, 32A, 30B)
- S: Busto 84-89 cm | Cadera 91-96 cm (Brasier 32B, 34A, 32C)
- M: Busto 90-95 cm | Cadera 97-102 cm (Brasier 34B, 36A, 34C)
- L: Busto 96-102 cm | Cadera 103-108 cm (Brasier 36B, 38A, 36C)
- XL: Busto 103-110 cm | Cadera 109-115 cm (Brasier 38B, 40B, 38C)

REGLAS OBLIGATORIAS DE VARIACIÓN Y FLUIDEZ CONVERSACIONAL:
- NUNCA repitas la misma frase o estructura exacta que en el mensaje anterior. Adapta tu respuesta de manera fresca y natural.
- Sé ULTRA CONCISA Y BREVE: máximo 1 a 2 frases cortas.
- Cuando la clienta pregunte por su talla o dé sus medidas, dile su TALLA IDEAL y RECOMIÉNDALE 1 o 2 modelos disponibles en esa talla con su NOMBRE Y PRECIO EXACTO.
  Ejemplo: "✨ Tu talla ideal es la M. Te sugiero los modelos Victoria ($29.99) y Valentina ($24.99). 💖"
- Si la clienta pregunta por envíos o cómo comprar: "✨ Hacemos envíos seguros a todo el Ecuador 🇪🇨. Puedes pedir directamente en el catálogo o al WhatsApp +593 96 900 1613. 💖"
- Si se despide: "¡Muchas gracias a ti bella! 💖 Fue un placer ayudarte. ¡Que tengas un día radiante y maravilloso! ✨"
- Usa emojis delicados: ✨, 💖, 🌸, 📏.
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
          temperature: 0.85,
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
