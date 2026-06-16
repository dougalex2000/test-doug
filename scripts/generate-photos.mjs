/**
 * Gera fotos fotorrealistas das ilustrações do site via Vercel AI Gateway
 * (modelo de imagem multimodal) e salva como .webp em public/images/davi.
 *
 * Uso: node --env-file=.env.local scripts/generate-photos.mjs [nome ...]
 *   Sem argumentos gera todas; com argumentos gera só as listadas.
 *
 * Requer AI_GATEWAY_API_KEY (ou VERCEL_OIDC_TOKEN) no ambiente.
 * Pacotes: ai, sharp (instalados com --no-save).
 */
import { generateText } from "ai";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const OUT_DIR = "public/images/davi";
const MODEL = "google/gemini-3.1-flash-image-preview";

const STYLE =
  "Professional photograph, photorealistic, soft diffused studio lighting, " +
  "clean modern environment, high detail, no people, no text or logos in the image.";

/** Nome do arquivo → prompt da cena (inglês para melhor aderência do modelo). */
const photos = {
  "oficina-fablab":
    "Wide-angle photo of a modern assistive-technology fablab makerspace: a row of two desktop 3D printers on a wooden workbench, a laser cutter machine, an electronics workbench with monitor and soldering station, a pegboard wall with hand tools, shelves with colorful small-parts storage bins, and a large central worktable holding a big red adaptive switch button and 3D-printed parts. Bright, organized, welcoming space.",
  "oficina-impressao-3d":
    "Close-up photo of a desktop 3D printer mid-print, producing a bright green keyguard plate with round holes, green filament spool beside it, finished 3D-printed assistive parts on the workbench.",
  "oficina-bancada-eletronica":
    "Photo of an electronics prototyping workbench: breadboard with jumper wires, a blue microcontroller development board (ESP32 style), soldering iron in a stand, multimeter, small LED lit, bench lamp, organized components.",
  "oficina-testes":
    "Photo of an accessibility testing table: a tablet on an articulated mounting arm showing a colorful grid communication board app with large buttons, next to a large round red adaptive switch button connected by cable, comfortable and well-lit space.",
  "catalogo-dispositivos":
    "Overhead flat-lay photo of assistive technology devices arranged neatly on a light surface: a large round red adaptive switch button, a big-keys high-contrast keyboard, a webcam on a small mount, a sip-and-puff tube device, a printed communication board with colorful symbols, and a small microcontroller kit.",
  "device-acionador":
    "Product photo of a large round red adaptive switch button (accessibility jellybean switch), about 10 cm diameter, on a clean light-blue background, cable visible.",
  "device-sopro":
    "Product photo of a sip-and-puff assistive sensor: small green 3D-printed enclosure with a flexible silicone tube and replaceable mouthpiece, on a clean light-green background.",
  "device-olhar":
    "Product photo of a webcam mounted on an adjustable desk stand with a small diffused LED light panel, used for eye-gaze tracking setup, on a clean light background.",
  "device-toque":
    "Product photo of a big-keys high-contrast keyboard with large black keys and bright yellow letters, with a transparent keyguard plate, on a clean warm light background.",
  "device-suporte":
    "Product photo of an articulated tablet mounting arm with clamp base, metal segments and adjustable joints, holding a tablet, on a clean light-gray background.",
  "device-comunicacao":
    "Product photo of an augmentative communication board: laminated card grid with six large colorful picture-symbol buttons, simple icons, on a clean lavender background.",
  "device-kit":
    "Product photo of an open maker kit case with foam compartments containing a blue microcontroller board, colorful buttons, sensors, jumper wires and USB cable, on a clean light-green background.",
  "device-software":
    "Photo of a computer monitor displaying an accessible scanning interface with a grid of large colorful buttons, one highlighted in green, a big red adaptive switch on the desk connected to the computer, clean light background.",
};

const requested = process.argv.slice(2);
const entries = Object.entries(photos).filter(
  ([name]) => requested.length === 0 || requested.includes(name),
);

await mkdir(OUT_DIR, { recursive: true });

let ok = 0;
let failed = 0;
for (const [name, scene] of entries) {
  const out = path.join(OUT_DIR, `${name}.webp`);
  if (existsSync(out)) {
    console.log(`PULADO ${out} (já existe)`);
    continue;
  }
  const prompt = `${scene} ${STYLE}`;
  // Free tier do gateway limita requisições por minuto neste modelo:
  // espera e tenta de novo em vez de falhar.
  let saved = false;
  for (let attempt = 1; attempt <= 8 && !saved; attempt++) {
    try {
      const result = await generateText({ model: MODEL, prompt, maxRetries: 0 });
      const image = result.files.find((f) => f.mediaType?.startsWith("image/"));
      if (!image) throw new Error("o modelo não retornou imagem");
      await writeFile(
        out,
        await sharp(Buffer.from(image.uint8Array)).webp({ quality: 82 }).toBuffer(),
      );
      console.log(`OK ${out}`);
      ok++;
      saved = true;
    } catch (error) {
      const rateLimited = /rate-limit|rate limit|429/i.test(error.message);
      console.error(
        `tentativa ${attempt}/8 ${name}: ${error.message.slice(0, 120)}`,
      );
      if (attempt === 8) {
        failed++;
      } else {
        await sleep(rateLimited ? 65000 : 10000);
      }
    }
  }
  await sleep(3000);
}

console.log(`\nConcluído: ${ok} geradas, ${failed} falhas de ${entries.length}.`);
process.exitCode = failed > 0 ? 1 : 0;
