import type { Metadata } from "next";
import { InterCelControlPrototype } from "../../../components/InterCelPrototype";

export const metadata: Metadata = {
  title: "DAVI InterCel — Escrever",
  description: "Use o celular para escrever letras e palavras.",
};

export default function Page() {
  return <InterCelControlPrototype modoForcado="escrita" />;
}
