"use client";

import { useState } from "react";
import AccessibilityAssistantDemo from "../components/AccessibilityAssistantDemo";
import AssistiveKeyboardDemo from "../components/AssistiveKeyboardDemo";
import ProgressDashboardDemo from "../components/ProgressDashboardDemo";
import { PageHero, PageShell } from "../components/SiteShell";
import SpeechSynthDemo from "../components/SpeechSynthDemo";
import TechGalleryDemo from "../components/TechGalleryDemo";

type TabId = "keyboard" | "assistant" | "dashboard" | "maker";

export default function NovaVersaoPage() {
  const [activeTab, setActiveTab] = useState<TabId>("keyboard");

  return (
    <PageShell>
      <PageHero
        eyebrow="Laboratório Experimental DAVI"
        title="Proposta de Evolução da Plataforma"
        description="Esta área apresenta os novos recursos e protótipos funcionais da plataforma DAVI. Experimente os módulos abaixo e simule a interação assistiva diretamente no navegador."
      />

      <section className="bg-zinc-950 min-h-screen px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          {/* Tabs Navigation */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6 mb-10">
            <div className="flex flex-wrap gap-2.5 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-850 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab("keyboard")}
                className={`rounded-xl px-5 py-3 text-sm font-black transition-all ${
                  activeTab === "keyboard"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/35 scale-[1.02]"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-850"
                }`}
              >
                💬 Teclado & Comunicação
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("assistant")}
                className={`rounded-xl px-5 py-3 text-sm font-black transition-all ${
                  activeTab === "assistant"
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-900/35 scale-[1.02]"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-850"
                }`}
              >
                🤖 Configurador IA
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("dashboard")}
                className={`rounded-xl px-5 py-3 text-sm font-black transition-all ${
                  activeTab === "dashboard"
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/35 scale-[1.02]"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-850"
                }`}
              >
                📊 Dashboard Evolução
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("maker")}
                className={`rounded-xl px-5 py-3 text-sm font-black transition-all ${
                  activeTab === "maker"
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-900/35 scale-[1.02]"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-850"
                }`}
              >
                🛠️ Galeria & Oficina Maker
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-2 rounded-xl bg-zinc-900/60 px-4 py-2 border border-zinc-850">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Ambiente de Testes Ativo
              </span>
            </div>
          </div>

          {/* Active Tab Component */}
          <div className="transition-all duration-300">
            {activeTab === "keyboard" && (
              <div className="flex flex-col gap-10">
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div>
                    <h4 className="text-2xl font-black text-white">Comunicação Alternativa e Escrita</h4>
                    <p className="mt-3 text-zinc-400 text-sm leading-relaxed">
                      Este painel reúne duas soluções voltadas a viabilizar a comunicação de pessoas sem fala funcional ou capacidade de escrita convencional.
                    </p>
                    <div className="mt-5 space-y-4 text-xs text-zinc-400 leading-relaxed border-l-2 border-blue-500 pl-4 bg-blue-950/10 py-2.5 rounded-r-xl">
                      <p>
                        <strong>Dwell Mode (Permanência):</strong> Quando ativo, você não precisa clicar. Basta posicionar o cursor do mouse (simulando o olhar) sobre uma tecla e aguardar o preenchimento do indicador. Excelente para testar a ergonomia e tempo de resposta.
                      </p>
                      <p>
                        <strong>Síntese de Voz (TTS):</strong> O botão &ldquo;Vocalizar&rdquo; ou a prancha pictográfica convertem o texto escrito em voz sintetizada nativa em português brasileiro.
                      </p>
                    </div>
                  </div>

                  <SpeechSynthDemo />
                </div>

                <div className="border-t border-zinc-850 pt-10">
                  <h4 className="text-xl font-bold text-white mb-6">Escrita Livre com Teclado Adaptado</h4>
                  <AssistiveKeyboardDemo />
                </div>
              </div>
            )}

            {activeTab === "assistant" && (
              <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
                <div>
                  <h4 className="text-2xl font-black text-white">Prescrição e Recomendação Assistiva</h4>
                  <p className="mt-3 text-zinc-400 text-sm leading-relaxed">
                    Mapear as necessidades e habilidades de um usuário é o primeiro passo para o sucesso da tecnologia assistiva. O Configurador Inteligente simula um diálogo com especialistas para estruturar o perfil de uso.
                  </p>
                  <ul className="mt-6 space-y-3.5 text-xs text-zinc-300">
                    <li className="flex items-center gap-2.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-violet-600/35 text-violet-400 font-extrabold">1</span>
                      Indique a mobilidade física consistente.
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-violet-600/35 text-violet-400 font-extrabold">2</span>
                      Defina o perfil de escolaridade/cognitivo.
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-violet-600/35 text-violet-400 font-extrabold">3</span>
                      Informe o ambiente de aplicação.
                    </li>
                  </ul>
                  <p className="mt-6 text-xs text-zinc-500 leading-normal border-t border-zinc-900 pt-4">
                    As recomendações geradas conectam-se diretamente com os parâmetros de software (tempo de varredura/dwell) e os modelos físicos de hardware do catálogo maker.
                  </p>
                </div>

                <AccessibilityAssistantDemo />
              </div>
            )}

            {activeTab === "dashboard" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="text-2xl font-black text-white">Acompanhamento e Registro Pedagógico</h4>
                  <p className="mt-3 text-zinc-400 text-sm leading-relaxed max-w-3xl">
                    Monitore a frequência de uso, precisão do olhar e evolução na digitação. Os terapeutas e professores podem registrar notas de observação clínica que alimentam os relatórios gerados.
                  </p>
                </div>
                <ProgressDashboardDemo />
              </div>
            )}

            {activeTab === "maker" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="text-2xl font-black text-white">Oficina Assistiva Maker</h4>
                  <p className="mt-3 text-zinc-400 text-sm leading-relaxed max-w-3xl">
                    Desenvolva seus próprios dispositivos físicos de acessibilidade utilizando fabricação digital de baixo custo. Os arquivos STL e SVG são abertos para livre adaptação e fabricação.
                  </p>
                </div>
                <TechGalleryDemo />
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
