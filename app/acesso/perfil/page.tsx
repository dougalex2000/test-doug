import type { Metadata } from "next";
import { ConstructionNotice, ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Perfil de Acesso DAVI",
  description: "Registro funcional dos melhores caminhos de interação — não é diagnóstico.",
};

const fields = [
  "Método de acesso principal",
  "Método alternativo",
  "Tempo médio de resposta",
  "Necessidade de áudio",
  "Necessidade de alto contraste",
  "Usa botão",
  "Usa toque",
  "Usa olhar",
  "Usa teclado",
  "Usa cuidador como mediador",
  "Observações",
];

export default function PerfilAcessoPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Acesso e Dispositivos", href: "/acesso" }, { label: "Perfil de Acesso" }]}
      eyebrow="Perfil de Acesso DAVI"
      title="Registro funcional dos melhores caminhos de interação"
      subtitle="O perfil de acesso registra preferências, barreiras e métodos que funcionam melhor — não é diagnóstico."
      sections={[
        {
          eyebrow: "O que registra",
          title: "Campos do perfil de acesso",
          bullets: fields,
        },
      ]}
      note={
        <ConstructionNotice title="Não é diagnóstico" tone="blue">
          O perfil de acesso descreve como a pessoa interage melhor com a
          plataforma. Não classifica, não rotula e não substitui avaliação
          profissional.
        </ConstructionNotice>
      }
    />
  );
}
