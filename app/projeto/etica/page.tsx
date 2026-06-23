import type { Metadata } from "next";
import { ConstructionNotice, ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Ética, CEP e LGPD",
  description:
    "Antes de medir, testar ou coletar dados, o DAVI deve proteger a pessoa.",
};

export default function EticaPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "O Projeto", href: "/projeto" }, { label: "Ética, CEP e LGPD" }]}
      eyebrow="Ética, Comitê de Ética e Proteção de Dados"
      title="Antes de medir, testar ou coletar dados, proteger a pessoa"
      subtitle="Compromisso com ética, consentimento, LGPD e Comitê de Ética em Pesquisa."
      lead={
        <p className="max-w-4xl text-lg leading-8 text-zinc-700">
          Antes da aplicação de qualquer formulário, teste, entrevista,
          observação, coleta de métricas, uso de imagens, gravações, sinais
          biológicos ou interação direta com participantes, o Projeto DAVI deverá
          ser submetido à apreciação de um Comitê de Ética em Pesquisa, por meio
          da Plataforma Brasil, conforme as normas brasileiras aplicáveis às
          pesquisas envolvendo seres humanos.
        </p>
      }
      sections={[
        {
          eyebrow: "1. Comitê de Ética",
          title: "Por que o CEP é necessário",
          paragraphs: [
            "Pesquisas que envolvem seres humanos — incluindo observação, coleta de métricas, uso de imagens e sinais biológicos — exigem avaliação ética prévia. O CEP protege participantes, pesquisadores e a integridade do projeto.",
          ],
        },
        {
          eyebrow: "2 e 3. Participantes e consentimento",
          title: "Crianças, adolescentes, pessoas com deficiência",
          paragraphs: [
            "O cuidado é redobrado com crianças, adolescentes e pessoas com deficiência. Toda participação depende de consentimento livre e esclarecido dos responsáveis e de assentimento da própria pessoa, na medida de sua compreensão.",
          ],
          tone: "soft",
        },
        {
          eyebrow: "4 e 5. Dados sensíveis",
          title: "LGPD, imagens, câmera e sinais biológicos",
          paragraphs: [
            "Imagens, gravações, dados de câmera, rastreamento ocular e sinais biológicos são dados sensíveis sob a LGPD. Exigem finalidade clara, minimização, segurança, consentimento registrado e possibilidade de exclusão. Sempre que possível, o processamento é local.",
          ],
        },
        {
          eyebrow: "6, 7 e 8. Limites e dignidade",
          title: "A IA apoia; o DAVI não diagnostica",
          paragraphs: [
            "A inteligência artificial é apoio, não decisão automática. O DAVI não realiza diagnóstico clínico e não substitui profissionais. Proteção, privacidade e dignidade da pessoa vêm antes de qualquer métrica ou recurso.",
          ],
          tone: "soft",
        },
        {
          eyebrow: "9. Marco legal",
          title: "Acessibilidade e inclusão na lei brasileira",
          description:
            "O DAVI se orienta pelo arcabouço legal de direitos das pessoas com deficiência. As referências abaixo são educativas — consulte sempre as fontes oficiais e orientação especializada.",
          bullets: [
            "Lei nº 13.146/2015 — Lei Brasileira de Inclusão (LBI), o Estatuto da Pessoa com Deficiência: assegura direitos, acessibilidade, educação inclusiva e autonomia.",
            "Lei nº 10.098/2000 — Lei de Acessibilidade: normas gerais e critérios básicos para a acessibilidade de pessoas com deficiência ou mobilidade reduzida.",
            "Decreto nº 5.296/2004 — regulamenta a acessibilidade e o atendimento prioritário.",
            "Lei nº 8.213/1991, art. 93 — Lei de Cotas: reserva de vagas para pessoas com deficiência (ver DAVI Emprega).",
            "Convenção da ONU sobre os Direitos das Pessoas com Deficiência (Decreto nº 6.949/2009), com status constitucional no Brasil.",
            "Acessibilidade digital: as diretrizes WCAG (W3C) e o eMAG (Governo Eletrônico) orientam sites e sistemas acessíveis — princípios que guiam o próprio DAVI.",
          ],
        },
      ]}
      note={
        <ConstructionNotice title="Compromisso permanente" tone="blue">
          Nenhuma coleta de dados com participantes ocorre nesta fase do site. As
          páginas apresentam a visão do ecossistema; pesquisas com pessoas só
          acontecerão após aprovação ética e dentro das normas vigentes.
        </ConstructionNotice>
      }
    />
  );
}
