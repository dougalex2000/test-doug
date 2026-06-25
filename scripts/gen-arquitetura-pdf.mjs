/**
 * Gera o PDF "Arquitetura e Tecnologias do Projeto DAVI"
 * em public/docs/arquitetura-davi.pdf.
 *   node scripts/gen-arquitetura-pdf.mjs
 */
import PDFDocument from "pdfkit";
import { createWriteStream, existsSync, mkdirSync } from "node:fs";

if (!existsSync("public/docs")) mkdirSync("public/docs", { recursive: true });

const doc = new PDFDocument({ size: "A4", margins: { top: 56, bottom: 56, left: 56, right: 56 } });
doc.pipe(createWriteStream("public/docs/arquitetura-davi.pdf"));

const BLUE = "#1d4ed8";
const DARK = "#0a0a0a";
const GRAY = "#52525b";

function h1(t) {
  doc.moveDown(0.6).fillColor(BLUE).font("Helvetica-Bold").fontSize(18).text(t);
  doc.moveDown(0.3);
}
function para(t) {
  doc.fillColor(GRAY).font("Helvetica").fontSize(10.5).text(t, { align: "left" });
  doc.moveDown(0.3);
}
function chips(label, items) {
  doc.fillColor(DARK).font("Helvetica-Bold").fontSize(10.5).text(label + ": ", { continued: true });
  doc.fillColor(GRAY).font("Helvetica").fontSize(10.5).text(items.join("  ·  "));
  doc.moveDown(0.2);
}

// Cabeçalho
doc.fillColor(DARK).font("Helvetica-Bold").fontSize(24).text("Projeto DAVI");
doc.fillColor(BLUE).font("Helvetica-Bold").fontSize(13).text("Arquitetura e Tecnologias");
doc.fillColor(GRAY).font("Helvetica").fontSize(10.5).text("Desenvolvimento Assistivo para Vida Independente — test-doug.vercel.app");
doc.moveDown(0.5);

h1("Onde está hospedado");
para("GitHub — código-fonte e histórico de versões. O envio (git push) ao ramo principal dispara a publicação.");
para("Vercel — hospedagem, build do Next.js e entrega por CDN global. Publica automaticamente a cada push.");
para("Supabase — banco PostgreSQL, autenticação e tempo real (Realtime), hospedado na região de São Paulo (sa-east-1).");

h1("Do código ao ar (CI/CD)");
para("Código (TypeScript + React)  ->  git push (GitHub)  ->  Build na Vercel (Next.js)  ->  CDN global  ->  Usuário no navegador.");
para("Em cerca de um minuto, a nova versão fica publicada — sem etapas manuais.");

h1("Arquitetura em camadas");
para("1) Pessoas e dispositivos: aluno, família, professor, instituição — computador, tablet, celular.");
para("2) Navegador (Frontend): Next.js 16, React 19, Tailwind CSS 4 + APIs nativas (voz, Bluetooth, câmera/MediaPipe, sensores, canvas).");
para("3) Borda/CDN (Vercel): entrega global, Server Components, rotas e redirects.");
para("4) Serviços e dados: Supabase (PostgreSQL, Auth, Realtime) e Vercel AI Gateway.");
para("5) Infraestrutura e publicação: Git, GitHub, Vercel (deploy automático).");

h1("Comunicação em tempo real (DAVI InterCel)");
para("Celular (controle)  ->  Supabase Realtime (WebSocket)  ->  Painel (Tela grande). O localStorage do navegador é mantido como histórico e reserva no mesmo aparelho.");

h1("Stack tecnológica completa");
chips("Linguagens", ["TypeScript", "JavaScript (JSX/TSX)", "SQL", "HTML", "CSS", "Markdown"]);
chips("Framework e runtime", ["Next.js 16 (App Router)", "React 19", "React DOM 19", "Node.js 24"]);
chips("Estilo / UI", ["Tailwind CSS 4", "PostCSS"]);
chips("Backend, dados e tempo real", ["Supabase", "PostgreSQL", "Auth", "Realtime", "@supabase/ssr", "@supabase/supabase-js"]);
chips("Bibliotecas", ["three.js (3D)", "MediaPipe Tasks Vision", "pdfkit + pdf-lib", "sharp", "API do Pexels", "Vercel AI Gateway"]);
chips("APIs do navegador", ["Web Speech (TTS)", "Web Bluetooth", "getUserMedia + Web Audio", "DeviceOrientation/Motion", "Canvas 2D", "Pointer Events", "localStorage", "WebSocket"]);
chips("Ambiente de desenvolvimento", ["Visual Studio Code", "Windows 11", "Node.js 24", "npm 11", "Terminal (PowerShell / Git Bash)"]);
chips("Qualidade e ferramentas", ["ESLint 9", "eslint-config-next", "TypeScript (tipos)", "@types/*"]);
chips("Versionamento, CI/CD e hospedagem", ["Git", "GitHub", "Vercel", "Vercel CLI", "CDN global"]);

doc.moveDown(0.6);
doc.fillColor(GRAY).font("Helvetica-Oblique").fontSize(9).text(
  "Documento gerado automaticamente a partir do projeto. As funcionalidades descritas são possibilidades de pesquisa e desenvolvimento; coletas de dados com participantes devem respeitar ética, consentimento e LGPD.",
);

doc.end();
console.log("PDF gerado: public/docs/arquitetura-davi.pdf");
