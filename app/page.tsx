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
            Plataforma inteligente para inclusão, aprendizagem e análise funcional
            com integração entre software, sensores e inteligência artificial.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button className="rounded-full bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 transition">
              Conhecer o Projeto
            </button>

            <button className="rounded-full border border-white px-6 py-3 font-semibold hover:bg-white hover:text-black transition">
              Ver Módulos
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO SOBRE */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2 items-center">
          
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Tecnologia Assistiva de Alto Impacto
            </h2>

            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              O Projeto DAVI integra visão computacional, sensores físicos e
              inteligência artificial para permitir que pessoas com limitações
              motoras severas possam interagir, aprender e se comunicar de forma
              acessível e eficiente.
            </p>

            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              A plataforma conecta dispositivos como ESP32, botões adaptados,
              sensores de sopro e rastreamento ocular, criando um ecossistema
              completo de inclusão digital e análise funcional.
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
      <section className="py-20 px-6 bg-white dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl">
          
          <h2 className="text-3xl font-bold text-center mb-12">
            Módulos do Sistema
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {[
              "Alfabetização Assistida",
              "Matemática",
              "Língua Portuguesa",
              "Rastreamento Ocular",
              "Integração com ESP32",
              "Relatórios Inteligentes",
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 shadow-md border bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 hover:scale-105 transition"
              >
                <h3 className="text-xl font-semibold">{item}</h3>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  Módulo integrado ao ecossistema DAVI com foco em acessibilidade
                  e interação inteligente.
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* FOOTER / CTA */}
      <section className="py-16 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <h2 className="text-3xl font-bold">
          Construindo o futuro da inclusão tecnológica
        </h2>

        <p className="mt-4 text-lg text-blue-100">
          Projeto em desenvolvimento no contexto de tecnologia assistiva,
          robótica e inteligência artificial.
        </p>

        <button className="mt-8 rounded-full bg-white px-6 py-3 font-semibold text-black hover:bg-zinc-200 transition">
          Acessar Plataforma
        </button>
      </section>

    </div>
  );
}