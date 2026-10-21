import Link from "next/link";
import Image from "next/image";

/**
 * Identidade visual oficial do módulo CRICKET / DAVI Mentor.
 *
 * Este arquivo é a única fonte da verdade do logotipo: nenhuma outra tela
 * deve escrever o caminho do arquivo direto. Assim, trocar o asset no futuro
 * (ou acrescentar uma versão só do mascote) muda um lugar só.
 *
 * O arquivo é um lockup completo — mascote + "CRICKET" + "DAVI Mentor" +
 * "Assistente Cognitivo Contextual" — em PNG quadrado de 1254x1254 com fundo
 * transparente. Por ser quadrado e sempre renderizado com a proporção
 * intrínseca (width/height + h-auto + object-contain), nunca distorce nem
 * corta o mascote, em nenhum tamanho.
 */
export const CRICKET_LOGO_SRC =
  "/images/davi/Mascote Robótico Cricket Davi Mentor.png";

export const CRICKET_LOGO_ALT =
  "CRICKET DAVI Mentor - Assistente Cognitivo Contextual";

/** Lado do PNG original, em pixels (a imagem é quadrada). */
const CRICKET_LOGO_INTRINSIC = 1254;

export type CricketLogoSize = "xs" | "sm" | "md" | "lg" | "xl";

/** Largura renderizada por tamanho — mobile primeiro, cresce com a tela. */
const widthBySize: Record<CricketLogoSize, string> = {
  xs: "w-12 sm:w-14",
  sm: "w-20 sm:w-24",
  md: "w-32 sm:w-40",
  lg: "w-52 sm:w-64",
  xl: "w-60 sm:w-80 lg:w-[26rem]",
};

/**
 * Larguras reais em CSS px por breakpoint, para o navegador baixar o arquivo
 * certo do srcset. Sem isto o navegador assume 100vw e baixa a imagem grande
 * mesmo no celular.
 */
const sizesBySize: Record<CricketLogoSize, string> = {
  xs: "(min-width: 640px) 56px, 48px",
  sm: "(min-width: 640px) 96px, 80px",
  md: "(min-width: 640px) 160px, 128px",
  lg: "(min-width: 640px) 256px, 208px",
  xl: "(min-width: 1024px) 416px, (min-width: 640px) 320px, 240px",
};

export function CricketLogo({
  size = "md",
  preload = false,
  decorative = false,
  className = "",
}: {
  size?: CricketLogoSize;
  /** Use apenas na imagem principal da tela (LCP). */
  preload?: boolean;
  /** Quando o mesmo texto já aparece ao lado, evita leitura duplicada. */
  decorative?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={CRICKET_LOGO_SRC}
      alt={decorative ? "" : CRICKET_LOGO_ALT}
      width={CRICKET_LOGO_INTRINSIC}
      height={CRICKET_LOGO_INTRINSIC}
      sizes={sizesBySize[size]}
      preload={preload}
      className={`h-auto max-w-full object-contain ${widthBySize[size]} ${className}`}
    />
  );
}

/**
 * Cabeçalho principal do módulo: logotipo reduzido + nome, presente em todas
 * as telas do CRICKET (inicial, QR Code, demonstração e, quando existir, o
 * painel). Fica abaixo do cabeçalho geral do site, então não usa sticky.
 */
export function CricketModuleHeader({
  subtitle = "Assistente Cognitivo Contextual",
}: {
  subtitle?: string;
}) {
  return (
    <div className="border-b border-zinc-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center gap-4">
        <Link
          href="/davi-mentor"
          aria-label="Ir para a tela inicial do CRICKET DAVI Mentor"
          className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
        >
          <CricketLogo size="xs" decorative />
        </Link>
        <div className="min-w-0">
          <p className="text-lg font-black leading-tight text-zinc-950 sm:text-xl">
            CRICKET <span className="text-green-700">DAVI Mentor</span>
          </p>
          <p className="mt-0.5 truncate text-sm font-semibold text-zinc-600">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
