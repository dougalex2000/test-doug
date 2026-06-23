/**
 * Utilitários de vídeo para o DAVI Escola.
 *
 * Suporta dois tipos de fonte na mesma estrutura de dados (campo `videoUrl`):
 *   - arquivos próprios do DAVI (ex.: "/videos/portugues/letra-b.mp4");
 *   - links do YouTube usados como referência/placeholder inicial.
 *
 * Assim os links podem ser trocados facilmente depois, sem mudar componentes.
 */

/** Detecta se a URL é um vídeo do YouTube (watch, youtu.be ou embed). */
export function isYouTube(url: string | undefined): boolean {
  if (!url) return false;
  return /(?:youtube\.com|youtu\.be)/i.test(url);
}

/** Extrai o ID do vídeo e o tempo inicial (em segundos) de um link do YouTube. */
function parseYouTube(url: string): { id: string; start: number } | null {
  try {
    const u = new URL(url);
    let id = "";
    if (u.hostname.includes("youtu.be")) {
      id = u.pathname.replace(/^\//, "");
    } else if (u.pathname.startsWith("/embed/")) {
      id = u.pathname.replace("/embed/", "");
    } else {
      id = u.searchParams.get("v") ?? "";
    }
    if (!id) return null;

    // Tempo inicial: aceita "90", "1m30s", etc.
    const t = u.searchParams.get("t") ?? u.searchParams.get("start") ?? "";
    let start = 0;
    if (/^\d+$/.test(t)) start = Number(t);
    else {
      const m = t.match(/(?:(\d+)m)?(?:(\d+)s)?/);
      if (m) start = (Number(m[1] || 0) * 60) + Number(m[2] || 0);
    }
    return { id, start };
  } catch {
    return null;
  }
}

/** Converte um link do YouTube em URL de incorporação (iframe), sem autoplay. */
export function youtubeEmbedUrl(url: string): string | null {
  const p = parseYouTube(url);
  if (!p) return null;
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (p.start > 0) params.set("start", String(p.start));
  return `https://www.youtube-nocookie.com/embed/${p.id}?${params.toString()}`;
}
