import type { Metadata } from "next";
import { InterCelControlPrototype } from "../../../components/InterCelPrototype";

export const metadata: Metadata = {
  title: "DAVI InterCel — Comunicação rápida",
  description: "Use o celular para falar e expressar com frases rápidas.",
};

export default function Page() {
  return <InterCelControlPrototype modoForcado="comunicacao" />;
}
