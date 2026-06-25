import type { Metadata } from "next";
import { InterCelSessionReceiver } from "../../components/InterCelPrototype";

export const metadata: Metadata = {
  title: "Sessão DAVI InterCel",
  description:
    "Tela receptora para testar comandos enviados pelo controle DAVI InterCel.",
};

export default function DaviInterCelSessaoPage() {
  return <InterCelSessionReceiver />;
}
