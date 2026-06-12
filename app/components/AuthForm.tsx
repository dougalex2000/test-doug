"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "../lib/supabase/browser";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

const inputClass = `mt-2 w-full rounded-lg border-2 border-zinc-300 bg-white px-4 py-3 text-base font-semibold text-zinc-950 ${focusRing}`;

const roleOptions = [
  { value: "teacher", label: "Professor(a)" },
  { value: "therapist", label: "Terapeuta" },
  { value: "guardian", label: "Responsável / Família" },
];

type Mode = "login" | "signup";

export function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = getSupabaseBrowserClient();

  const [mode, setMode] = useState<Mode>("login");
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(Boolean(supabase));
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoadingUser(false);
    });
  }, [supabase]);

  // Mensagens vindas da URL (ex.: retorno da confirmação de e-mail).
  const urlMessage =
    searchParams.get("confirmado") === "1"
      ? "E-mail confirmado com sucesso! Você já pode entrar."
      : null;
  const urlError =
    searchParams.get("erro") === "confirmacao"
      ? "Não foi possível confirmar o e-mail. Tente novamente."
      : null;
  const displayMessage = message ?? urlMessage;
  const displayError = error ?? urlError;

  if (!supabase) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <p className="text-base font-bold leading-7 text-amber-900">
          A autenticação ainda não está ativa: o projeto Supabase não foi
          configurado. Preencha o arquivo <code>.env.local</code> (modelo em{" "}
          <code>.env.example</code>) e reinicie o servidor para ativar o login.
        </p>
      </div>
    );
  }

  async function handleSignOut() {
    setSubmitting(true);
    await supabase!.auth.signOut();
    setUser(null);
    setSubmitting(false);
    router.refresh();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (mode === "login") {
      const { error: signInError } = await supabase!.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(
          signInError.message === "Invalid login credentials"
            ? "E-mail ou senha incorretos."
            : signInError.message,
        );
      } else {
        const { data } = await supabase!.auth.getUser();
        setUser(data.user ?? null);
        setMessage("Login realizado com sucesso!");
        router.refresh();
      }
    } else {
      const displayName = String(formData.get("displayName") ?? "").trim();
      const role = String(formData.get("role") ?? "guardian");
      const { data, error: signUpError } = await supabase!.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName, role },
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      });
      if (signUpError) {
        setError(signUpError.message);
      } else if (!data.session) {
        setMessage(
          "Cadastro criado! Verifique seu e-mail para confirmar a conta antes de entrar.",
        );
      } else {
        setUser(data.user);
        setMessage("Cadastro criado e login realizado!");
        router.refresh();
      }
    }
    setSubmitting(false);
  }

  if (loadingUser) {
    return (
      <p className="text-base font-bold text-zinc-600" role="status">
        Verificando sessão…
      </p>
    );
  }

  if (user) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
        <p className="text-base font-bold leading-7 text-green-900">
          Você está conectado como{" "}
          <strong>{String(user.user_metadata?.display_name ?? user.email)}</strong>
          {user.email ? ` (${user.email})` : ""}.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="/avaliacao#formulario"
            className={`rounded-lg bg-blue-700 px-5 py-3 font-black text-white hover:bg-blue-800 ${focusRing}`}
          >
            Ir para a Avaliação
          </a>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={submitting}
            className={`rounded-lg border border-zinc-300 bg-white px-5 py-3 font-black text-zinc-800 hover:border-red-400 hover:text-red-700 disabled:opacity-50 ${focusRing}`}
          >
            Sair da conta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg sm:p-8">
      <div className="flex gap-2" role="tablist" aria-label="Entrar ou criar conta">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "login"}
          onClick={() => setMode("login")}
          className={`rounded-lg px-5 py-3 font-black ${focusRing} ${
            mode === "login"
              ? "bg-blue-700 text-white"
              : "border border-zinc-300 bg-white text-zinc-700"
          }`}
        >
          Entrar
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "signup"}
          onClick={() => setMode("signup")}
          className={`rounded-lg px-5 py-3 font-black ${focusRing} ${
            mode === "signup"
              ? "bg-blue-700 text-white"
              : "border border-zinc-300 bg-white text-zinc-700"
          }`}
        >
          Criar conta
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
        {mode === "signup" ? (
          <>
            <div>
              <label htmlFor="auth-name" className="text-sm font-black text-zinc-900">
                Nome completo
              </label>
              <input
                id="auth-name"
                name="displayName"
                type="text"
                required
                autoComplete="name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="auth-role" className="text-sm font-black text-zinc-900">
                Perfil
              </label>
              <select id="auth-role" name="role" required className={inputClass}>
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs font-semibold text-zinc-500">
                Perfis profissionais passarão por verificação em versões
                futuras da plataforma.
              </p>
            </div>
          </>
        ) : null}
        <div>
          <label htmlFor="auth-email" className="text-sm font-black text-zinc-900">
            E-mail
          </label>
          <input
            id="auth-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="auth-password" className="text-sm font-black text-zinc-900">
            Senha
          </label>
          <input
            id="auth-password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className={inputClass}
          />
          {mode === "signup" ? (
            <p className="mt-2 text-xs font-semibold text-zinc-500">
              Mínimo de 8 caracteres.
            </p>
          ) : null}
        </div>

        {displayError ? (
          <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-800">
            {displayError}
          </p>
        ) : null}
        {displayMessage ? (
          <p role="status" className="rounded-lg bg-green-50 p-3 text-sm font-bold text-green-800">
            {displayMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className={`rounded-lg bg-blue-700 px-6 py-4 text-lg font-black text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800 disabled:opacity-50 ${focusRing}`}
        >
          {submitting
            ? "Aguarde…"
            : mode === "login"
              ? "Entrar"
              : "Criar conta"}
        </button>
      </form>
    </div>
  );
}
