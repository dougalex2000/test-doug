import type { Metadata } from "next";
import { InterCelControlPrototype } from "../../components/InterCelPrototype";

export const metadata: Metadata = {
  title: "DAVI InterCel Controle",
  description:
    "Protótipo web do DAVI InterCel para transformar o celular em controle assistivo.",
};

export default function DaviInterCelControlePage() {
  return <InterCelControlPrototype />;
}
