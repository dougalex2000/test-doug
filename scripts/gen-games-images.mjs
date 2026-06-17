/** Gera as imagens ilustrativas do DAVI Games (SVG -> PNG via sharp). */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const OUT = "public/images/games";
await mkdir(OUT, { recursive: true });

const star = (cx, cy, r, fill) => {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const ang = (Math.PI / 5) * i - Math.PI / 2;
    const rad = i % 2 === 0 ? r : r * 0.45;
    pts.push(`${(cx + rad * Math.cos(ang)).toFixed(1)},${(cy + rad * Math.sin(ang)).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(" ")}" fill="${fill}"/>`;
};

/* ---------------- HERO ---------------- */
const hero = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 680">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#eef4ff"/><stop offset="1" stop-color="#e3f0ff"/>
    </linearGradient>
    <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eaf2ff"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="680" fill="url(#bg)"/>
  <circle cx="220" cy="120" r="90" fill="#bfdbfe" opacity="0.5"/>
  <circle cx="1380" cy="560" r="120" fill="#bbf7d0" opacity="0.45"/>
  <circle cx="1480" cy="120" r="60" fill="#fde68a" opacity="0.5"/>

  <!-- mesa -->
  <rect x="120" y="540" width="780" height="16" rx="8" fill="#94a3b8"/>

  <!-- suporte do tablet -->
  <rect x="470" y="470" width="90" height="74" rx="8" fill="#475569"/>
  <rect x="430" y="455" width="170" height="20" rx="10" fill="#334155"/>

  <!-- tablet com jogo da velha -->
  <g transform="translate(250,150)">
    <rect x="0" y="0" width="520" height="330" rx="24" fill="#0f172a"/>
    <rect x="20" y="20" width="480" height="290" rx="12" fill="url(#screen)"/>
    <!-- grade -->
    <g stroke="#1d4ed8" stroke-width="8" stroke-linecap="round">
      <path d="M180 50 V280 M340 50 V280 M60 130 H460 M60 205 H460"/>
    </g>
    <!-- X e O -->
    <g stroke="#1d4ed8" stroke-width="12" stroke-linecap="round" fill="none">
      <path d="M95 70 L145 110 M145 70 L95 110"/>
      <path d="M255 145 L305 185 M305 145 L255 185"/>
    </g>
    <circle cx="400" cy="90" r="28" fill="none" stroke="#16a34a" stroke-width="12"/>
    <circle cx="120" cy="245" r="28" fill="none" stroke="#16a34a" stroke-width="12"/>
    <!-- casa destacada (varredura) -->
    <rect x="350" y="215" width="100" height="62" rx="8" fill="#fde047" opacity="0.55" stroke="#f59e0b" stroke-width="6"/>
  </g>

  <!-- botão adaptado -->
  <g transform="translate(640,470)">
    <ellipse cx="70" cy="62" rx="78" ry="16" fill="#1e293b" opacity="0.15"/>
    <rect x="6" y="34" width="128" height="30" rx="12" fill="#b91c1c"/>
    <ellipse cx="70" cy="34" rx="64" ry="22" fill="#dc2626"/>
    <ellipse cx="70" cy="28" rx="48" ry="15" fill="#f87171"/>
  </g>
  <path d="M470 500 Q 560 520 640 500" stroke="#334155" stroke-width="6" fill="none" stroke-linecap="round"/>

  <!-- óculos VR -->
  <g transform="translate(1080,250)">
    <rect x="0" y="0" width="300" height="150" rx="40" fill="#1e293b"/>
    <rect x="24" y="28" width="118" height="94" rx="20" fill="#3b82f6"/>
    <rect x="158" y="28" width="118" height="94" rx="20" fill="#22c55e"/>
    <circle cx="83" cy="75" r="22" fill="#bfdbfe"/>
    <circle cx="217" cy="75" r="22" fill="#bbf7d0"/>
    <path d="M0 60 H-40 M300 60 H340" stroke="#334155" stroke-width="14" stroke-linecap="round"/>
  </g>
  <text x="1230" y="445" font-family="Arial, sans-serif" font-size="34" font-weight="bold" fill="#475569" text-anchor="middle">Realidade Virtual</text>

  <!-- elementos de gamificação flutuando -->
  ${star(1040, 130, 46, "#f59e0b")}
  ${star(960, 250, 28, "#fbbf24")}
  <!-- troféu -->
  <g transform="translate(1320,470)">
    <path d="M20 0 H100 V24 Q100 70 60 80 Q20 70 20 24 Z" fill="#f59e0b"/>
    <path d="M20 8 H4 Q-6 30 24 40 M100 8 H116 Q126 30 96 40" fill="none" stroke="#f59e0b" stroke-width="8"/>
    <rect x="48" y="80" width="24" height="24" fill="#d97706"/>
    <rect x="30" y="104" width="60" height="14" rx="4" fill="#d97706"/>
  </g>
  <!-- +10 pontos -->
  <g transform="translate(900,360)">
    <rect x="0" y="0" width="120" height="52" rx="26" fill="#1d4ed8"/>
    <text x="60" y="35" font-family="Arial, sans-serif" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">+10</text>
  </g>
  <!-- barra de progresso -->
  <g transform="translate(960,470)">
    <rect x="0" y="0" width="220" height="22" rx="11" fill="#e2e8f0"/>
    <rect x="0" y="0" width="150" height="22" rx="11" fill="#22c55e"/>
  </g>
</svg>`;

/* ---------------- JOGO DA VELHA ---------------- */
const velha = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900">
  <defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eff6ff"/><stop offset="1" stop-color="#dbeafe"/></linearGradient></defs>
  <rect width="900" height="900" fill="url(#b)"/>
  <rect x="150" y="150" width="600" height="600" rx="28" fill="#ffffff" stroke="#cbd5e1" stroke-width="6"/>
  <g stroke="#1d4ed8" stroke-width="14" stroke-linecap="round"><path d="M350 200 V700 M550 200 V700 M200 350 H700 M200 550 H700"/></g>
  <g stroke="#1d4ed8" stroke-width="20" stroke-linecap="round" fill="none">
    <path d="M235 235 L315 315 M315 235 L235 315"/>
    <path d="M435 435 L515 515 M515 435 L435 515"/>
  </g>
  <circle cx="650" cy="275" r="46" fill="none" stroke="#16a34a" stroke-width="20"/>
  <circle cx="275" cy="650" r="46" fill="none" stroke="#16a34a" stroke-width="20"/>
  <!-- casa destacada por varredura -->
  <rect x="560" y="560" width="180" height="180" rx="12" fill="#fde047" opacity="0.5" stroke="#f59e0b" stroke-width="10"/>
  <text x="450" y="845" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#475569" text-anchor="middle">Varredura: casa destacada</text>
</svg>`;

/* ---------------- GAMIFICAÇÃO ---------------- */
const gamif = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbeb"/><stop offset="1" stop-color="#fef3c7"/></linearGradient></defs>
  <rect width="1200" height="600" fill="url(#g)"/>
  ${star(220, 180, 80, "#f59e0b")}${star(360, 120, 40, "#fbbf24")}${star(120, 300, 34, "#fbbf24")}
  <!-- medalha -->
  <g transform="translate(520,120)">
    <path d="M40 0 L70 80 L10 80 Z" fill="#60a5fa"/><path d="M120 0 L150 80 L90 80 Z" fill="#3b82f6"/>
    <circle cx="80" cy="150" r="80" fill="#fbbf24" stroke="#d97706" stroke-width="10"/>
    <circle cx="80" cy="150" r="52" fill="#fde68a"/>
    <text x="80" y="168" font-family="Arial" font-size="56" font-weight="bold" fill="#b45309" text-anchor="middle">★</text>
  </g>
  <!-- troféu -->
  <g transform="translate(820,150)">
    <path d="M30 0 H150 V36 Q150 110 90 124 Q30 110 30 36 Z" fill="#f59e0b"/>
    <rect x="72" y="124" width="36" height="36" fill="#d97706"/><rect x="45" y="160" width="90" height="20" rx="6" fill="#d97706"/>
  </g>
  <!-- barra de progresso e níveis -->
  <g transform="translate(180,430)">
    <rect x="0" y="0" width="840" height="40" rx="20" fill="#ffffff" stroke="#fcd34d" stroke-width="4"/>
    <rect x="0" y="0" width="560" height="40" rx="20" fill="#22c55e"/>
    <text x="420" y="100" font-family="Arial, sans-serif" font-size="34" font-weight="bold" fill="#92400e" text-anchor="middle">Progresso, pontos, fases e conquistas</text>
  </g>
</svg>`;

/* ---------------- ÓCULOS VR / AR ---------------- */
const vr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600">
  <defs><linearGradient id="v" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef2ff"/><stop offset="1" stop-color="#e0f2fe"/></linearGradient></defs>
  <rect width="1200" height="600" fill="url(#v)"/>
  <circle cx="1050" cy="120" r="90" fill="#c7d2fe" opacity="0.5"/><circle cx="160" cy="470" r="100" fill="#bae6fd" opacity="0.5"/>
  <!-- óculos VR grande -->
  <g transform="translate(330,190)">
    <rect x="0" y="0" width="540" height="240" rx="60" fill="#1e293b"/>
    <rect x="40" y="44" width="210" height="152" rx="30" fill="#3b82f6"/>
    <rect x="290" y="44" width="210" height="152" rx="30" fill="#22c55e"/>
    <circle cx="145" cy="120" r="40" fill="#bfdbfe"/><circle cx="395" cy="120" r="40" fill="#bbf7d0"/>
    <path d="M0 100 H-50 M540 100 H590" stroke="#334155" stroke-width="22" stroke-linecap="round"/>
  </g>
  <!-- elementos AR flutuando -->
  ${star(180, 160, 40, "#f59e0b")}
  <g transform="translate(120,300)"><rect width="120" height="120" rx="20" fill="#ffffff" stroke="#3b82f6" stroke-width="6"/><text x="60" y="86" font-family="Arial" font-size="70" font-weight="bold" fill="#1d4ed8" text-anchor="middle">A</text></g>
  <g transform="translate(960,330)"><rect width="120" height="120" rx="20" fill="#ffffff" stroke="#16a34a" stroke-width="6"/><text x="60" y="90" font-family="Arial" font-size="64" font-weight="bold" fill="#15803d" text-anchor="middle">3</text></g>
  <g transform="translate(940,150)"><circle r="46" cx="46" cy="46" fill="#ffffff" stroke="#f59e0b" stroke-width="6"/><circle r="20" cx="46" cy="46" fill="#3b82f6"/></g>
  <text x="600" y="500" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#475569" text-anchor="middle">Realidade virtual, aumentada e óculos inteligentes</text>
</svg>`;

const jobs = [
  ["davi-games-hero", hero, 1600, 680],
  ["jogo-da-velha-acessivel", velha, 900, 900],
  ["gamificacao-davi", gamif, 1200, 600],
  ["oculos-smart-realidade-virtual", vr, 1200, 600],
];

for (const [name, svg, w, h] of jobs) {
  const info = await sharp(Buffer.from(svg)).resize(w, h).png({ compressionLevel: 9 }).toFile(`${OUT}/${name}.png`);
  console.log(`${name}.png`, info.width + "x" + info.height, Math.round(info.size / 1024) + "KB");
}
