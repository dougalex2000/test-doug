import type { Metadata } from "next";
import { SectionHub } from "../components/modules";

export const metadata: Metadata = {
  title: "Instituições e Comunidades",
  description:
    "Famílias, escolas, cuidadores, profissionais, prefeituras, ONGs e comunidades.",
};

export default function ComunidadesPage() {
  return (
    <SectionHub
      href="/comunidades"
      subtitle="O DAVI foi pensado para apoiar redes inteiras de inclusão, em diferentes contextos."
      cardsTitle="Para quem é o DAVI"
      sections={[
        {
          eyebrow: "Instituições e comunidades",
          title: "Da sala de aula à comunidade remota",
          paragraphs: [
            "O ecossistema dialoga com famílias, escolas, cuidadores, profissionais, prefeituras, ONGs, comunidades remotas e povos indígenas. Cada contexto tem necessidades próprias — e o DAVI busca respeitá-las, especialmente onde não há serviço especializado próximo.",
          ],
        },
      ]}
    />
  );
}
