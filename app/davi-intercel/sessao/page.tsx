import type { Metadata } from "next";
import { InterCelSessionReceiver } from "../../components/InterCelPrototype";

export const metadata: Metadata = {
  title: "Painel DAVI InterCel",
  description:
    "Painel para receber, em tempo real, os comandos enviados pelo controle DAVI InterCel no celular.",
};

export default function DaviInterCelSessaoPage() {
  return <InterCelSessionReceiver />;
}
