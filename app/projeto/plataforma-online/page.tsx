import type { Metadata } from "next";
import { ConstructionNotice, ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Plataforma Online DAVI",
  description: "Um ecossistema acessível pela internet, em construção.",
};

export default function PlataformaOnlinePage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "O Projeto", href: "/projeto" }, { label: "Plataforma Online" }]}
      eyebrow="Plataforma Online DAVI"
      title="Um ecossistema acessível pela internet, em construção"
      subtitle="Disponível por notebook, computador, tablet ou celular — em escolas, famílias, instituições e comunidades."
      status="Em construção"
      sections={[
        {
          eyebrow: "Plataforma online",
          title: "Acesso amplo, em diferentes contextos",
          paragraphs: [
            "O DAVI está sendo estruturado como uma plataforma digital disponível pela internet, acessível por notebook, computador, tablet ou telefone celular. Essa disponibilização permite que o ecossistema seja utilizado em escolas, famílias, instituições, comunidades e regiões de difícil acesso.",
          ],
        },
      ]}
      note={
        <ConstructionNotice title="Versão inicial, transparente">
          A plataforma está online em versão inicial e em construção. Algumas
          funcionalidades são demonstrativas; outras estão em prototipagem ou
          testes iniciais. Isso permite apresentar o projeto a parceiros,
          pesquisadores, escolas, prefeituras e comunidades enquanto evolui.
        </ConstructionNotice>
      }
    />
  );
}
