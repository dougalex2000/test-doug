"use client";

import { useMemo, useState } from "react";

type TechItem = {
  name: string;
  category: "3d" | "laser" | "eletronica" | "simples";
  categoryLabel: string;
  costEst: number; // R$
  costCommercial: number; // R$
  difficulty: "Fácil" | "Médio" | "Difícil";
  tools: string[];
  description: string;
};

const TECH_ITEMS: TechItem[] = [
  {
    name: "Keyguard Acessível",
    category: "laser",
    categoryLabel: "Corte a Laser / Acrílico",
    costEst: 20.0,
    costCommercial: 380.0,
    difficulty: "Fácil",
    tools: ["Cortadora a Laser (ou serra manual)", "Placa acrílica 3mm"],
    description: "Grade de acrílico com furos precisos posicionada sobre o teclado ou tablet. Impede que o usuário com tremores ou espasticidade pressione mais de uma tecla simultaneamente.",
  },
  {
    name: "Acionador de Pressão (Switch)",
    category: "3d",
    categoryLabel: "Impressão 3D & Eletrônica",
    costEst: 15.0,
    costCommercial: 290.0,
    difficulty: "Médio",
    tools: ["Impressora 3D", "Ferro de solda", "Cabo P2", "Microswitch mecânico"],
    description: "Botão grande e de alta sensibilidade para ser acionado com a mão, pé, bochecha ou cabeça. Conectado ao computador ou tablet para emular cliques do mouse.",
  },
  {
    name: "Sensor de Sopro Adaptado",
    category: "eletronica",
    categoryLabel: "Eletrônica DIY",
    costEst: 45.0,
    costCommercial: 950.0,
    difficulty: "Difícil",
    tools: ["Placa Arduino/ESP32", "Sensor de pressão analógico", "Mangueira de silicone"],
    description: "Dispositivo que detecta pequenos sopros ou aspirações do usuário, convertendo a variação de pressão em um clique de mouse ou tecla. Ideal para tetraplegia severa.",
  },
  {
    name: "Suporte Articulado para Webcam/Tablet",
    category: "simples",
    categoryLabel: "Adaptação Mecânica",
    costEst: 30.0,
    costCommercial: 450.0,
    difficulty: "Fácil",
    tools: ["Tubos de PVC 20mm", "Conectores de PVC", "Grampo jacaré"],
    description: "Suporte ajustável de baixo custo construído em PVC para fixar o tablet ou webcam na altura ideal dos olhos do usuário na cadeira de rodas ou mesa de estudos.",
  },
  {
    name: "Mouse de Cabeça Gyro",
    category: "eletronica",
    categoryLabel: "Impressão 3D & Eletrônica",
    costEst: 60.0,
    costCommercial: 1200.0,
    difficulty: "Difícil",
    tools: ["Sensor acelerômetro/giroscópio", "Arduino Micro", "Suporte para óculos/tiara"],
    description: "Tiara ou óculos adaptados que monitoram o ângulo da cabeça. Movimentos sutis para a esquerda/direita ou cima/baixo movem o ponteiro do mouse na tela de forma natural.",
  },
];

export default function TechGalleryDemo() {
  const [filter, setFilter] = useState<string>("all");

  // Keyguard Customizer State
  const [tabletWidth, setTabletWidth] = useState(25.0); // cm
  const [tabletHeight, setTabletHeight] = useState(17.0); // cm
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(5);
  const [margin, setMargin] = useState(1.5); // cm
  const [keyGap, setKeyGap] = useState(0.4); // cm

  const filteredItems = useMemo(() => {
    if (filter === "all") return TECH_ITEMS;
    return TECH_ITEMS.filter((item) => item.category === filter);
  }, [filter]);

  // Schematic SVG measurements calculation
  const svgWidth = 400;
  const svgHeight = 280;

  // Conversion factor from cm to SVG pixels (scaled to fit nicely in 400x280)
  const scale = useMemo(() => {
    const scaleX = (svgWidth - 40) / tabletWidth;
    const scaleY = (svgHeight - 40) / tabletHeight;
    return Math.min(scaleX, scaleY);
  }, [tabletWidth, tabletHeight]);

  const plateWidthPx = tabletWidth * scale;
  const plateHeightPx = tabletHeight * scale;
  const plateXPx = (svgWidth - plateWidthPx) / 2;
  const plateYPx = (svgHeight - plateHeightPx) / 2;

  const marginPx = margin * scale;
  const keyGapPx = keyGap * scale;

  // Calculate coordinates of key apertures (holes)
  const gridWidthPx = plateWidthPx - marginPx * 2;
  const gridHeightPx = plateHeightPx - marginPx * 2;

  const apertures = useMemo(() => {
    const list = [];
    const cellWidth = (gridWidthPx - keyGapPx * (cols - 1)) / cols;
    const cellHeight = (gridHeightPx - keyGapPx * (rows - 1)) / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = plateXPx + marginPx + c * (cellWidth + keyGapPx);
        const y = plateYPx + marginPx + r * (cellHeight + keyGapPx);
        list.push({
          x,
          y,
          width: Math.max(2, cellWidth),
          height: Math.max(2, cellHeight),
          id: `ap-${r}-${c}`,
        });
      }
    }
    return list;
  }, [rows, cols, gridWidthPx, gridHeightPx, keyGapPx, plateXPx, plateYPx, marginPx]);

  const handleDownloadSVG = () => {
    const cellWidth = (tabletWidth - margin * 2 - keyGap * (cols - 1)) / cols;
    const cellHeight = (tabletHeight - margin * 2 - keyGap * (rows - 1)) / rows;

    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${tabletWidth}cm" height="${tabletHeight}cm" viewBox="0 0 ${tabletWidth} ${tabletHeight}">\n`;
    svgContent += `  <!-- Placa Externa do Keyguard -->\n`;
    svgContent += `  <rect x="0" y="0" width="${tabletWidth}" height="${tabletHeight}" rx="0.5" fill="none" stroke="red" stroke-width="0.05" />\n`;
    svgContent += `  <!-- Furos das Teclas (Corte) -->\n`;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = margin + c * (cellWidth + keyGap);
        const y = margin + r * (cellHeight + keyGap);
        svgContent += `  <rect x="${x.toFixed(3)}" y="${y.toFixed(3)}" width="${cellWidth.toFixed(3)}" height="${cellHeight.toFixed(3)}" rx="0.1" fill="none" stroke="red" stroke-width="0.05" />\n`;
      }
    }
    svgContent += `</svg>`;

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `keyguard-custom-davi-${cols}x${rows}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-10">
      {/* 1. Hardware Catalog Section */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-amber-500 animate-pulse" />
                Catálogo Maker de Baixo Custo
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Projetos abertos que custam até 95% menos que as versões comerciais importadas.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-850">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
                  filter === "all" ? "bg-amber-600 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Todos
              </button>
              <button
                type="button"
                onClick={() => setFilter("laser")}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
                  filter === "laser" ? "bg-amber-600 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Corte Laser
              </button>
              <button
                type="button"
                onClick={() => setFilter("3d")}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
                  filter === "3d" ? "bg-amber-600 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Impressão 3D
              </button>
              <button
                type="button"
                onClick={() => setFilter("eletronica")}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
                  filter === "eletronica" ? "bg-amber-600 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Eletrônica
              </button>
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5 flex flex-col justify-between hover:border-amber-500/50 hover:bg-zinc-950/70 transition duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-extrabold text-white">{item.name}</h4>
                    <span className="text-[9px] font-black uppercase tracking-wider bg-zinc-800 text-amber-400 px-2.5 py-0.5 rounded-full border border-zinc-700">
                      {item.categoryLabel}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-zinc-400 leading-relaxed">{item.description}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tools.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-zinc-900 border border-zinc-850 px-2 py-0.5 text-[9px] font-semibold text-zinc-500"
                      >
                        🔧 {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-900/60 flex items-center justify-between gap-4">
                  <div className="flex gap-4">
                    <div>
                      <span className="block text-[8px] font-bold text-zinc-500 uppercase tracking-wider">Custo Maker</span>
                      <span className="text-sm font-black text-emerald-400">R$ {item.costEst.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-zinc-500 uppercase tracking-wider">Comercial</span>
                      <span className="text-sm font-semibold text-zinc-500 line-through">R$ {item.costCommercial.toFixed(2)}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-300">
                    Dificuldade:{" "}
                    <strong
                      className={`${
                        item.difficulty === "Fácil"
                          ? "text-emerald-400"
                          : item.difficulty === "Médio"
                          ? "text-amber-400"
                          : "text-red-400"
                      }`}
                    >
                      {item.difficulty}
                    </strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Interactive SVG Keyguard Customizer */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Customizer Input Fields */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                ⚙️ Gerador de Keyguard sob Medida
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Ajuste os parâmetros físicos do tablet/tela do usuário e gere o modelo de corte vetorial (SVG) instantaneamente.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-400">Largura Física da Tela (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={tabletWidth}
                  onChange={(e) => setTabletWidth(Math.max(10, Number(e.target.value)))}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-400">Altura Física da Tela (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={tabletHeight}
                  onChange={(e) => setTabletHeight(Math.max(8, Number(e.target.value)))}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-400">Colunas de Teclas (Grelha)</label>
                <input
                  type="number"
                  value={cols}
                  onChange={(e) => setCols(Math.max(2, Math.min(15, Number(e.target.value))))}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-400">Linhas de Teclas (Grelha)</label>
                <input
                  type="number"
                  value={rows}
                  onChange={(e) => setRows(Math.max(2, Math.min(10, Number(e.target.value))))}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-400">Margem Externa / Borda (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={margin}
                  onChange={(e) => setMargin(Math.max(0.5, Math.min(4, Number(e.target.value))))}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-400">Espaço entre Teclas (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={keyGap}
                  onChange={(e) => setKeyGap(Math.max(0.1, Math.min(2, Number(e.target.value))))}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownloadSVG}
              className="rounded-full bg-amber-600 hover:bg-amber-500 text-white font-extrabold px-6 py-3.5 text-sm shadow-lg shadow-amber-900/40 transition flex items-center justify-center gap-2"
            >
              📥 Baixar Arquivo SVG (.svg) para Corte
            </button>
          </div>

          {/* Real-time Dynamic Vector SVG Rendering */}
          <div className="flex flex-col items-center justify-center bg-zinc-950 border border-zinc-850 rounded-2xl p-6 min-h-[320px] shadow-inner">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-4">Esboço em Tempo Real do Corte (Acrílico)</span>

            <div className="relative w-full aspect-[4/3] max-w-sm border border-dashed border-zinc-800 flex items-center justify-center bg-zinc-950">
              <svg width={svgWidth} height={svgHeight} className="overflow-visible">
                {/* External Plate boundary */}
                <rect
                  x={plateXPx}
                  y={plateYPx}
                  width={plateWidthPx}
                  height={plateHeightPx}
                  rx={6}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3.5"
                />

                {/* Inner Grid Area dashed line helper */}
                <rect
                  x={plateXPx + marginPx}
                  y={plateYPx + marginPx}
                  width={gridWidthPx}
                  height={gridHeightPx}
                  fill="none"
                  stroke="rgba(245, 158, 11, 0.15)"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                />

                {/* Key Aperture Holes */}
                {apertures.map((ap) => (
                  <rect
                    key={ap.id}
                    x={ap.x}
                    y={ap.y}
                    width={ap.width}
                    height={ap.height}
                    rx={3}
                    fill="rgba(245, 158, 11, 0.08)"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                  />
                ))}

                {/* Measurements annotations */}
                <text x={plateXPx + plateWidthPx / 2} y={plateYPx - 8} fill="#71717a" fontSize="10" textAnchor="middle" fontWeight="bold">
                  {tabletWidth} cm
                </text>
                <text
                  x={plateXPx - 10}
                  y={plateYPx + plateHeightPx / 2}
                  fill="#71717a"
                  fontSize="10"
                  textAnchor="middle"
                  fontWeight="bold"
                  transform={`rotate(-90 ${plateXPx - 10} ${plateYPx + plateHeightPx / 2})`}
                >
                  {tabletHeight} cm
                </text>
              </svg>
            </div>
            <p className="text-[10px] text-zinc-500 text-center mt-4 leading-normal">
              Linha laranja contínua representa o caminho vetorial de corte a laser. Margem de segurança de {margin} cm configurada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
