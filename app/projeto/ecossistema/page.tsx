import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import {
  IconChat,
  IconChip,
  IconClipboard,
  IconCube,
  IconDocument,
  IconEye,
  IconLightbulb,
  IconSparkles,
  IconWrench,
} from "../../components/icons";

export const metadata: Metadata = {
  title: "Ecossistema DAVI",
  description: "Como os módulos do DAVI se conectam.",
};

export default function EcossistemaPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "O Projeto", href: "/projeto" }, { label: "Ecossistema DAVI" }]}
      eyebrow="Ecossistema DAVI"
      title="Módulos independentes, jornada integrada"
      subtitle="Cada área evolui sozinha, mas todas servem à mesma jornada: da comunicação à vida independente."
      sections={[
        {
          eyebrow: "Como se conecta",
          title: "Acesso, conteúdo, IA e evolução",
          paragraphs: [
            "Os métodos de acesso (DAVI Vision, Conecta e BioSinal) definem como a pessoa interage. O conteúdo (DAVI Escola e Comunicação) define o que ela faz. A inteligência artificial apoia em todas as pontas. E o DAVI Evolução acompanha o progresso, sempre dentro de limites éticos.",
          ],
        },
      ]}
      cards={{
        eyebrow: "Os módulos",
        title: "Áreas do ecossistema",
        items: [
          { title: "DAVI Escola", description: "Aprendizagem acessível.", href: "/escola", icon: <IconDocument className="h-6 w-6" /> },
          { title: "Comunicação", description: "Expressão e escolhas.", href: "/comunicacao", icon: <IconChat className="h-6 w-6" /> },
          { title: "DAVI Vision", description: "Rastreamento ocular.", href: "/acesso/vision", icon: <IconEye className="h-6 w-6" />, status: "Protótipo" },
          { title: "DAVI Conecta", description: "Dispositivos sem fio.", href: "/acesso/conecta", icon: <IconChip className="h-6 w-6" />, status: "Testes iniciais" },
          { title: "DAVI BioSinal", description: "Sinais biológicos.", href: "/acesso/biosinal", icon: <IconLightbulb className="h-6 w-6" />, status: "Experimental" },
          { title: "Assistente DAVI", description: "Guia com IA.", href: "/ia/assistente", icon: <IconSparkles className="h-6 w-6" />, status: "Demonstração" },
          { title: "Catálogo", description: "Recursos prontos.", href: "/tecnologias-assistivas/catalogo", icon: <IconCube className="h-6 w-6" /> },
          { title: "Oficina Maker", description: "Criar e adaptar.", href: "/tecnologias-assistivas/oficina-maker", icon: <IconWrench className="h-6 w-6" /> },
          { title: "Evolução", description: "Métricas e relatórios.", href: "/evolucao", icon: <IconClipboard className="h-6 w-6" /> },
        ],
      }}
    />
  );
}
