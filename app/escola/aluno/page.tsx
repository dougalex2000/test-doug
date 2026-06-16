import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { LinkButton } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Modo Aluno — DAVI Escola",
  description: "Interface simples, acessível e focada na participação.",
};

export default function ModoAlunoPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "DAVI Escola", href: "/escola" }, { label: "Modo Aluno" }]}
      eyebrow="Modo Aluno"
      title="Interface simples, focada na participação"
      subtitle="Tudo o que o aluno precisa, com botões grandes, áudio e acesso por vários métodos."
      actions={<LinkButton href="/escola/videoaulas">Abrir uma videoaula</LinkButton>}
      sections={[
        {
          eyebrow: "Como é o Modo Aluno",
          title: "Pensado para o uso direto",
          bullets: [
            "Uso simples e botões grandes",
            "Controle de videoaulas",
            "Atividades acessíveis",
            "Comunicação e escrita assistida",
            "Apoio por áudio",
            "Acesso por toque, teclado, botão, olhar ou dispositivo",
          ],
        },
      ]}
    />
  );
}
