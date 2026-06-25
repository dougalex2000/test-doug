import type { Metadata } from "next";
import { InterCelControlPrototype } from "../../components/InterCelPrototype";

export const metadata: Metadata = {
  title: "DAVI InterCel — Modo técnico",
  description:
    "Modo técnico do DAVI InterCel: código de sessão, função do celular, comandos, histórico e diagnóstico para testes.",
};

export default function DaviInterCelTecnicoPage() {
  return <InterCelControlPrototype tecnico />;
}
