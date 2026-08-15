import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, Ruler, RefreshCw, MessageSquare, Image, Check, Bot } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

const SizeAgentFloating: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'table'>('chat');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  
  const initialGreeting: Message = {
    id: '1',
    role: 'assistant',
    content: '¡Hola bella! ✨ Soy tu Asesora Virtual de Tallas en Sorena Lencería. ¿Quieres saber cuál es tu talla ideal? Escríbeme tus medidas de busto/cadera o tu talla habitual de brasier (ej. 34B) y te aconsejaré con todo el gusto del mundo. 💖',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const [messages, setMessages] = useState<Message[]>([initialGreeting]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, isOpen, activeTab]);

  const handleRestartChat = () => {
    setMessages([{
      id: Date.now().toString(),
      role: 'assistant',
      content: '¡Hola de nuevo bella! ✨ Estoy lista para ayudarte con tus medidas o consultas sobre Sorena Lencería. ¿En qué te puedo asesorar hoy? 💖',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setIsEnded(false);
    setInput('');
  };

  const handleEndConversation = () => {
    if (isEnded) return;
    const farewellMsg: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: '¡Muchas gracias por consultar con Sorena Lencería! 💖 Fue un verdadero placer y un honor atenderte. Si necesitas cualquier otra asesoría para resaltar tu elegancia, aquí estaré siempre para ti. ¡Que tengas un día radiante y maravilloso! ✨🌸',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, farewellMsg]);
    setIsEnded(true);
  };

  const getSmartFallbackReply = (userText: string, currentMsgs: Message[] = []): string => {
    const text = userText.toLowerCase().trim();
    const prevAssistantMsgs = currentMsgs.filter(m => m.role === 'assistant').map(m => m.content);

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
    if (text.includes('pago') || text.includes('transferencia') || text.includes('tarjeta') || text.includes('pichincha') || text.includes('guayaquil') || text.includes('deuna') || text.includes('comprar') || text.includes('como pido')) {
      return pickVaried([
        `${pickVaried(greetings)} Aceptamos transferencias bancarias (Pichincha, Guayaquil, Produbanco), Deuna!, tarjetas de crédito/débito y pagos online seguros. Puedes realizar tu pedido desde el carrito de la tienda o directo a nuestro WhatsApp +593 96 900 1613. 💖 ${pickVaried(closings)}`,
        `✨ Tienes varias opciones muy cómodas: transferencia directa, Deuna! o tarjeta de crédito/débito. Al confirmar tu carrito te daremos los datos exactos o podemos coordinar todo vía WhatsApp. 🌸 ${pickVaried(closings)}`
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
        `✨ ¡Puedes visitarnos en nuestra tienda física en La Libertad, Santa Elena, dentro de TIENDA MULTIMARCA JOBMAR! Además realizamos envíos seguros a todo el Ecuador con atención personalizada por WhatsApp +593 96 900 1613. 💖 ${pickVaried(closings)}`,
        `🌸 Contamos con punto físico multimarca JOBMAR en La Libertad (Santa Elena) y envíos express a todas las ciudades del país vía Servientrega o Tramaco. ✨ ${pickVaried(closings)}`
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
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    if (isEnded) {
      setIsEnded(false);
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!customText) setInput('');
    setIsLoading(true);

    try {
      const apiMessages = newMessages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/size-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });

      const data = await res.json();
      const replyText = data?.reply || getSmartFallbackReply(textToSend, newMessages);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.warn("Error connecting to AI size agent, using local fallback:", err);
      const fallbackReply = getSmartFallbackReply(textToSend, newMessages);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "¿Qué talla soy si uso brasier 34B?",
    "Tengo 90 cm de busto y 96 cm de cadera",
    "¿Cómo mido mi busto y cadera?",
    "¿Qué significa Talla Única?"
  ];

  return (
    <>
      {/* Floating Button Icon */}
      <div className="fixed left-6 bottom-20 md:left-8 md:bottom-8 z-[60]">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative group flex items-center justify-center p-3.5 md:p-4 rounded-full bg-gradient-to-r from-rose-gold via-[#C0788A] to-rose-gold text-white shadow-[0_10px_30px_rgba(212,165,165,0.5)] border border-white/40 cursor-pointer"
        >
          {/* Animated Glow Aura */}
          <div className="absolute inset-0 rounded-full bg-rose-gold opacity-50 animate-ping pointer-events-none" />
          <div className="absolute inset-0 rounded-full bg-rose-gold/30 blur-xl animate-pulse pointer-events-none" />

          <div className="relative flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
            <span className="hidden sm:inline font-sans text-[10px] font-bold uppercase tracking-[0.2em] pr-1">
              ¿Tu Talla?
            </span>
          </div>

          {/* Badge Tooltip */}
          <span className="absolute -top-2 -right-2 bg-rich-black text-white text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-rose-gold/50 shadow-md">
            IA
          </span>
        </motion.button>
      </div>

      {/* Floating Chat Modal Popover & Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop Overlay to dismiss on tap */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs z-[9998]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="fixed inset-x-2 top-8 bottom-16 sm:inset-x-3 sm:top-12 sm:bottom-20 md:top-auto md:bottom-24 md:left-8 md:right-auto z-[9999] w-auto md:w-[420px] max-h-[85vh] md:h-[530px] bg-white dark:bg-luxury-gray rounded-2xl border border-rose-gold/30 shadow-[0_25px_60px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-rich-black via-warm-charcoal to-rich-black text-white px-3.5 py-3 sm:px-4 sm:py-3.5 flex items-center justify-between border-b border-rose-gold/20 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-rose-gold to-white/20 flex items-center justify-center p-0.5 shadow-md shrink-0">
                    <div className="w-full h-full bg-rich-black rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-rose-gold animate-pulse" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full border border-rich-black" />
                  </div>
                  <div>
                    <h3 className="font-serif italic text-sm sm:text-base text-white font-medium flex items-center gap-1.5 leading-tight">
                      Asesora de Tallas Sorena
                    </h3>
                    <p className="text-[9px] text-rose-gold uppercase tracking-[0.2em] font-semibold">
                      Inteligencia Artificial
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Botón X de Cierre destacado y de gran visibilidad */}
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Cerrar asistente"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-gold hover:bg-rose-gold-dark text-white text-[11px] font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-all border border-white/40 cursor-pointer shrink-0"
                    aria-label="Cerrar asistente virtual"
                  >
                    <span>Cerrar</span>
                    <X className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>

            {/* Navigation Tabs (Chat vs Tabla) */}
            <div className="flex border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 text-[10px] font-bold uppercase tracking-[0.2em] shrink-0">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2.5 flex items-center justify-center gap-2 border-b-2 transition-all ${
                  activeTab === 'chat'
                    ? 'border-rose-gold text-rose-gold bg-white dark:bg-luxury-gray'
                    : 'border-transparent text-gray-400 hover:text-warm-charcoal dark:hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Asistente IA</span>
              </button>
              <button
                onClick={() => setActiveTab('table')}
                className={`flex-1 py-2.5 flex items-center justify-center gap-2 border-b-2 transition-all ${
                  activeTab === 'table'
                    ? 'border-rose-gold text-rose-gold bg-white dark:bg-luxury-gray'
                    : 'border-transparent text-gray-400 hover:text-warm-charcoal dark:hover:text-white'
                }`}
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Tabla de Medidas</span>
              </button>
            </div>

            {/* Tab Body */}
            {activeTab === 'chat' ? (
              <div className="flex-1 flex flex-col min-h-0 bg-ivory-light/30 dark:bg-black/40">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-3.5 space-y-3 no-scrollbar">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {m.role === 'assistant' && (
                        <div className="w-6 h-6 rounded-full bg-rose-gold/15 border border-rose-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-3.5 h-3.5 text-rose-gold" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] p-2.5 sm:p-3 rounded-2xl text-xs leading-relaxed shadow-sm font-sans ${
                          m.role === 'user'
                            ? 'bg-rose-gold text-white rounded-br-none'
                            : 'bg-white dark:bg-luxury-gray border border-gray-100 dark:border-white/10 text-warm-charcoal dark:text-soft-white rounded-bl-none'
                        }`}
                      >
                        <p className="whitespace-pre-line">{m.content}</p>
                        <span
                          className={`block text-[8px] mt-1 opacity-60 text-right ${
                            m.role === 'user' ? 'text-white' : 'text-gray-400'
                          }`}
                        >
                          {m.time}
                        </span>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-2 justify-start">
                      <div className="w-6 h-6 rounded-full bg-rose-gold/15 border border-rose-gold/30 flex items-center justify-center shrink-0">
                        <Bot className="w-3.5 h-3.5 text-rose-gold" />
                      </div>
                      <div className="bg-white dark:bg-luxury-gray border border-gray-100 dark:border-white/10 p-2.5 rounded-2xl rounded-bl-none flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-rose-gold rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-rose-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-2 h-2 bg-rose-gold rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Botones de acción fija y sugerencias prediseñadas */}
                <div className="p-2.5 bg-white/90 dark:bg-black/40 border-t border-gray-100 dark:border-white/5 space-y-2 shrink-0">
                  {/* Botones de Acciones Predeterminadas (Opciones para terminar o seguir) */}
                  <div className="flex items-center justify-between gap-1.5">
                    {!isEnded ? (
                      <button
                        onClick={handleEndConversation}
                        className="flex-1 py-1.5 px-2 rounded-full bg-rose-gold/10 hover:bg-rose-gold border border-rose-gold/30 text-rose-gold hover:text-white text-[9px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1"
                      >
                        <span>✨ Finalizar Chat</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleRestartChat}
                        className="flex-1 py-1.5 px-2 rounded-full bg-rose-gold text-white text-[9px] font-bold uppercase tracking-wider shadow-sm hover:bg-rose-gold-dark transition-all flex items-center justify-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Nueva Consulta</span>
                      </button>
                    )}

                    <button
                      onClick={() => setActiveTab('table')}
                      className="flex-1 py-1.5 px-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-warm-charcoal dark:text-soft-white text-[9px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1"
                    >
                      <Ruler className="w-3 h-3" />
                      <span>Ver Tabla</span>
                    </button>
                  </div>

                  {/* Sugerencias Rápidas */}
                  {!isEnded && (
                    <div className="flex gap-1 overflow-x-auto no-scrollbar pt-0.5">
                      {quickPrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(prompt)}
                          className="whitespace-nowrap text-[9px] bg-rose-gold/5 hover:bg-rose-gold/15 text-warm-charcoal dark:text-soft-white border border-rose-gold/20 px-2.5 py-1 rounded-full transition-all shrink-0"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Input Area */}
                {!isEnded && (
                  <div className="p-2.5 bg-white dark:bg-luxury-gray border-t border-gray-100 dark:border-white/10 flex items-center gap-2 shrink-0">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Escribe tu medida o talla habitual..."
                      className="flex-1 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-full px-3.5 py-2 text-xs text-warm-charcoal dark:text-soft-white placeholder-gray-400 focus:outline-none focus:border-rose-gold transition-colors"
                    />
                    <button
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isLoading}
                      className="p-2 rounded-full bg-rose-gold text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-rose-gold-dark transition-all shadow-md active:scale-95"
                      title="Enviar mensaje"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Tab: Visual Size Chart Image */
              <div className="flex-1 p-3 overflow-y-auto flex flex-col items-center justify-center bg-gray-50 dark:bg-black/30">
                <div className="relative w-full h-full min-h-[260px] rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 flex items-center justify-center p-2 shadow-inner">
                  <img
                    src="https://res.cloudinary.com/dyqz0n0to/image/upload/v1780535886/WhatsApp_Image_2026-06-03_at_7.04.25_PM_pmkxff.jpg"
                    alt="Tabla de Tallas Sorena Lencería"
                    className="max-w-full max-h-full object-contain rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 italic text-center mt-2 font-serif">
                  Medidas estándar para tops, brasieres y pantis Sorena.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
};

export default SizeAgentFloating;
