import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { LinkButton } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Comunidades Remotas — DAVI Comunidades",
  description: "Apoio a regiões de difícil acesso e sem serviço especializado.",
};

export default function RemotasPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Instituições e Comunidades", href: "/comunidades" }, { label: "Comunidades Remotas" }]}
      eyebrow="Comunidades Remotas"
      title="Inclusão onde o serviço não chega"
      subtitle="Para regiões rurais e de difícil acesso, sem atendimento especializado próximo."
      actions={<LinkButton href="/escola/casa">Conhecer o Modo Casa</LinkButton>}
      sections={[
        {
          eyebrow: "Como o DAVI apoia",
          title: "Baixo custo e uso simples",
          bullets: [
            "Plataforma acessível por celular ou tablet",
            "Modo Casa para famílias e cuidadores",
            "Atividades básicas de comunicação e alfabetização",
            "Dispositivos de baixo custo e projetos abertos",
            "Orientação para buscar serviços quando possível",
          ],
        },
      ]}
    />
  );
}
