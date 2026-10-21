"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { temGetUserMedia, useFeatureSupport } from "./useFeatureSupport";

export type CameraFacing = "environment" | "user";

export type CameraState = {
  ativa: boolean;
  carregando: boolean;
  erro: string | null;
  facing: CameraFacing;
  /** false quando o navegador não oferece getUserMedia (ou não é contexto seguro). */
  suportada: boolean;
};

/**
 * Câmera do celular para o DAVI Mentor.
 *
 * Princípio do item 9 da especificação: o vídeo NUNCA é transmitido ao
 * servidor. Ele fica no elemento <video> local, e só um frame isolado é
 * capturado — em JPEG — quando a pessoa pede uma análise.
 *
 * Preferência por `environment` (câmera traseira), que é a que enxerga o
 * ambiente ao redor de quem usa.
 */
export function useMentorCamera() {
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useCallback((video: HTMLVideoElement | null) => {
    videoElementRef.current = video;
    if (video && streamRef.current) {
      video.srcObject = streamRef.current;
      void video.play().catch(() => {});
    }
  }, []);
  const suportada = useFeatureSupport(temGetUserMedia);
  const [interno, setState] = useState<Omit<CameraState, "suportada">>({
    ativa: false,
    carregando: false,
    erro: null,
    facing: "environment",
  });

  // O suporte vem do navegador, não do estado: derivar evita render extra.
  const state: CameraState = {
    ...interno,
    suportada,
    erro:
      interno.erro ??
      (suportada
        ? null
        : "Este navegador não permite acesso à câmera. Em celular, use HTTPS ou localhost."),
  };

  const parar = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoElementRef.current) videoElementRef.current.srcObject = null;
    setState((s) => ({ ...s, ativa: false, carregando: false }));
  }, []);

  const iniciar = useCallback(
    async (facing: CameraFacing = "environment") => {
      if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        setState((s) => ({ ...s, erro: "Câmera indisponível." }));
        return false;
      }
      setState((s) => ({ ...s, carregando: true, erro: null }));
      try {
        streamRef.current?.getTracks().forEach((t) => t.stop());
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        streamRef.current = stream;
        if (videoElementRef.current) {
          videoElementRef.current.srcObject = stream;
          await videoElementRef.current.play().catch(() => {
            // Alguns navegadores exigem gesto do usuário; o <video> tem autoPlay.
          });
        }
        setState((s) => ({ ...s, ativa: true, carregando: false, facing, erro: null }));
        return true;
      } catch (e) {
        const nome = e instanceof DOMException ? e.name : "";
        const erro =
          nome === "NotAllowedError"
            ? "Permissão de câmera negada. Toque no cadeado da barra de endereço e permita a câmera."
            : nome === "NotFoundError"
              ? "Nenhuma câmera encontrada neste aparelho."
              : "Não foi possível abrir a câmera.";
        setState((s) => ({ ...s, ativa: false, carregando: false, erro }));
        return false;
      }
    },
    [],
  );

  const trocar = useCallback(async () => {
    const proxima: CameraFacing = state.facing === "environment" ? "user" : "environment";
    return iniciar(proxima);
  }, [state.facing, iniciar]);

  /**
   * Captura um único frame como data URL JPEG.
   * Qualidade 0.7 e largura máxima de 1024px: suficiente para o modelo
   * entender a cena, e leve o bastante para trafegar em rede móvel.
   */
  const capturarFrame = useCallback((): string | null => {
    const video = videoElementRef.current;
    if (!video || !video.videoWidth) return null;

    const maxLargura = 1024;
    const escala = Math.min(1, maxLargura / video.videoWidth);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(video.videoWidth * escala);
    canvas.height = Math.round(video.videoHeight * escala);

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.7);
  }, []);

  // Garante que a câmera seja liberada ao sair da tela.
  useEffect(() => () => parar(), [parar]);

  return { videoRef, state, iniciar, parar, trocar, capturarFrame };
}
