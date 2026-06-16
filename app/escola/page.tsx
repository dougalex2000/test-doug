import type { Metadata } from "next";
import { SectionHub } from "../components/modules";

export const metadata: Metadata = {
  title: "DAVI Escola",
  description:
    "Português, Matemática, videoaulas, tarefas e acessibilidade para aprendizagem.",
};

export default function EscolaPage() {
  return (
    <SectionHub
      href="/escola"
      subtitle="Português, Matemática, videoaulas, tarefas e acessibilidade para aprendizagem."
      cardsTitle="Áreas do DAVI Escola"
      sections={[
        {
          eyebrow: "O núcleo pedagógico",
          title: "Aprender no próprio ritmo, com acesso garantido",
          paragraphs: [
            "O DAVI Escola é o módulo voltado à realização de atividades pedagógicas acessíveis. Ele permite que a pessoa acompanhe conteúdos, controle videoaulas, responda atividades, escreva em uma caixa de texto acessível, realize tarefas e tenha sua evolução acompanhada por métricas de aprendizagem e de acesso.",
            "O termo DAVI Aprender pode continuar como nome pedagógico interno, mas no menu principal usamos DAVI Escola, por ser mais claro para professores, famílias e instituições.",
          ],
        },
      ]}
    />
  );
}
