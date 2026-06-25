import type { Metadata } from "next";
import { InterCelControlPrototype } from "../../../components/InterCelPrototype";

export const metadata: Metadata = {
  title: "DAVI InterCel — Joystick",
  description: "Use o celular como joystick para jogos e direção.",
};

export default function Page() {
  return <InterCelControlPrototype modoForcado="joystick" />;
}
