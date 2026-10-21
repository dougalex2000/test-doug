import Link from "next/link";
import type { MentorProfile } from "../../lib/cricket/types";

/**
 * Cartão de QR Code de um perfil.
 *
 * A imagem vem da rota /api/davi-mentor/qr, que gera o SVG no servidor. O
 * conteúdo do código é apenas a URL pública com o identificador do perfil —
 * nenhum dado pessoal (item 5 da especificação).
 */
export function MentorQRCode({
  profile,
  destino,
  mostrarQr = true,
}: {
  profile: MentorProfile;
  destino: string;
  mostrarQr?: boolean;
}) {
  return (
    <article className="flex flex-col items-center rounded-xl border-2 border-zinc-200 bg-white p-5 text-center">
      <h3 className="text-lg font-black text-zinc-950">{profile.preferredName}</h3>
      <p className="mt-1 text-sm font-semibold text-zinc-600">
        Nível {profile.assistanceLevel} · {profile.capabilities.length} funções
      </p>

      {mostrarQr ? <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-2">
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG gerado sob demanda pela rota; next/image não otimiza SVG dinâmico */}
        <img
          src={`/api/davi-mentor/qr?p=${encodeURIComponent(profile.id)}`}
          alt={`QR Code para abrir o DAVI Mentor com o perfil ${profile.preferredName}`}
          width={200}
          height={200}
          className="h-[200px] w-[200px]"
        />
      </div> : null}

      <p className="mt-3 break-all font-mono text-xs text-zinc-500">{destino}</p>

      <Link
        href={`/davi-mentor/sessao?p=${encodeURIComponent(profile.id)}`}
        className="mt-4 inline-flex min-h-[44px] items-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-black text-white hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
      >
        Abrir neste aparelho
      </Link>
    </article>
  );
}
