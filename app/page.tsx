import EyeTrackingDemo from "./components/EyeTrackingDemo";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-black dark:to-zinc-900">
      {/* HERO COM IMAGEM */}
      <section
        className="relative flex min-h-[80vh] items-center justify-center text-white"
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-4xl text-center px-6">
          <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
            Projeto DAVI
          </h1>

          <p className="mt-4 text-xl text-zinc-200">
            Dispositivo Assistivo de Visão e Interação
          </p>

          <p className="mt-6 text-lg text-zinc-300">
            Plataforma inteligente para conectar atividades digitais,
            comunicação alternativa e dispositivos de tecnologia assistiva em um
            ecossistema acessível, flexível e mensurável.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#sobre"
              className="rounded-full bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
            >
              Conhecer o Projeto
            </a>

            <a
              href="#modulos"
              className="rounded-full border border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-black"
            >
              Ver Módulos
            </a>

            <a
              href="#rastreamento"
              className="rounded-full border border-blue-300 px-6 py-3 font-semibold text-blue-100 transition hover:bg-blue-100 hover:text-blue-950"
            >
              Testar Câmera
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO SOBRE */}
      <section id="sobre" className="py-20 px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Tecnologia Assistiva de Alto Impacto
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              O Projeto DAVI conecta software, dispositivos assistivos e
              inteligência artificial para permitir que pessoas com limitações
              motoras severas possam interagir, aprender e se comunicar de forma
              acessível e eficiente.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              A plataforma foi pensada para trabalhar com diferentes interfaces
              de acesso, como botões adaptados, sensores de sopro, toque,
              pressão, movimento, presença, rastreamento ocular,
              microcontroladores e outros hardwares assistivos.
            </p>
          </div>

          <div
            className="h-[350px] rounded-2xl shadow-lg"
            style={{
              backgroundImage: "url('/robot.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section id="modulos" className="bg-white py-20 px-6 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Módulos do Sistema
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Comunicação com Dispositivos",
                description:
                  "Conexão com hardwares assistivos por USB, Bluetooth, Wi-Fi ou comunicação serial.",
              },
              {
                title: "Sensores e Acionadores",
                description:
                  "Suporte a botões adaptados, sensores de sopro, toque, pressão, movimento e presença.",
              },
              {
                title: "Rastreamento Ocular",
                description:
                  "Interação por olhar para seleção, navegação, resposta e comunicação alternativa.",
              },
              {
                title: "Perfis de Acessibilidade",
                description:
                  "Configurações individuais por usuário, tipo de acionamento, tempo de resposta e modo de interação.",
              },
              {
                title: "Atividades Assistivas",
                description:
                  "Atividades de alfabetização, matemática, linguagem e comunicação integradas aos dispositivos conectados.",
              },
              {
                title: "Relatórios Funcionais",
                description:
                  "Registro de uso, respostas, tempo de interação, evolução e indicadores para acompanhamento.",
              },
            ].map((module) => (
              <div
                key={module.title}
                className="group rounded-xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-blue-500 dark:hover:bg-zinc-900"
              >
                <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">
                  {module.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {module.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EyeTrackingDemo />

      {/* FOOTER / CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">
          Construindo o futuro da inclusão tecnológica
        </h2>

        <p className="mt-4 text-lg text-blue-100">
          Projeto em desenvolvimento no contexto de tecnologia assistiva,
          robótica e inteligência artificial.
        </p>

        <a
          href="#rastreamento"
          className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
        >
          Testar Rastreamento Ocular
        </a>
      </section>
    </div>
  );
}
