"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  sender: "user" | "ai";
  text: string;
  recommendations?: {
    method: string;
    dwellSetting?: string;
    devices: string[];
    activities: string[];
    tips: string;
  };
};

type ProfileConfig = {
  movement: string;
  cognitive: string;
  environment: string;
};

export default function AccessibilityAssistantDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Olá! Sou o Assistente IA do Projeto DAVI. Posso te ajudar a configurar as melhores soluções assistivas, softwares e acionadores de baixo custo para o seu aluno ou familiar. Como posso ajudar hoje?",
    },
  ]);
  const [config, setConfig] = useState<ProfileConfig>({
    movement: "",
    cognitive: "",
    environment: "",
  });
  const [step, setStep] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getAIResponse = (newConfig: ProfileConfig) => {
    let method = "";
    let dwellSetting = "";
    const devices: string[] = [];
    const activities: string[] = [];
    let tips = "";

    // Recommend Access Method based on movements
    if (newConfig.movement === "eyes-only") {
      method = "Rastreamento Ocular por Câmera (Eye Tracking)";
      dwellSetting = "Dwell Time ideal: 1.2s a 1.5s (reduz fadiga, evita disparos acidentais).";
      devices.push("Suporte de Câmera/Tablet Estável", "Mouse de Cabeça (como redundância)");
      activities.push("Prancha de Comunicação Rápida por Olhar", "Atividade de Soletrar por Olhar");
      tips = "Garanta boa iluminação frontal na face do usuário. Evite luz forte vinda de trás (janelas). Mantenha a cabeça centralizada com o monitor.";
    } else if (newConfig.movement === "partial-arm") {
      method = "Acionador de Pressão Adaptado (Switch)";
      dwellSetting = "Varredura automática: 2.0s por linha/coluna.";
      devices.push("Botão Adaptado Maker (3D/MDF)", "Suporte Articulado para Braço");
      activities.push("Jogos de Causa e Efeito (um botão)", "Prancha de Varredura Alternada");
      tips = "Posicione o acionador em um ponto de movimento consistente (ex: ao lado da bochecha, cabeça ou punho) para aproveitar a melhor amplitude sem esforço excessivo.";
    } else if (newConfig.movement === "single-finger") {
      method = "Toque em Tela com Grade Física (Keyguard)";
      devices.push("Keyguard Personalizado para Teclado/Tablet", "Teclado Ampliado");
      activities.push("Escrever no Teclado Assistivo", "Atividades Educacionais de Arrastar/Clicar");
      tips = "O uso do Keyguard (grade acrílica com furos sobre as teclas) ajuda a guiar o dedo, impedindo que tremores ou toques involuntários ativem teclas erradas.";
    } else {
      method = "Entrada Multimodal (Joystick e Sensor de Sopro)";
      dwellSetting = "Varredura manual por sopro e direção por Joystick.";
      devices.push("Sensor de Sopro Maker", "Joystick Adaptado (Esfera Grande)");
      activities.push("Navegação Assistida", "Prancha de Comunicação Assistiva");
      tips = "A combinação de sopro (para confirmar cliques) e joystick (para direcionar a seleção) oferece velocidade excelente para usuários sem força de aperto.";
    }

    // Adjust activities based on cognitive profile
    if (newConfig.cognitive === "infant") {
      activities.unshift("Associação de Sons e Imagens", "Escolha de Emojis e Necessidades");
    } else {
      activities.push("Escrita com Teclado Virtual Acessível", "Relatórios de Sessão");
    }

    // Environment specific tips
    if (newConfig.environment === "school") {
      tips += " Nas salas de aula, use fones de ouvido para o retorno do sintetizador de voz para evitar distrações. Compartilhe o relatório dinâmico com o profissional de AEE.";
    } else if (newConfig.environment === "home") {
      tips += " Em casa, integre a prancha com necessidades básicas do dia a dia (alimentação, lazer, repouso) para estimular a comunicação diária.";
    }

    return {
      method,
      dwellSetting,
      devices,
      activities,
      tips,
    };
  };

  const handleSelectOption = (category: keyof ProfileConfig, optionValue: string, label: string) => {
    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: label }]);
    setIsTyping(true);

    const updatedConfig = { ...config, [category]: optionValue };
    setConfig(updatedConfig);

    setTimeout(() => {
      setIsTyping(false);

      if (step === 1) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "Certo. Agora me diga qual é o perfil cognitivo e de escolaridade do usuário principal para que eu formate o nível de complexidade das atividades:",
          },
        ]);
        setStep(2);
      } else if (step === 2) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "Entendido. E por fim, em qual ambiente a tecnologia assistiva será mais utilizada?",
          },
        ]);
        setStep(3);
      } else if (step === 3) {
        const recs = getAIResponse(updatedConfig);
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "Excelente! Com base nas informações fornecidas, montei uma recomendação personalizada de acessibilidade para o usuário. Veja os detalhes abaixo:",
            recommendations: recs,
          },
        ]);
        setStep(4); // Finished
      }
    }, 900);
  };

  const handleReset = () => {
    setConfig({ movement: "", cognitive: "", environment: "" });
    setStep(1);
    setMessages([
      {
        sender: "ai",
        text: "Olá! Sou o Assistente IA do Projeto DAVI. Posso te ajudar a configurar as melhores soluções assistivas, softwares e acionadores de baixo custo para o seu aluno ou familiar. Como posso ajudar hoje?",
      },
    ]);
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-xl flex flex-col h-[560px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-violet-500 animate-pulse" />
            Configurador Inteligente DAVI
          </h3>
          <p className="text-xs text-zinc-400">
            Responda às perguntas para gerar prescrições de hardware e software adaptados.
          </p>
        </div>
        {step > 1 && (
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-violet-400 hover:text-violet-300 font-bold border border-violet-800/60 rounded-lg px-2.5 py-1 hover:bg-violet-950/40 transition"
          >
            Reiniciar
          </button>
        )}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 mb-4 select-none scrollbar-thin scrollbar-thumb-zinc-800">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col max-w-[85%] ${
              msg.sender === "user" ? "self-end items-end" : "self-start items-start"
            }`}
          >
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
              {msg.sender === "user" ? "Você" : "Assistente DAVI"}
            </span>
            <div
              className={`rounded-2xl p-4 text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-violet-600 text-white rounded-tr-none shadow-md shadow-violet-900/10"
                  : "bg-zinc-950 text-zinc-100 rounded-tl-none border border-zinc-850"
              }`}
            >
              {msg.text}

              {/* Show recommendations inside the AI bubble if present */}
              {msg.recommendations && (
                <div className="mt-4 border-t border-zinc-850 pt-4 flex flex-col gap-3.5">
                  <div>
                    <span className="block text-[10px] font-extrabold uppercase text-violet-400 tracking-wider">Método de Acesso Recomendado</span>
                    <p className="text-sm font-black text-white mt-1">{msg.recommendations.method}</p>
                    {msg.recommendations.dwellSetting && (
                      <p className="text-xs text-zinc-400 mt-1 italic">{msg.recommendations.dwellSetting}</p>
                    )}
                  </div>

                  <div>
                    <span className="block text-[10px] font-extrabold uppercase text-violet-400 tracking-wider">Dispositivos Recomendados (Físicos)</span>
                    <ul className="list-disc pl-4 text-xs text-zinc-300 mt-1.5 space-y-1">
                      {msg.recommendations.devices.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="block text-[10px] font-extrabold uppercase text-violet-400 tracking-wider">Softwares e Atividades Sugeridas</span>
                    <ul className="list-disc pl-4 text-xs text-zinc-300 mt-1.5 space-y-1">
                      {msg.recommendations.activities.map((act, i) => (
                        <li key={i}>{act}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-violet-950/35 border border-violet-850/60 rounded-xl p-3 text-xs text-violet-200 mt-1 leading-normal">
                    <strong className="text-violet-300 block mb-1">💡 Dica de Implementação:</strong>
                    {msg.recommendations.tips}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="self-start flex flex-col items-start max-w-[80%]">
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Assistente DAVI</span>
            <div className="rounded-2xl p-4 bg-zinc-950 text-zinc-400 rounded-tl-none border border-zinc-850 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.3s]" />
              <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.15s]" />
              <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Options / Prompt Chips */}
      <div className="border-t border-zinc-800 pt-4 print:hidden">
        {step === 1 && !isTyping && (
          <div className="flex flex-col gap-2.5">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Selecione o nível de mobilidade do usuário:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleSelectOption("movement", "eyes-only", "Apenas movimento ocular e pálpebras")}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-left text-xs font-semibold text-zinc-300 hover:border-violet-500 hover:text-white transition"
              >
                👀 Apenas controle visual (movimento dos olhos)
              </button>
              <button
                type="button"
                onClick={() => handleSelectOption("movement", "partial-arm", "Movimento voluntário parcial de braço/cabeça")}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-left text-xs font-semibold text-zinc-300 hover:border-violet-500 hover:text-white transition"
              >
                💪 Movimento parcial de membros (consegue mover braço ou cabeça)
              </button>
              <button
                type="button"
                onClick={() => handleSelectOption("movement", "single-finger", "Controle de um único dedo")}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-left text-xs font-semibold text-zinc-300 hover:border-violet-500 hover:text-white transition"
              >
                ☝️ Movimento em um único dedo (consegue pressionar teclas próximas)
              </button>
              <button
                type="button"
                onClick={() => handleSelectOption("movement", "joystick-sip", "Nenhuma força manual, mas controla direção")}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-left text-xs font-semibold text-zinc-300 hover:border-violet-500 hover:text-white transition"
              >
                🌬️ Nenhuma força manual (utilizaria sopro ou movimentos faciais)
              </button>
            </div>
          </div>
        )}

        {step === 2 && !isTyping && (
          <div className="flex flex-col gap-2.5">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Selecione o perfil de escolaridade/idade:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleSelectOption("cognitive", "infant", "Perfil Infantil / Foco em Imagens")}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-center text-xs font-semibold text-zinc-300 hover:border-violet-500 hover:text-white transition"
              >
                🧸 Infantil / Não-alfabetizado (foco em imagens e sons)
              </button>
              <button
                type="button"
                onClick={() => handleSelectOption("cognitive", "school", "Perfil Escolar / Alfabetizado")}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-center text-xs font-semibold text-zinc-300 hover:border-violet-500 hover:text-white transition"
              >
                🎓 Escolar / Alfabetizado (foco em letras e escrita livre)
              </button>
            </div>
          </div>
        )}

        {step === 3 && !isTyping && (
          <div className="flex flex-col gap-2.5">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Selecione o ambiente principal de uso:</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSelectOption("environment", "school", "Escola (Sala de AEE)")}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-center text-xs font-semibold text-zinc-300 hover:border-violet-500 hover:text-white transition"
              >
                🏫 Escola / Sala de Recursos
              </button>
              <button
                type="button"
                onClick={() => handleSelectOption("environment", "home", "Casa / Quarto")}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-center text-xs font-semibold text-zinc-300 hover:border-violet-500 hover:text-white transition"
              >
                🏠 Residencial
              </button>
              <button
                type="button"
                onClick={() => handleSelectOption("environment", "clinic", "Clínica de Reabilitação")}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-center text-xs font-semibold text-zinc-300 hover:border-violet-500 hover:text-white transition"
              >
                🏥 Clínico / Hospitalar
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-2">
            <p className="text-xs text-zinc-400 mb-2.5">Prescrição de tecnologia assistiva gerada com sucesso!</p>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full bg-violet-600 hover:bg-violet-500 text-white font-extrabold px-6 py-2.5 text-xs shadow-lg shadow-violet-900/40 transition"
            >
              🔄 Configurar Outro Perfil
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
