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

  // Helper function for intelligent size calculation and product recommendation fallback
  function getSmartSizeReply(userText: string): string {
    const text = userText.toLowerCase().trim();

    // 1. Despedidas o finalización
    if (text.includes('gracias') || text.includes('chao') || text.includes('adiós') || text.includes('adios') || text.includes('hasta luego') || text.includes('finalizar') || text.includes('listo')) {
      return "¡Muchas gracias a ti bella! 💖 Fue un placer ayudarte a encontrar tu calce perfecto. Si necesitas cualquier otra cosa, siempre estaré aquí para ti. ¡Que tengas un día radiante y maravilloso! ✨";
    }

    // 2. Envíos, tienda o cómo comprar en Sorena
    if (text.includes('envío') || text.includes('envios') || text.includes('ecuador') || text.includes('comprar') || text.includes('pago') || text.includes('whatsapp') || text.includes('dónde') || text.includes('donde') || text.includes('tienda')) {
      return "✨ En Sorena Lencería realizamos envíos seguros a todo el Ecuador 🇪🇨. Puedes agregar tus conjuntos al carrito o hacer tu pedido directo al WhatsApp +593 96 900 1613. 💖";
    }

    // 3. Consultas directas por productos específicos por nombre
    if (text.includes('isavelle')) return "✨ El conjunto Isavelle cuesta $21.99 y está disponible en Talla XS. 💖";
    if (text.includes('lore')) return "✨ El conjunto Lore cuesta $24.99 y está disponible en Talla S. 💖";
    if (text.includes('catalina')) return "✨ El conjunto Catalina cuesta $24.99 y está disponible en Talla S. 💖";
    if (text.includes('victoria')) return "✨ El conjunto Victoria cuesta $29.99 y está disponible en Talla M. 💖";
    if (text.includes('valentina')) return "✨ El conjunto Valentina cuesta $24.99 y está disponible en Talla M. 💖";
    if (text.includes('renna')) return "✨ El conjunto Renna cuesta $24.99 y está disponible en Talla M. 💖";
    if (text.includes('julieta')) return "✨ El conjunto Julieta cuesta $21.99 y está disponible en Talla M. 💖";
    if (text.includes('gabriela')) return "✨ El conjunto Gabriela cuesta $24.99 y está disponible en Talla L. 💖";
    if (text.includes('amore')) return "✨ El conjunto Amore cuesta $29.99 y está disponible en Talla XL. 💖";
    if (text.includes('sofia') || text.includes('sofía')) return "✨ El conjunto Sofia cuesta $24.99 y está disponible en Talla XL. 💖";
    if (text.includes('marian')) return "✨ El conjunto Marian cuesta $24.99 y está disponible en Talla XL. 💖";
    if (text.includes('ambar') || text.includes('ámbar')) return "✨ El conjunto Ámbar cuesta $19.99 y está disponible en Talla XS. 💖";
    if (text.includes('oliva')) return "✨ El conjunto Oliva cuesta $24.99 y está disponible en Talla S. 💖";
    if (text.includes('flavia')) return "✨ El conjunto Flavia cuesta $19.99 y está disponible en Talla S. 💖";
    if (text.includes('peonia')) return "✨ El conjunto Peonia cuesta $19.99 y está disponible en Talla M. 💖";
    if (text.includes('lavanda')) return "✨ El conjunto Lavanda cuesta $19.99 y está disponible en Talla S. 💖";
    if (text.includes('selva')) return "✨ El conjunto Selva cuesta $24.99 y está disponible en Talla L. 💖";
    if (text.includes('mistica') || text.includes('mística')) return "✨ El conjunto Mística cuesta $24.99 y está disponible en Talla S. 💖";
    if (text.includes('elegancia')) return "✨ El conjunto Elegancia cuesta $21.99 y está disponible en Talla M. 💖";
    if (text.includes('amapola')) return "✨ El conjunto Amapola cuesta $19.99 y está disponible en Talla S. 💖";
    if (text.includes('rocio') || text.includes('rocío')) return "✨ El conjunto Rocío cuesta $19.99 y está disponible en Talla L. 💖";
    if (text.includes('malva')) return "✨ El conjunto Malva cuesta $19.99 y está disponible en Talla S. 💖";
    if (text.includes('gala')) return "✨ El conjunto Gala cuesta $24.99 y está disponible en Talla L. 💖";
    if (text.includes('dahlia')) return "✨ El conjunto Dahlia cuesta $19.99 y está disponible en Talla L. 💖";
    if (text.includes('violeta')) return "✨ El conjunto Violeta cuesta $19.99 y está disponible en Talla M. 💖";
    if (text.includes('selene')) return "✨ El conjunto Selene cuesta $21.99 y está disponible en Talla S. 💖";
    if (text.includes('lunaria')) return "✨ El conjunto Lunaria cuesta $14.99 y está disponible en Talla L. 💖";
    if (text.includes('romance')) return "✨ El conjunto Romance cuesta $19.99 y está disponible en Talla S. 💖";

    // 4. Consultas directas por Tallas específicas con recomendaciones de productos
    if (/\b(xl|extra large|extra grande)\b/.test(text) || text.includes('talla xl') || text.includes('para xl') || text.includes('medidas xl')) {
      return "✨ Tu talla ideal es XL (Busto 103-110cm, Cadera 109-115cm). Te recomiendo nuestros hermosos modelos: Amore ($29.99), Sofia ($24.99) y Marian ($24.99). 💖";
    }

    if (text.includes('talla l') || text.includes('para l') || text.includes('medidas l') || /\b(talla l|soy l|medida l)\b/.test(text)) {
      return "✨ Tu talla ideal es L (Busto 96-102cm, Cadera 103-108cm). Te recomiendo los modelos: Gabriela ($24.99), Selva ($24.99), Gala ($24.99) y Rocío ($19.99). 💖";
    }

    if (text.includes('talla m') || text.includes('para m') || text.includes('medidas m') || /\b(talla m|soy m|medida m)\b/.test(text)) {
      return "✨ Tu talla ideal es M (Busto 90-95cm, Cadera 97-102cm). Te recomiendo los modelos: Victoria ($29.99), Valentina ($24.99), Renna ($24.99) y Julieta ($21.99). 💖";
    }

    if (text.includes('talla s') || text.includes('para s') || text.includes('medidas s') || /\b(talla s|soy s|medida s)\b/.test(text)) {
      return "✨ Tu talla ideal es S (Busto 84-89cm, Cadera 91-96cm). Te recomiendo los modelos: Lore ($24.99), Catalina ($24.99), Oliva ($24.99) y Flavia ($19.99). 💖";
    }

    if (text.includes('talla xs') || text.includes('para xs') || text.includes('medidas xs') || /\b(talla xs|soy xs|medida xs)\b/.test(text)) {
      return "✨ Tu talla ideal es XS (Busto 78-83cm, Cadera 85-90cm). Te recomiendo los modelos: Isavelle ($21.99) y Ámbar ($19.99). 💖";
    }

    if (text.includes('unica') || text.includes('única') || text.includes('ajustable')) {
      return "✨ La Talla Única Sorena es super versátil: abarca de S a L (busto 84-98 cm, cadera 91-108 cm) gracias a sus correas regulables. 💖";
    }

    // 5. Talla de brasier habitual -> Talla + recomendaciones
    if (/\b(30a|32a|30b)\b/.test(text)) return "✨ Según tu brasier habitual, tu talla ideal es XS. Te sugiero los modelos Isavelle ($21.99) y Ámbar ($19.99). 💖";
    if (/\b(32b|34a|32c)\b/.test(text)) return "✨ Según tu brasier habitual, tu talla ideal es S. Te sugiero los modelos Lore ($24.99), Catalina ($24.99) y Oliva ($24.99). 💖";
    if (/\b(34b|36a|34c)\b/.test(text)) return "✨ Según tu brasier habitual, tu talla ideal es M. Te sugiero los modelos Victoria ($29.99), Valentina ($24.99) y Julieta ($21.99). 💖";
    if (/\b(36b|38a|36c)\b/.test(text)) return "✨ Según tu brasier habitual, tu talla ideal es L. Te sugiero los modelos Gabriela ($24.99), Selva ($24.99) y Gala ($24.99). 💖";
    if (/\b(38b|40b|38c)\b/.test(text)) return "✨ Según tu brasier habitual, tu talla ideal es XL. Te sugiero los modelos Amore ($29.99), Sofia ($24.99) y Marian ($24.99). 💖";

    // 6. Medidas numéricas en cm -> Talla + recomendaciones
    const numbers = text.match(/\d+/g)?.map(Number) || [];
    if (numbers.length > 0) {
      const num = numbers[0];
      if (num >= 70 && num <= 83) return `✨ Para tu medida de ${num} cm, tu talla ideal es XS. Te recomiendo los modelos Isavelle ($21.99) y Ámbar ($19.99). 💖`;
      if (num >= 84 && num <= 89) return `✨ Para tu medida de ${num} cm, tu talla ideal es S. Te recomiendo Lore ($24.99) y Catalina ($24.99). 💖`;
      if (num >= 90 && num <= 95) return `✨ Para tu medida de ${num} cm, tu talla ideal es M. Te recomiendo Victoria ($29.99) y Valentina ($24.99). 💖`;
      if (num >= 96 && num <= 102) return `✨ Para tu medida de ${num} cm, tu talla ideal es L. Te recomiendo Gabriela ($24.99) y Selva ($24.99). 💖`;
      if (num >= 103 && num <= 115) return `✨ Para tu medida de ${num} cm, tu talla ideal es XL. Te recomiendo Amore ($29.99) y Sofia ($24.99). 💖`;
    }

    // 7. Cómo medir
    if (text.includes('cómo medir') || text.includes('como medir') || text.includes('dónde medir') || text.includes('donde medir')) {
      return "📏 Para medir tu busto, pasa la cinta sin apretar por la parte más prominente. Para la cadera, mide la parte más ancha. ¡Dime tus cm y te recomendaré tu talla y modelos ideales! ✨";
    }

    // 8. Default
    return "¡Hola bella! ✨ Dime tus medidas en cm, tu talla habitual (ej. 34B o M) o el modelo que buscas y te diré tu talla perfecta con precios de nuestros modelos. 💖";
  }

  // API Route for AI Size Advisor
  app.post("/api/size-agent", async (req, res) => {
    let lastUserMessage = "";
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Mensajes no válidos" });
      }

      const userMsgs = messages.filter((m: { role: string }) => m.role === 'user');
      if (userMsgs.length > 0) {
        lastUserMessage = userMsgs[userMsgs.length - 1].content || "";
      }

      // If API key is not present, use smart fallback directly
      if (!apiKey) {
        const reply = getSmartSizeReply(lastUserMessage);
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

REGLAS OBLIGATORIAS:
- Sé ULTRA CONCISA Y BREVE: máximo 1 a 2 frases cortas.
- Cuando la clienta pregunte por su talla o dé sus medidas, dile su TALLA IDEAL y RECOMIÉNDALE 1 o 2 modelos disponibles en esa talla con su NOMBRE Y PRECIO EXACTO.
  Ejemplo: "✨ Tu talla ideal es la M. Te recomiendo nuestros modelos Victoria ($29.99) y Valentina ($24.99). 💖"
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
          temperature: 0.7,
        }
      });

      const reply = response.text || getSmartSizeReply(lastUserMessage);
      return res.json({ reply });
    } catch (error: any) {
      console.warn("Gemini Size Agent using smart fallback:", error?.message || error);
      const reply = getSmartSizeReply(lastUserMessage);
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
