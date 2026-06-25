import type { Metadata } from "next";
import { InterCelControlPrototype } from "../../../components/InterCelPrototype";

export const metadata: Metadata = {
  title: "DAVI InterCel — Controlar aula",
  description: "Use o celular para controlar a videoaula ou atividade.",
};

export default function Page() {
  return <InterCelControlPrototype modoForcado="comandos" />;
}
