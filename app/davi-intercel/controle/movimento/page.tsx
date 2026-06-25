import type { Metadata } from "next";
import { InterCelControlPrototype } from "../../../components/InterCelPrototype";

export const metadata: Metadata = {
  title: "DAVI InterCel — Movimento do celular",
  description: "Incline o celular para acionar comandos.",
};

export default function Page() {
  return <InterCelControlPrototype modoForcado="movimento" />;
}
