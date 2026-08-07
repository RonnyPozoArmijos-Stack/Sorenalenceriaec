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

  // Helper function for intelligent size calculation fallback
  function getSmartSizeReply(userText: string): string {
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
Eres "Sorena AI", la asesora virtual experta en tallas, calce perfecto y estilismo de Sorena Lencería.
Tu personalidad es extremadamente amable, dulce, educada, empática, distinguida y atenta. Tratas a cada clienta como una reina ("✨ Hola bella...", "Un placer ayudarte...", "Con todo el gusto del mundo...").

TABLA Y GUÍA OFICIAL DE TALLAS DE SORENA LENCERÍA:

1. BRASIERES / BRALETTES / TOPS:
- Talla XS: Busto 78 - 83 cm | Bajo Busto 65 - 70 cm | Brasier habitual: 30A, 32A, 30B
- Talla S: Busto 84 - 89 cm | Bajo Busto 70 - 75 cm | Brasier habitual: 32B, 34A, 32C
- Talla M: Busto 90 - 95 cm | Bajo Busto 75 - 80 cm | Brasier habitual: 34B, 36A, 34C
- Talla L: Busto 96 - 102 cm | Bajo Busto 80 - 85 cm | Brasier habitual: 36B, 38A, 36C
- Talla XL: Busto 103 - 110 cm | Bajo Busto 85 - 92 cm | Brasier habitual: 38B, 40B, 38C
- Talla Única (Ajustable): Abarca de S a L gracias a breteles y espaldas elásticas/regulables (Busto 84 - 98 cm).

2. PANTIS / HILOS / CACHETEROS / BOTTOMS:
- Talla XS: Cadera 85 - 90 cm | Talla de Pantalón: 34 / 2-4
- Talla S: Cadera 91 - 96 cm | Talla de Pantalón: 36 / 6-8
- Talla M: Cadera 97 - 102 cm | Talla de Pantalón: 38 / 10
- Talla L: Cadera 103 - 108 cm | Talla de Pantalón: 40 / 12
- Talla XL: Cadera 109 - 115 cm | Talla de Pantalón: 42 / 14-16

REGLAS DE CONDUCTA Y AMABILIDAD:
- Expresa una amabilidad desbordante y cálida en cada mensaje.
- Sé ULTRA CONCISA Y BREVE: responde en máximo 1 o 2 frases cortas y claras (al grano) para que la lectura sea rápida y cómoda en celular.
- Si la clienta te da sus medidas o talla habitual, dile directamente la Talla Sugerida (ej: "✨ Tu talla ideal es la M.").
- Si la clienta desea terminar la conversación, responde con una despedida ultra dulce y breve:
  "¡Muchas gracias a ti bella! 💖 Fue un placer ayudarte. ¡Que tengas un día radiante y maravilloso! ✨"
- Usa emojis delicados como ✨, 💖, 🌸, 📏.
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
