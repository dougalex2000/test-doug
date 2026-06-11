"use client";

import { useState } from "react";
import Link from "next/link";
import { PageShell, PageHero } from "../components/SiteShell";
import { mockNotifications, type Notification } from "../lib/userData";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

const kindStyles: Record<
  string,
  { bg: string; text: string; border: string; icon: string; dot: string }
> = {
  success: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
    icon: "✓",
    dot: "bg-green-500",
  },
  info: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-200",
    icon: "i",
    dot: "bg-blue-500",
  },
  warning: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    border: "border-amber-200",
    icon: "!",
    dot: "bg-amber-500",
  },
  alert: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-200",
    icon: "✕",
    dot: "bg-red-500",
  },
};

export default function NotificacoesPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unread = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Central de avisos"
        title="Notificações"
        description="Acompanhe atualizações, alertas e atividades da plataforma DAVI."
      />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-semibold text-zinc-600">
            {unread > 0 ? (
              <>
                <strong className="text-zinc-950">{unread}</strong> não lida
                {unread !== 1 ? "s" : ""}
              </>
            ) : (
              "Todas as notificações foram lidas"
            )}
          </p>
          {unread > 0 && (
            <button
              type="button"
              onClick={markAllRead}
              className={`rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-bold text-zinc-700 hover:bg-zinc-50 ${focusRing}`}
            >
              Marcar todas como lidas
            </button>
          )}
        </div>

        <div className="max-w-2xl space-y-3">
          {notifications.map((notif) => {
            const s = kindStyles[notif.kind];
            const card = (
              <div
                className={`flex gap-4 rounded-xl border p-5 transition-shadow ${
                  notif.read
                    ? "border-zinc-200 bg-white hover:shadow-md"
                    : "border-blue-200 bg-blue-50 hover:shadow-lg"
                }`}
              >
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-black ${s.bg} ${s.text} ${s.border}`}
                >
                  {s.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`font-black ${
                        notif.read ? "text-zinc-700" : "text-zinc-950"
                      }`}
                    >
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${s.dot}`} />
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-5 text-zinc-600">{notif.message}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs font-semibold text-zinc-400">{notif.time}</p>
                    {notif.href && (
                      <span className="text-xs font-black text-blue-700">Ver detalhes →</span>
                    )}
                  </div>
                </div>
              </div>
            );

            return notif.href ? (
              <Link
                key={notif.id}
                href={notif.href}
                className={`block ${focusRing}`}
                onClick={() => markRead(notif.id)}
              >
                {card}
              </Link>
            ) : (
              <button
                key={notif.id}
                type="button"
                className={`block w-full text-left ${focusRing}`}
                onClick={() => markRead(notif.id)}
              >
                {card}
              </button>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
