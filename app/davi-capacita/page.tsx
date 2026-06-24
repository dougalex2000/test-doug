import type { Metadata } from "next";
import Image from "next/image";
import { ConceptPage, ConstructionNotice } from "../components/modules";

export const metadata: Metadata = {
  title: "DAVI Capacita — Formação e Treinamentos",
  description:
    "Formação, treinamento e inovação assistiva: plataforma, ambiente maker, catálogo, produto aberto, propriedade intelectual e geração de renda.",
};

export default function DaviCapacitaPage() {
  return (
    <ConceptPage
      breadcrumb={[
        { label: "Tecnologias Assistivas", href: "/tecnologias-assistivas" },
        { label: "DAVI Capacita" },
      ]}
      eyebrow="DAVI Capacita"
      title="Formação, treinamento e inovação assistiva"
      subtitle="Formação, treinamento e inovação assistiva para ampliar autonomia, inclusão e geração de oportunidades."
      status="Planejado"
      group="Grupo DAVI Capacita — Formação e Treinamentos"
      lead={
        <div className="max-w-4xl space-y-4 text-lg leading-8 text-zinc-700">
          <p>
            O <strong>DAVI Capacita</strong> é o módulo de formação do Projeto
            DAVI. Ele reúne treinamentos voltados ao uso da plataforma, à
            aplicação de recursos de tecnologia assistiva, à criação de soluções
            em ambiente maker, à documentação de produtos, ao cadastro no
            catálogo, à inovação aberta, à propriedade intelectual e à
            transformação de ideias em produtos, serviços ou tecnologias sociais.
          </p>
          <p>
            As formações poderão ser realizadas de forma presencial, remota ou
            híbrida, com possibilidade de atividades práticas no{" "}
            <strong>CTI Renato Archer</strong>, especialmente em temas
            relacionados à tecnologia assistiva, prototipagem, fabricação
            digital, eletrônica, programação, CAD, impressão 3D, corte a laser e
            desenvolvimento de produtos assistivos.
          </p>
          <p>
            O objetivo é formar pessoas capazes de usar, adaptar, criar,
            documentar e compartilhar soluções que apoiem a comunicação, a
            aprendizagem, a autonomia, a participação social e, futuramente, a
            inclusão produtiva de pessoas com deficiência.
          </p>
          <figure className="mt-2 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
            <Image
              src="/images/davi/DAVI-Capacita.png"
              alt="Ambiente de formação do DAVI Capacita com sala de aula, oficina maker, treinamento em eletrônica, fabricação digital e tecnologia assistiva"
              width={1672}
              height={941}
              sizes="(max-width: 1024px) 100vw, 896px"
              className="h-auto w-full"
            />
            <figcaption className="px-5 py-4 text-sm leading-6 text-zinc-600">
              O DAVI Capacita integra formação, ambiente maker, tecnologia
              assistiva, eletrônica, programação, fabricação digital e apoio ao
              uso da plataforma, preparando profissionais, familiares,
              estudantes e instituições para criar, adaptar e aplicar soluções
              acessíveis.
            </figcaption>
          </figure>
        </div>
      }
      sections={[
        {
          eyebrow: "A. Plataforma DAVI",
          title: "Formação para uso da Plataforma DAVI",
          description:
            "Treinamentos para professores, profissionais, familiares, cuidadores e instituições que desejam usar a plataforma em comunicação, alfabetização, aprendizagem, exercícios acessíveis, videoaulas, métricas e acompanhamento da evolução do aluno.",
          bullets: [
            "Introdução ao Projeto DAVI",
            "Uso da Plataforma DAVI na Educação",
            "Recursos de Acessibilidade da Plataforma",
            "DAVI para Professores",
            "DAVI para Familiares e Cuidadores",
            "Acompanhamento de atividades, métricas e relatórios",
            "Boas práticas para apoiar o aluno sem retirar sua autonomia",
          ],
        },
        {
          eyebrow: "B. Comunicação e acesso",
          title: "Comunicação, Acessibilidade e Métodos de Acesso",
          description:
            "Cursos sobre comunicação alternativa, botões adaptados, varredura, controle por teclado, sensores, dispositivos externos e o celular como recurso assistivo.",
          tone: "soft",
          bullets: [
            "Comunicação Alternativa e Aumentativa no DAVI",
            "Uso de pranchas, pictogramas, frases e voz",
            "Botões adaptados e controle por varredura",
            "Uso do celular como tecnologia assistiva multifuncional",
            "Acesso por movimento, gestos, cabeça, toque e sensores",
            "Estratégias simples para ampliar a participação do usuário",
          ],
        },
        {
          eyebrow: "C. Catálogo",
          title: "Catálogo de Tecnologias Assistivas",
          description:
            "Como cadastrar, organizar, documentar e divulgar soluções de tecnologia assistiva no catálogo do Projeto DAVI.",
          bullets: [
            "Como inserir produtos no Catálogo DAVI",
            "Como descrever uma tecnologia assistiva",
            "Como cadastrar imagens, vídeos e manuais",
            "Como informar materiais, custo estimado e público-alvo",
            "Como organizar documentação técnica",
            "Diferenciar produto aberto, comercial e protótipo em desenvolvimento",
            "Como preparar uma ficha de produto assistivo",
          ],
        },
        {
          eyebrow: "D. Inovação aberta",
          title: "Produto Aberto, Documentação e Propriedade Intelectual",
          description:
            "Orientação sobre documentação, autoria, produto e código aberto, inovação aberta, registro de software, desenho industrial, marca, patente e compartilhamento responsável. Conteúdo introdutório, que não substitui orientação jurídica ou especializada.",
          tone: "soft",
          bullets: [
            "Documentação técnica de produtos assistivos",
            "Produto aberto e código aberto",
            "Tecnologia social e inovação aberta",
            "Introdução à propriedade intelectual",
            "Diferença entre ideia, protótipo, produto e invenção",
            "Quando pensar em patente e quando deixar uma solução aberta",
            "Cuidados antes de divulgar uma invenção",
            "Organização de registros, versões, fotos, testes e arquivos técnicos",
          ],
        },
        {
          eyebrow: "E. Ambiente maker",
          title: "Formação Maker e SubFab Lab Assistivo",
          description:
            "Da ideia ao desenho, do desenho ao protótipo, dos testes à documentação e ao catálogo: o processo completo de criação assistiva em ambiente maker.",
          bullets: [
            "Introdução ao ambiente maker assistivo",
            "Segurança no uso de ferramentas e máquinas",
            "Ferramentas manuais para prototipagem",
            "Impressão 3D para tecnologia assistiva",
            "Corte a laser e fabricação digital 2D",
            "Desenho técnico, CAD e modelagem 3D",
            "Criação de arquivos para impressão 3D e corte a laser",
            "Organização de projetos digitais",
            "Montagem, acabamento e testes de protótipos",
          ],
        },
        {
          eyebrow: "F. Eletrônica e programação",
          title: "Eletrônica, Programação e Dispositivos Assistivos",
          description:
            "Criação de dispositivos assistivos com eletrônica, sensores, microcontroladores, programação, comunicação sem fio e integração com a plataforma DAVI.",
          tone: "soft",
          bullets: [
            "Eletrônica básica para tecnologia assistiva",
            "Botões, chaves e acionadores",
            "Sensores de movimento, toque, distância e inclinação",
            "Introdução a microcontroladores e módulos eletrônicos assistivos",
            "Programação básica para dispositivos assistivos",
            "Comunicação Bluetooth, Wi-Fi e integração com plataformas digitais",
            "Criação de interfaces adaptadas",
            "Testes, calibração e segurança de uso",
          ],
        },
        {
          eyebrow: "G. Produto e renda",
          title: "Desenvolvimento de Produto, Empreendedorismo e Geração de Renda",
          description:
            "Apoio a pessoas, grupos, instituições e pequenos desenvolvedores que desejam transformar soluções assistivas em produtos, serviços, tecnologias sociais ou oportunidades de renda.",
          bullets: [
            "Da ideia ao produto assistivo",
            "Como validar uma necessidade real",
            "Como testar uma solução com segurança",
            "Como calcular custos",
            "Como preparar manual, embalagem e apresentação",
            "Como apresentar uma solução assistiva",
            "Tecnologia assistiva, mercado e impacto social",
            "Caminhos para venda, doação, licenciamento ou fabricação local",
            "Geração de renda com produtos assistivos",
            "Inclusão produtiva e redes de colaboração",
          ],
        },
        {
          eyebrow: "H. Multiplicadores",
          title: "Formação de Multiplicadores",
          description:
            "Formação para quem vai replicar o conhecimento em escolas, instituições, comunidades, projetos sociais e redes de apoio.",
          tone: "soft",
          bullets: [
            "Formação de multiplicadores DAVI",
            "Como organizar oficinas",
            "Como ensinar o uso da plataforma",
            "Como orientar familiares e profissionais",
            "Como adaptar a linguagem para diferentes públicos",
            "Como registrar dúvidas e necessidades",
            "Como apoiar comunidades e instituições no uso da tecnologia assistiva",
          ],
        },
      ]}
      note={
        <ConstructionNotice title="Em estruturação" tone="blue">
          O DAVI Capacita está em fase de estruturação. As trilhas e cursos
          listados são uma proposta de formação e poderão ser ajustados conforme
          parcerias, turmas e demandas. O conteúdo sobre propriedade intelectual
          é introdutório e não substitui orientação jurídica ou especializada.
        </ConstructionNotice>
      }
    />
  );
}
