"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  ConnectionState,
  CricketEventType,
  CricketWebSocketMessage,
} from "../../../lib/cricket/types";

/**
 * Canal de tempo real do CRICKET.
 *
 * O endereço vem de NEXT_PUBLIC_CRICKET_WS_URL. Quando a variável não está
 * definida — que é o caso em desenvolvimento e na Vercel sem gateway próprio —
 * o hook fica em "offline" de propósito e NÃO tenta conectar: a sessão inteira
 * funciona sem WebSocket, usando as rotas HTTP. O canal é um acréscimo para
 * telemetria e sincronização, nunca um pré-requisito.
 *
 * Reconexão com espera progressiva, limitada, para não martelar o servidor.
 */

const RECONEXAO_BASE_MS = 1_000;
const RECONEXAO_MAX_MS = 15_000;

export function useCricketWebSocket(sessionId: string, habilitado: boolean) {
  const url = process.env.NEXT_PUBLIC_CRICKET_WS_URL;
  const socketRef = useRef<WebSocket | null>(null);
  const tentativaRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fechandoRef = useRef(false);

  // Estado da tentativa de conexão. Quando não há endereço configurado o valor
  // exposto é derivado para "offline" — sem precisar escrever estado no efeito.
  const [estadoConexao, setEstado] = useState<ConnectionState>("reconectando");
  const [ultimoEvento, setUltimoEvento] = useState<CricketWebSocketMessage | null>(null);

  const enviar = useCallback(
    (type: CricketEventType, payload: unknown) => {
      const socket = socketRef.current;
      if (!socket || socket.readyState !== WebSocket.OPEN) return false;
      const mensagem: CricketWebSocketMessage = {
        type,
        sessionId,
        timestamp: new Date().toISOString(),
        payload,
      };
      socket.send(JSON.stringify(mensagem));
      return true;
    },
    [sessionId],
  );

  useEffect(() => {
    if (!url || !habilitado) return;

    fechandoRef.current = false;

    const conectar = () => {
      if (fechandoRef.current) return;

      let socket: WebSocket;
      try {
        socket = new WebSocket(url);
      } catch {
        agendarReconexao();
        return;
      }
      socketRef.current = socket;

      socket.onopen = () => {
        tentativaRef.current = 0;
        setEstado("conectado");
        enviar("session.start", { sessionId });
      };

      socket.onmessage = (event) => {
        try {
          setUltimoEvento(JSON.parse(event.data) as CricketWebSocketMessage);
        } catch {
          // Mensagem fora do protocolo: ignorada de propósito.
        }
      };

      socket.onerror = () => {
        // onclose sempre vem em seguida; a reconexão é tratada lá.
      };

      socket.onclose = () => {
        socketRef.current = null;
        if (fechandoRef.current) return;
        agendarReconexao();
      };
    };

    const agendarReconexao = () => {
      if (fechandoRef.current) return;
      setEstado("reconectando");
      const espera = Math.min(
        RECONEXAO_BASE_MS * 2 ** tentativaRef.current,
        RECONEXAO_MAX_MS,
      );
      tentativaRef.current += 1;
      timerRef.current = setTimeout(conectar, espera);
    };

    conectar();

    return () => {
      fechandoRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, [url, habilitado, sessionId, enviar]);

  const estado: ConnectionState = !url || !habilitado ? "offline" : estadoConexao;

  return {
    estado,
    /** false quando nem há endereço configurado — a interface mostra isso. */
    configurado: Boolean(url),
    ultimoEvento,
    enviar,
  };
}
