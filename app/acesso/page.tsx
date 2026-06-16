import type { Metadata } from "next";
import { SectionHub } from "../components/modules";

export const metadata: Metadata = {
  title: "Acesso e Dispositivos",
  description:
    "Métodos de acesso, DAVI Vision, DAVI Conecta, BioSinal e calibração.",
};

export default function AcessoPage() {
  return (
    <SectionHub
      href="/acesso"
      subtitle="Como cada pessoa interage com o DAVI: olhar, toque, botão, sopro, dispositivos sem fio e sinais biológicos."
      cardsTitle="Métodos e dispositivos"
      sections={[
        {
          eyebrow: "Acesso e dispositivos",
          title: "Para cada pessoa, um caminho de interação",
          paragraphs: [
            "Não existe um único método de acesso. O DAVI estuda e oferece diferentes caminhos — do toque ao olhar, do botão adaptado ao sopro, do dispositivo sem fio aos sinais biológicos — para que a interação respeite o que cada pessoa consegue fazer.",
            "Os módulos DAVI Vision, DAVI Conecta e DAVI BioSinal exploram esses caminhos em diferentes estágios de maturidade.",
          ],
        },
      ]}
    />
  );
}
