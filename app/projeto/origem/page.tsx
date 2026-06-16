import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { LinkButton } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Origem do DAVI",
  description: "A história real do aluno Davi, que deu origem ao projeto.",
};

export default function OrigemPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "O Projeto", href: "/projeto" }, { label: "Origem do DAVI" }]}
      eyebrow="Origem do DAVI"
      title="Uma história real que virou ecossistema"
      subtitle="O projeto nasceu do acompanhamento de um aluno chamado Davi, de 9 anos, em Valinhos-SP."
      actions={<LinkButton href="/escola/videoaulas">Ver a demonstração de videoaula</LinkButton>}
      sections={[
        {
          eyebrow: "A história",
          title: "Da observação pedagógica à tecnologia assistiva",
          paragraphs: [
            "Davi, aluno do 4º ano do Ensino Fundamental, ainda não lia nem escrevia por causa de limitações motoras severas que impediam o uso de lápis e papel.",
            "Ao perceber que ele conseguia pressionar algumas teclas do computador, foi criado um protótipo educacional adaptado: comandos simples para controlar videoaulas — pausar, avançar, voltar, repetir conteúdos — e uma caixa de texto acessível para escrever.",
            "Em poucas semanas, houve avanço importante em autonomia, uso das teclas e participação social. A experiência mostrou que a limitação, muitas vezes, não está na capacidade de aprender, mas na falta de ferramentas adequadas de acesso.",
          ],
        },
        {
          eyebrow: "Do protótipo ao ecossistema",
          title: "O que aprendemos com o Davi",
          paragraphs: [
            "O protótipo do Davi revelou um caminho: controlar o próprio aprendizado, no próprio ritmo, por um método de acesso possível. Esse princípio guia hoje todo o ecossistema — das videoaulas acessíveis ao rastreamento ocular, da comunicação alternativa aos dispositivos sem fio.",
          ],
          tone: "soft",
        },
      ]}
    />
  );
}
