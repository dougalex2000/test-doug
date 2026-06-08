import {
  InfoGrid,
  LinkButton,
  PageHero,
  PageShell,
  SectionHeader,
} from "../components/SiteShell";

export default function ProjetoPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Origem do Projeto DAVI"
        title="Uma experiência real que virou plataforma"
        description="O projeto nasceu a partir do acompanhamento de um aluno chamado Davi, de 9 anos, com limitações motoras e dificuldade para ler e escrever por não conseguir usar lápis e papel de forma convencional."
        actions={<LinkButton href="/rastreamento">Testar rastreamento visual</LinkButton>}
      />

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="História"
              title="Da observação pedagógica à tecnologia assistiva"
            />
            <div className="mt-6 space-y-4 text-lg leading-8 text-zinc-700">
              <p>
                Ao perceber que Davi conseguia pressionar algumas teclas do
                computador, foi criada uma ferramenta educacional adaptada para
                alfabetização, respeitando sua forma possível de acesso.
              </p>
              <p>
                Em aproximadamente 40 dias, houve avanço importante na autonomia,
                no uso das teclas e na participação social. A professora
                Alessandra del Castillo teve papel essencial no acompanhamento
                pedagógico e na observação da evolução.
              </p>
            </div>
          </div>
          <div
            className="min-h-[360px] rounded-2xl border border-zinc-200 bg-zinc-100 shadow-lg"
            style={{
              backgroundImage: "url('/robot.jpg')",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </div>
      </section>

      <section className="bg-blue-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="O que é o DAVI"
            title="Uma plataforma integrada, não apenas um site"
            description="O DAVI integra avaliação, personalização, acompanhamento e criação de soluções assistivas, aproximando software, hardware, educação, comunicação alternativa e fabricação personalizada."
          />
          <div className="mt-10">
            <InfoGrid
              items={[
                {
                  title: "Avaliar",
                  description:
                    "Observar formas de acesso, barreiras funcionais, respostas e evolução.",
                },
                {
                  title: "Personalizar",
                  description:
                    "Ajustar atividades, tempo de resposta, interfaces e dispositivos conforme o usuário.",
                },
                {
                  title: "Acompanhar",
                  description:
                    "Organizar dados funcionais e educacionais para apoiar famílias e profissionais.",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
