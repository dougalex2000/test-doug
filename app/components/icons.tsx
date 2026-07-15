import type { SVGProps } from "react";

/**
 * Conjunto de ícones SVG do DAVI — traço uniforme (1.8), cantos arredondados,
 * herdam a cor do texto via `currentColor`. Uso: <IconEye className="h-6 w-6" />.
 * Todos são decorativos por padrão (aria-hidden); quando o ícone for o único
 * conteúdo de um controle, forneça `aria-label` no controle, não no ícone.
 */
function IconBase({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconMenu(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M4 6.5h16M4 12h16M4 17.5h16" />
    </IconBase>
  );
}

export function IconIntegra(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      {/* Três nós conectados — pessoas e áreas que se integram. */}
      <circle cx="6" cy="7" r="2.4" />
      <circle cx="18" cy="7" r="2.4" />
      <circle cx="12" cy="17.5" r="2.4" />
      <path d="M8.2 8.2 10 15.4M15.8 8.2 14 15.4M8 7h8" />
    </IconBase>
  );
}

export function IconHandshake(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M12 6.5 9.5 5a2 2 0 0 0-2 .1L3 8v6l2 1" />
      <path d="M12 6.5 14.5 5a2 2 0 0 1 2 .1L21 8v6l-2 1" />
      <path d="m8 12 2.2 2.2a1.5 1.5 0 0 0 2.1 0l3.7-3.7" />
      <path d="m13 11 2 2M11 13l1.5 1.5M9.5 14.5 11 16" />
    </IconBase>
  );
}

export function IconBell(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M12 3.5a6 6 0 0 0-6 6v3.2c0 .6-.2 1.2-.6 1.7L4 16.5h16l-1.4-2.1a3 3 0 0 1-.6-1.7V9.5a6 6 0 0 0-6-6Z" />
      <path d="M9.8 19.5a2.3 2.3 0 0 0 4.4 0" />
    </IconBase>
  );
}

export function IconContrast(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5a8.5 8.5 0 0 1 0 17Z" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function IconMotion(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M4 7h9M4 12h13M4 17h9" />
      <path d="M17.5 5.5 20 7l-2.5 1.5zM17.5 15.5 20 17l-2.5 1.5z" fill="currentColor" />
    </IconBase>
  );
}

export function IconEye(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M2.5 12c1.9-4.2 5.4-6.8 9.5-6.8s7.6 2.6 9.5 6.8c-1.9 4.2-5.4 6.8-9.5 6.8S4.4 16.2 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </IconBase>
  );
}

export function IconWind(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M3 8.5h9.5a2.8 2.8 0 1 0-2.8-2.8" />
      <path d="M3 12.5h13.7a2.8 2.8 0 1 1-2.8 2.8" />
      <path d="M3 16.5h6" />
    </IconBase>
  );
}

export function IconSwitchButton(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M7 13.5a5 5 0 0 1 10 0" />
      <rect x="4" y="13.5" width="16" height="5.5" rx="2" />
      <path d="M12 5v2.5M7.5 6.5l1.2 1.8M16.5 6.5l-1.2 1.8" />
    </IconBase>
  );
}

export function IconTouch(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="13" r="3" />
      <path d="M12 4v3M5.6 6.6l2 2M18.4 6.6l-2 2M4 13h3M17 13h3" />
    </IconBase>
  );
}

export function IconStand(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="9" y="3" width="6" height="4" rx="1.2" />
      <path d="M12 7v6M12 13l-4.5 7M12 13l4.5 7M6 20h12" />
    </IconBase>
  );
}

export function IconChat(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M21 11.3c0 4-4 7.2-9 7.2-1 0-2-.1-2.9-.4L4 19.5l1.1-3.1C4 15.1 3 13.3 3 11.3 3 7.3 7 4 12 4s9 3.3 9 7.3Z" />
      <path d="M8 10h8M8 13h5" />
    </IconBase>
  );
}

export function IconChip(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <rect x="10.5" y="10.5" width="3" height="3" rx="0.5" />
      <path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3" />
    </IconBase>
  );
}

export function IconPrinter3D(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M4 3.5h16M6 3.5V9h12V3.5M12 9v2M10.8 11h2.4l-1.2 2z" />
      <path d="M9.5 20v-2.6l2.5-1.5 2.5 1.5V20M4 20.5h16" />
    </IconBase>
  );
}

export function IconWrench(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </IconBase>
  );
}

export function IconRuler(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="3" y="9" width="18" height="6.5" rx="1.2" />
      <path d="M7 9v2.8M11 9v2.8M15 9v2.8M19 9v2.8" />
    </IconBase>
  );
}

export function IconShieldCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M12 3 19 6v5c0 4.6-3 8-7 10-4-2-7-5.4-7-10V6l7-3Z" />
      <path d="m9 12 2.2 2.2L15 9.8" />
    </IconBase>
  );
}

export function IconDocument(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7l-4-4Z" />
      <path d="M14 3v4h4M9.5 12h5M9.5 15.5h5" />
    </IconBase>
  );
}

export function IconUsers(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M15.2 6.3a3 3 0 1 1 1.4 5.7M16 14.7c2.5.6 4.5 2.3 4.5 4.3" />
    </IconBase>
  );
}

export function IconSparkles(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="m11 5 1.3 3.7L16 10l-3.7 1.3L11 15l-1.3-3.7L6 10l3.7-1.3L11 5Z" />
      <path d="m18 14 .7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
    </IconBase>
  );
}

export function IconArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M4 12h16M14.5 6.5 20 12l-5.5 5.5" />
    </IconBase>
  );
}

export function IconCheckCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.3 2.4 2.4 4.6-5.4" />
    </IconBase>
  );
}

export function IconLightbulb(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M12 3a6 6 0 0 0-3.4 10.9c.7.5 1 1.3 1 2.1h4.8c0-.8.3-1.6 1-2.1A6 6 0 0 0 12 3Z" />
      <path d="M9.8 19h4.4M10.5 21.5h3" />
    </IconBase>
  );
}

export function IconClipboard(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="5.5" y="5" width="13" height="16" rx="1.5" />
      <path d="M9 5V3.5h6V5" />
      <path d="M9 11h6M9 15h6" />
    </IconBase>
  );
}

export function IconDownload(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M12 4v10M7.5 10.5 12 15l4.5-4.5M5 19.5h14" />
    </IconBase>
  );
}

export function IconCube(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m12 12 8-4.5M12 12 4 7.5M12 12v9" />
    </IconBase>
  );
}

export function IconJoystick(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="5.5" r="2.5" />
      <path d="M12 8v6" />
      <rect x="4" y="14" width="16" height="5" rx="2" />
    </IconBase>
  );
}

export function IconGamepad(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M7 9h10a4.5 4.5 0 0 1 4.4 5.4l-.6 3a3 3 0 0 1-5.3 1.2L13.8 16h-3.6l-1.7 2.6a3 3 0 0 1-5.3-1.2l-.6-3A4.5 4.5 0 0 1 7 9Z" />
      <path d="M7 12v3M5.5 13.5h3M15.5 12.5h.01M18 14.5h.01" />
    </IconBase>
  );
}

export function IconVrGlasses(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="2.5" y="7.5" width="19" height="9" rx="3" />
      <path d="M12 16.5v-1M9 11h.01M15 11h.01" />
    </IconBase>
  );
}

export function IconTrophy(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3" />
      <path d="M10 13.5v2.5h4v-2.5M8 20h8M9.5 20l.5-4M14.5 20l-.5-4" />
    </IconBase>
  );
}

export function IconHeartHand(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M12 8.4c1.1-2.2 4.4-2.2 5.4 0 .8 1.7-.3 3.4-2.4 5.2L12 16l-3-2.4C6.9 11.8 5.8 10.1 6.6 8.4c1-2.2 4.3-2.2 5.4 0Z" />
      <path d="M4 19.5h16" />
    </IconBase>
  );
}
