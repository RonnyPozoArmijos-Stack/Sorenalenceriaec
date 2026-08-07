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

  // API Route for AI Size Advisor
  app.post("/api/size-agent", async (req, res) => {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Mensajes no válidos" });
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

      const reply = response.text || "Hola bella, para recomendarte tu talla ideal por favor dime tu medida de busto, cadera o la talla de brasier que usas habitualmente (ej. 34B). ✨";
      return res.json({ reply });
    } catch (error: any) {
      console.error("Gemini Size Agent Error:", error);
      return res.status(500).json({ 
        error: "Error procesando la consulta", 
        reply: "Hola bella, ocurrió un pequeño inconveniente al consultar la IA. Puedes revisar la tabla de medidas o escribirnos directamente a WhatsApp. ✨"
      });
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
