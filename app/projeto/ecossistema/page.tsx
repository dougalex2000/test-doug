import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import {
  IconChat,
  IconChip,
  IconClipboard,
  IconCube,
  IconDocument,
  IconEye,
  IconGamepad,
  IconHeartHand,
  IconIntegra,
  IconLightbulb,
  IconSparkles,
  IconTouch,
  IconUsers,
  IconVrGlasses,
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
            "Os jogos (DAVI Games), os ambientes imersivos (DAVI Imersivo), o celular como tecnologia assistiva (DAVI Assistivo App) e a inclusão profissional (DAVI Emprega) ampliam o ecossistema — sempre na mesma direção: da comunicação à vida independente, incluindo o caminho até o mundo do trabalho.",
          ],
        },
        {
          eyebrow: "Um módulo transversal",
          title: "DAVI Integra apoia todos os módulos",
          paragraphs: [
            "O DAVI Integra é um módulo transversal: ele não substitui nenhum outro módulo, mas conecta pesquisadores, estudantes, desenvolvedores, profissionais, instituições e comunidades aos diferentes grupos de trabalho do projeto.",
            "Enquanto o DAVI Conecta integra dispositivos físicos e os Projetos Abertos disponibilizam arquivos para reprodução, o DAVI Integra organiza as pessoas que pesquisam, desenvolvem, documentam, testam e ampliam essas soluções — em qualquer área do ecossistema.",
          ],
        },
      ]}
      cards={{
        eyebrow: "Os módulos",
        title: "Áreas do ecossistema",
        items: [
          { title: "DAVI Escola", description: "Aprendizagem acessível.", href: "/escola", icon: <IconDocument className="h-6 w-6" /> },
          { title: "DAVI Comunica", description: "Expressão e escolhas.", href: "/comunicacao", icon: <IconChat className="h-6 w-6" /> },
          { title: "DAVI Vision", description: "Rastreamento ocular.", href: "/acesso/vision", icon: <IconEye className="h-6 w-6" />, status: "Protótipo" },
          { title: "DAVI Conecta", description: "Dispositivos sem fio.", href: "/acesso/conecta", icon: <IconChip className="h-6 w-6" />, status: "Testes iniciais" },
          { title: "DAVI BioSinal", description: "Sinais biológicos.", href: "/acesso/biosinal", icon: <IconLightbulb className="h-6 w-6" />, status: "Experimental" },
          { title: "DAVI Assistente", description: "Guia com IA.", href: "/ia/assistente", icon: <IconSparkles className="h-6 w-6" />, status: "Demonstração" },
          { title: "DAVI Games", description: "Jogos e gamificação.", href: "/davi-games", icon: <IconGamepad className="h-6 w-6" />, status: "Protótipo" },
          { title: "DAVI Assistivo App", description: "Celular como acesso.", href: "/tecnologias-assistivas/davi-assistivo-app", icon: <IconTouch className="h-6 w-6" />, status: "Planejado" },
          { title: "DAVI Imersivo", description: "Realidade virtual e AR.", href: "/davi-imersivo", icon: <IconVrGlasses className="h-6 w-6" />, status: "Planejado" },
          { title: "DAVI Catálogo", description: "Recursos prontos.", href: "/tecnologias-assistivas/catalogo", icon: <IconCube className="h-6 w-6" /> },
          { title: "DAVI Maker", description: "Criar e adaptar.", href: "/tecnologias-assistivas/oficina-maker", icon: <IconWrench className="h-6 w-6" /> },
          { title: "DAVI Capacita", description: "Formação e treinamentos.", href: "/davi-capacita", icon: <IconUsers className="h-6 w-6" />, status: "Planejado" },
          { title: "DAVI Métricas", description: "Métricas e relatórios.", href: "/evolucao", icon: <IconClipboard className="h-6 w-6" /> },
          { title: "DAVI Emprega", description: "Inclusão profissional.", href: "/davi-emprega", icon: <IconHeartHand className="h-6 w-6" />, status: "Planejado" },
          { title: "DAVI Integra", description: "Comunidade, pesquisa e colaboração (transversal).", href: "/integra", icon: <IconIntegra className="h-6 w-6" />, status: "Em estruturação" },
        ],
      }}
    />
  );
}
