import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { SubirVideoForm } from "../../components/demos";

export const metadata: Metadata = {
  title: "Subir Vídeo para Atividades — DAVI Escola",
  description:
    "Área demonstrativa para envio de vídeos, instruções e lições acessíveis.",
};

export default function SubirVideoPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "DAVI Escola", href: "/escola" }, { label: "Subir Vídeo" }]}
      eyebrow="Subir Vídeo para Atividades"
      title="Área demonstrativa de envio de videoaulas"
      subtitle="Preparando a estrutura para que professores e colaboradores enviem vídeos e criem tarefas."
      status="Em construção"
      lead={<SubirVideoForm />}
      sections={[
        {
          eyebrow: "Próximos passos",
          title: "O que falta para o envio real",
          bullets: [
            "Autenticação de professores e colaboradores",
            "Armazenamento seguro de arquivos",
            "Permissões de acesso por perfil",
            "Regras de proteção de dados (LGPD)",
            "Vínculo do vídeo a tarefas e métricas",
          ],
        },
      ]}
    />
  );
}
