"use client";

import DisplayCards from "@/components/ui/display-cards";
import { Sparkles } from "lucide-react";

const defaultCards = [
  {
    icon: <Sparkles className="size-4 text-rose-gold" />,
    title: "Colección Seda",
    description: "Seda de satín y encajes finos",
    date: "Nuevo Lanzamiento",
    iconClassName: "text-rose-gold",
    titleClassName: "text-rose-gold-dark dark:text-rose-gold font-serif italic",
    className:
      "[grid-area:stack] hover:-translate-y-12 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/40 grayscale-[40%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-rose-gold" />,
    title: "Ajuste Sublime",
    description: "Soporte de alta costura",
    date: "Aclamado por clientes",
    iconClassName: "text-rose-gold",
    titleClassName: "text-rose-gold-dark dark:text-rose-gold font-serif italic",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-2 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/40 grayscale-[40%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-rose-gold" />,
    title: "Detalles Únicos",
    description: "Empaque de lujo y obsequios",
    date: "Selección Premium",
    iconClassName: "text-rose-gold",
    titleClassName: "text-rose-gold-dark dark:text-rose-gold font-serif italic",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

function DisplayCardsDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center py-20">
      <div className="w-full max-w-3xl">
        <DisplayCards cards={defaultCards} />
      </div>
    </div>
  );
}

export { DisplayCardsDemo };
