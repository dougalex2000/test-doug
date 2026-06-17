"use client";

import { useEffect, useState } from "react";

/**
 * Contador de acessos discreto (rodapé).
 * Incrementa uma vez por sessão do navegador; nas demais visitas da sessão,
 * apenas lê o total. Não renderiza nada quando o contador não está disponível.
 */
export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem("davi-visit-counted");
    const method = alreadyCounted ? "GET" : "POST";
    fetch("/api/visitas", { method })
      .then((r) => r.json())
      .then((data: { count: number | null }) => {
        if (typeof data.count === "number") setCount(data.count);
        if (!alreadyCounted) sessionStorage.setItem("davi-visit-counted", "1");
      })
      .catch(() => {
        /* contador indisponível: rodapé segue sem ele */
      });
  }, []);

  if (count === null) return null;

  return (
    <p className="text-xs font-semibold text-zinc-500">
      <span aria-hidden="true">👁️ </span>
      {count.toLocaleString("pt-BR")} acessos ao site
    </p>
  );
}
