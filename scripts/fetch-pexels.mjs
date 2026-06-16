/**
 * Baixa fotos reais do Pexels para os slots de imagem do site e salva como
 * .webp em public/images/davi. Onde não houver boa correspondência, o slot
 * é deixado de fora (mantendo a ilustração vetorial .svg como fallback).
 *
 * Uso: node --env-file=.env.local scripts/fetch-pexels.mjs [slot ...]
 * Requer PEXELS_API_KEY no ambiente.
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = "public/images/davi";
const KEY = process.env.PEXELS_API_KEY;
if (!KEY) {
  console.error("Falta PEXELS_API_KEY no .env.local");
  process.exit(1);
}

/**
 * Slot do site → busca no Pexels (landscape) ou null para manter o SVG.
 * `orientation` ajuda a casar o formato com o uso na página.
 */
const slots = {
  "oficina-fablab": { query: "3d printing laboratory workshop", orientation: "landscape" },
  "oficina-impressao-3d": null,
  "oficina-bancada-eletronica": null,
  "oficina-testes": { query: "occupational therapy technology", orientation: "landscape" },
  "catalogo-dispositivos": null,
  "device-acionador": null,
  "device-sopro": null,
  "device-olhar": { query: "webcam computer monitor desk", orientation: "square" },
  "device-toque": null,
  "device-suporte": { query: "tablet on stand desk", orientation: "square" },
  "device-comunicacao": null,
  "device-kit": null,
  "device-software": { query: "tablet learning app child", orientation: "square" },
};

const requested = process.argv.slice(2);
const entries = Object.entries(slots).filter(
  ([slot, cfg]) => cfg && (requested.length === 0 || requested.includes(slot)),
);

await mkdir(OUT_DIR, { recursive: true });

async function searchPhoto(query, orientation) {
  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("orientation", orientation);
  url.searchParams.set("per_page", "5");
  const res = await fetch(url, { headers: { Authorization: KEY } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.photos?.[0];
}

let ok = 0;
let failed = 0;
for (const [slot, cfg] of entries) {
  try {
    const photo = await searchPhoto(cfg.query, cfg.orientation);
    if (!photo) {
      console.log(`SEM RESULTADO ${slot} ("${cfg.query}") — mantém SVG`);
      failed++;
      continue;
    }
    const src = photo.src.large2x ?? photo.src.large ?? photo.src.original;
    const imgRes = await fetch(src);
    const buf = Buffer.from(await imgRes.arrayBuffer());
    const width = cfg.orientation === "landscape" ? 1200 : 800;
    const height = cfg.orientation === "landscape" ? 520 : 600;
    const out = path.join(OUT_DIR, `${slot}.webp`);
    await writeFile(
      out,
      await sharp(buf).resize(width, height, { fit: "cover" }).webp({ quality: 80 }).toBuffer(),
    );
    console.log(`OK ${out}  (foto de ${photo.photographer}, id ${photo.id})`);
    ok++;
  } catch (error) {
    console.error(`FALHOU ${slot}: ${String(error.message).slice(0, 120)}`);
    failed++;
  }
}

console.log(`\nConcluído: ${ok} baixadas, ${failed} sem foto, de ${entries.length} tentativas.`);
console.log("Lembrete: o Pexels pede crédito ao fotógrafo quando possível.");
