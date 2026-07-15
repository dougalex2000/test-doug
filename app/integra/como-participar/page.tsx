import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { LinkButton } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Como participar — DAVI Integra",
  description:
    "Caminhos para colaborar com o Projeto DAVI: individual, acadêmico, técnico, institucional e pela comunidade.",
};

export default function ComoParticiparPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "DAVI Integra", href: "/integra" }, { label: "Como participar" }]}
      eyebrow="DAVI Integra"
      title="Como participar"
      subtitle="Há mais de um caminho para colaborar. Escolha o que combina com o seu momento, sua experiência e sua disponibilidade."
      actions={
        <>
          <LinkButton href="/integra/participar">Manifestar interesse</LinkButton>
          <LinkButton href="/integra/desafios" variant="secondary">
            Ver desafios abertos
          </LinkButton>
        </>
      }
      sections={[
        {
          eyebrow: "Caminho 1",
          title: "Participação individual",
          paragraphs: [
            "Para estudantes, pesquisadores, profissionais e colaboradores independentes que queiram contribuir por conta própria, de forma voluntária ou pontual.",
          ],
        },
        {
          eyebrow: "Caminho 2",
          title: "Participação acadêmica",
          paragraphs: [
            "Para iniciação científica, trabalhos de conclusão, dissertações, teses, projetos de extensão, disciplinas e laboratórios. Uma boa porta de entrada para pesquisa aplicada em tecnologia assistiva.",
          ],
          tone: "soft",
        },
        {
          eyebrow: "Caminho 3",
          title: "Participação técnica",
          paragraphs: [
            "Para programação, eletrônica, inteligência artificial, sensores, robótica, fabricação digital, design e documentação. Contribuições que evoluem diretamente as tecnologias do ecossistema.",
          ],
        },
        {
          eyebrow: "Caminho 4",
          title: "Participação institucional",
          paragraphs: [
            "Para universidades, institutos de pesquisa, escolas, prefeituras, empresas, ONGs e centros de reabilitação que queiram colaborar formalmente com o projeto.",
          ],
          tone: "soft",
        },
        {
          eyebrow: "Caminho 5",
          title: "Contribuição da comunidade",
          paragraphs: [
            "Para sugestões, relatos de necessidades, avaliação de acessibilidade e proposição de novos desafios. Pessoas com deficiência, familiares e cuidadores são especialmente bem-vindos como colaboradores.",
          ],
        },
        {
          eyebrow: "Importante",
          title: "Pesquisa com participantes segue a ética",
          paragraphs: [
            "Qualquer pesquisa, teste ou coleta envolvendo participantes dependerá dos procedimentos éticos e legais aplicáveis — consentimento, LGPD e, quando necessário, aprovação de Comitê de Ética em Pesquisa.",
          ],
          tone: "soft",
        },
      ]}
      cards={{
        eyebrow: "Próximos passos",
        title: "Escolha por onde começar",
        items: [
          { title: "Áreas de contribuição", description: "Veja as formas de contribuir por área.", href: "/integra#areas" },
          { title: "Desafios abertos", description: "Necessidades reais como oportunidades.", href: "/integra/desafios", status: "Em estruturação" },
          { title: "Grupos de trabalho", description: "Encontre o grupo da sua área.", href: "/integra/grupos-de-trabalho" },
          { title: "Manifestar interesse", description: "Preencha o formulário de interesse.", href: "/integra/participar" },
          { title: "Propor uma contribuição", description: "Sugira uma ideia ou desafio.", href: "/integra/propor" },
          { title: "Parcerias institucionais", description: "Colabore como instituição.", href: "/integra/parcerias" },
        ],
      }}
    />
  );
}
