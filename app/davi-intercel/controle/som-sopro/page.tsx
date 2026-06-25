import type { Metadata } from "next";
import { InterCelControlPrototype } from "../../../components/InterCelPrototype";

export const metadata: Metadata = {
  title: "DAVI InterCel — Usar som ou sopro",
  description: "Use o microfone do celular como acionador por som ou sopro.",
};

export default function Page() {
  return <InterCelControlPrototype modoForcado="som-sopro" />;
}
