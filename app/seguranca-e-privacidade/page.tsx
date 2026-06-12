import type { Metadata } from "next";
import {
  Breadcrumb,
  InfoGrid,
  LinkButton,
  PageHero,
  PageShell,
  SectionHeader,
} from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Segurança e Privacidade",
  description:
    "Ética, privacidade, consentimento e proteção de dados no ecossistema DAVI: sem diagnóstico automatizado, sem fotos da face por padrão, processamento local da câmera.",
};

const commitments = [
  {
    title: "Sem diagnóstico clínico automatizado",
    description:
      "O DAVI não diagnostica. Os dados e as análises existem para apoiar profissionais qualificados, que tomam as decisões.",
  },
  {
    title: "Imagens processadas localmente",
    description:
      "As imagens da câmera são processadas no próprio dispositivo do usuário sempre que possível. O rastreamento visual atual roda 100% no navegador.",
  },
  {
    title: "Nenhuma foto da face por padrão",
    description:
      "A calibração visual gera apenas dados numéricos (características dos olhos, íris e posição da cabeça). Fotos da face não são salvas por padrão.",
  },
  {
    title: "Consentimento informado",
    description:
      "Dados sensíveis só são registrados com consentimento explícito do usuário ou responsável, com registro auditável.",
  },
  {
    title: "Direito de apagar",
    description:
      "Usuários e responsáveis poderão apagar os dados de calibração e demais dados pessoais a qualquer momento.",
  },
  {
    title: "Acesso restrito a relatórios",
    description:
      "Relatórios e avaliações só podem ser acessados por pessoas autorizadas, conforme o perfil e o vínculo institucional.",
  },
];

const technicalMeasures = [
  {
    title: "Autenticação e autorização por perfil",
    description:
      "Login seguro e permissões diferentes para aluno, professor, terapeuta, família, pesquisador, administrador, oficina e instituição.",
  },
  {
    title: "Separação de dados públicos e sensíveis",
    description:
      "Conteúdo institucional é público; dados de pessoas ficam em camadas protegidas com políticas de acesso por instituição.",
  },
  {
    title: "APIs protegidas no servidor",
    description:
      "Operações com dados sensíveis acontecem apenas em código server-side, sem expor chaves de API no navegador.",
  },
  {
    title: "Variáveis de ambiente",
    description:
      "Credenciais e segredos ficam fora do código-fonte, em variáveis de ambiente protegidas.",
  },
  {
    title: "Logs de auditoria",
    description:
      "Acessos e alterações em dados sensíveis serão registrados para rastreabilidade e segurança.",
  },
  {
    title: "Validação de entrada",
    description:
      "Todo dado recebido pela plataforma é validado antes de ser processado ou armazenado.",
  },
];

export default function SegurancaEPrivacidadePage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "Segurança e Privacidade" }]} />
      <PageHero
        eyebrow="Segurança e Privacidade"
        title="Tecnologia assistiva exige confiança"
        description="O DAVI trabalha com dados de pessoas em situação de vulnerabilidade. Por isso, ética, consentimento e proteção de dados não são detalhes técnicos: são princípios de projeto."
        actions={<LinkButton href="/contato">Dúvidas sobre privacidade</LinkButton>}
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Compromissos"
            title="O que garantimos a usuários e famílias"
          />
          <div className="mt-10">
            <InfoGrid items={commitments} />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Medidas técnicas"
            title="Como a proteção é implementada"
            description="Estas medidas acompanham a implantação do banco de dados e da autenticação, e evoluem junto com a plataforma."
          />
          <div className="mt-10">
            <InfoGrid items={technicalMeasures} />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-2xl border border-zinc-200 bg-zinc-50 p-8">
          <p className="text-sm font-black uppercase tracking-wide text-zinc-700">
            Resumo em linguagem simples
          </p>
          <ul className="mt-4 grid gap-3 text-base leading-7 text-zinc-800 md:grid-cols-2">
            <li>• O DAVI não faz diagnóstico: quem decide é o profissional.</li>
            <li>• A câmera é processada no seu dispositivo sempre que possível.</li>
            <li>• Não guardamos fotos do rosto por padrão.</li>
            <li>• Nada de sensível é registrado sem o seu consentimento.</li>
            <li>• Você pode pedir para apagar seus dados de calibração.</li>
            <li>• Só pessoas autorizadas veem relatórios e avaliações.</li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
