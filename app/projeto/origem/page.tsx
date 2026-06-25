import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { LinkButton } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "A História do Projeto DAVI",
  description:
    "Da iniciativa de uma professora ao Desenvolvimento Assistivo para Vida Independente — a história real do aluno Davi.",
};

export default function OrigemPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "O Projeto", href: "/projeto" }, { label: "A História do Projeto DAVI" }]}
      eyebrow="A História do Projeto DAVI"
      title="A História do Projeto DAVI"
      subtitle="Da iniciativa de uma professora ao Desenvolvimento Assistivo para Vida Independente."
      actions={
        <>
          <LinkButton href="/projeto/ecossistema">Conhecer o ecossistema DAVI</LinkButton>
          <LinkButton href="/escola/videoaulas" variant="secondary">
            Ver a demonstração de videoaula
          </LinkButton>
        </>
      }
      lead={
        <p className="max-w-4xl text-xl font-bold leading-9 text-zinc-900">
          O Projeto DAVI nasceu a partir de uma experiência real de inclusão
          educacional com um aluno chamado Davi, que na época tinha 9 anos e
          estudava no 4º ano do Ensino Fundamental em uma escola de Valinhos, São
          Paulo.
        </p>
      }
      sections={[
        {
          eyebrow: "A iniciativa de uma professora",
          title: "Tudo começou com o olhar atento de uma educadora",
          paragraphs: [
            "Essa história só foi possível pela iniciativa da professora Alessandra del Castillo, que percebeu as dificuldades enfrentadas por Davi no processo de alfabetização e buscou apoio de um pesquisador para encontrar uma solução tecnológica que pudesse ajudá-lo a participar das atividades escolares.",
            "Antes de qualquer software, dispositivo ou recurso computacional, o Projeto DAVI nasceu do olhar atento de uma professora que reconheceu no aluno uma capacidade de aprender que ainda não conseguia se expressar pelos meios tradicionais.",
            "Apesar de estar no 4º ano, Davi ainda não sabia ler nem escrever. Durante a aproximação com o caso, ficou claro que sua maior dificuldade não estava relacionada à capacidade intelectual, mas às suas limitações motoras severas, que dificultavam o uso convencional de lápis, papel e outros recursos escolares.",
          ],
        },
        {
          eyebrow: "Conhecendo o Davi",
          title: "Poucas teclas, uma grande possibilidade",
          tone: "soft",
          paragraphs: [
            "Ao conhecer Davi, foi possível perceber um menino atento, curioso e inteligente. O desafio principal era encontrar uma forma de acesso que permitisse sua participação nas atividades pedagógicas. Em um teste simples, foi solicitado que ele pressionasse algumas teclas do computador, como F1, F2, F3 e F4. Mesmo com esforço, ele conseguiu realizar os comandos.",
            "Essa observação revelou uma possibilidade importante: Davi poderia interagir com o computador utilizando poucas teclas. A partir disso, foi desenvolvida uma ferramenta computacional de alfabetização assistida, permitindo que ele controlasse vídeos educativos, pausasse, repetisse conteúdos e realizasse exercícios de leitura, escrita de palavras e formação de frases.",
          ],
        },
        {
          eyebrow: "A ferramenta de alfabetização assistida",
          title: "Simples, acessível e motivadora",
          paragraphs: [
            "O sistema foi pensado para ser simples, acessível e motivador. As teclas de função permitiam controlar as atividades de forma adaptada. Em determinados momentos, o conteúdo era pausado para que Davi pudesse responder aos exercícios. Após escrever uma palavra ou frase, ele podia escutar, por meio de fones de ouvido, a leitura do que havia produzido, reforçando a associação entre escrita, leitura e som.",
            "Quando acertava uma atividade, o sistema reproduzia um som de aplausos, funcionando como retorno positivo e incentivo. Esse momento era especialmente importante, pois ajudava a reforçar a confiança, a motivação e a percepção de que ele era capaz de aprender e participar.",
            "Além das atividades pedagógicas, o software também registrava automaticamente informações como tempo de realização, erros, acertos, teclas utilizadas e progresso nas lições. Esses registros mostraram a importância de acompanhar a evolução do aluno com dados objetivos, apoiando professores e profissionais na adaptação das estratégias de ensino.",
          ],
        },
        {
          eyebrow: "Aprender junto e ter apoio",
          title: "A tecnologia integrada ao cotidiano da sala de aula",
          tone: "soft",
          paragraphs: [
            "Com o uso da ferramenta, Davi pôde estudar no mesmo ambiente que os demais colegas, participando da rotina escolar de forma mais autônoma. A professora Alessandra acompanhou todo o processo, oferecendo apoio pedagógico, incentivo, correções e estímulo, integrando a tecnologia ao cotidiano da sala de aula de maneira cuidadosa e humana.",
            "Davi também contava com o apoio de uma auxiliar de classe, que ajudava no posicionamento do computador durante as atividades. O notebook inicialmente utilizado no projeto havia sido cedido temporariamente pela própria professora Alessandra, que disponibilizou seu equipamento pessoal para apoiar o desenvolvimento das atividades pedagógicas.",
          ],
        },
        {
          eyebrow: "Resultados e impacto",
          title: "Quando a barreira de acesso diminui, a aprendizagem aparece",
          paragraphs: [
            "Os resultados foram muito significativos. Em aproximadamente 40 dias de uso da ferramenta, Davi apresentou avanço importante no processo de alfabetização e passou a escrever frases simples em um editor de texto convencional. Esse progresso demonstrou que, quando a barreira de acesso é reduzida, a capacidade de aprendizagem pode aparecer com muito mais clareza.",
            "Com o sucesso inicial, foi possível ampliar o apoio ao aluno. Um amigo colaborou com a doação de um computador desktop, que foi instalado na casa de Davi, permitindo que ele continuasse seu processo de aprendizagem também fora do ambiente escolar.",
            "A experiência também teve impacto social. Ao perceberem que Davi aprendia, escrevia e participava, os colegas passaram a interagir mais com ele, incluindo-o nas brincadeiras e nas atividades do grupo. A tecnologia, nesse caso, não apenas apoiou a alfabetização, mas também ajudou a revelar aos demais alunos que Davi compreendia, aprendia e podia participar.",
            "Durante esse período, também foi observado um avanço na comunicação. Davi quase não falava e se comunicava principalmente por gestos. Com o aumento das interações sociais, dos estímulos recebidos e das oportunidades de participação, ele passou a demonstrar mais tentativas de comunicação verbal. Essa observação reforçou a importância do acesso, do convívio e da participação para o desenvolvimento da comunicação.",
          ],
        },
        {
          eyebrow: "Da vivência ao ecossistema",
          title: "De uma ferramenta simples a uma proposta mais ampla",
          tone: "soft",
          paragraphs: [
            "A experiência mostrou que a inclusão não depende apenas do conteúdo ensinado, mas também dos meios de acesso, comunicação, participação e reconhecimento. Muitas vezes, a pessoa tem capacidade de aprender, mas precisa de recursos adequados para conseguir expressar o que sabe.",
            "Foi a partir dessa vivência que nasceu a base conceitual do Projeto DAVI.",
            "O que começou como uma ferramenta simples de alfabetização assistida evoluiu para uma proposta mais ampla de tecnologia assistiva voltada à comunicação, aprendizagem, acessibilidade, métricas, criação de dispositivos, capacitação e autonomia.",
          ],
        },
        {
          eyebrow: "Uma construção colaborativa",
          title: "O DAVI ganha dimensão de ecossistema",
          paragraphs: [
            "Atualmente, o Projeto DAVI ganha dimensão de ecossistema a partir da interação entre os pesquisadores Andressa, Taty, Sara e Douglas, que ampliam a proposta inicial para integrar diferentes áreas do conhecimento, práticas educacionais, tecnologias assistivas, fabricação digital, inteligência artificial e estratégias de inclusão. Essa construção colaborativa fortalece o DAVI como uma plataforma voltada não apenas ao uso de recursos tecnológicos, mas à criação de caminhos reais para comunicação, aprendizagem, participação social e vida independente.",
          ],
        },
        {
          eyebrow: "O que ficou",
          title: "Faltava apenas o caminho de acesso",
          paragraphs: [
            "A história do Projeto DAVI mostra que uma solução simples pode transformar profundamente o processo de inclusão quando nasce da escuta de uma necessidade real. O projeto não surgiu apenas de uma ideia tecnológica, mas do encontro entre uma professora atenta, um aluno com potencial e a busca por um caminho acessível para aprender, escrever, se comunicar e participar.",
            "Davi mostrou que a inteligência estava presente. Faltava apenas o caminho de acesso.",
            "O Projeto DAVI nasceu para construir esse caminho.",
          ],
        },
      ]}
    />
  );
}
