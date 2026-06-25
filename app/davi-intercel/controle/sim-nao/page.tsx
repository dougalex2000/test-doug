import type { Metadata } from "next";
import { InterCelControlPrototype } from "../../../components/InterCelPrototype";

export const metadata: Metadata = {
  title: "DAVI InterCel — Sim / Não",
  description: "Use o celular para responder Sim ou Não.",
};

export default function Page() {
  return <InterCelControlPrototype modoForcado="sim-nao" />;
}
