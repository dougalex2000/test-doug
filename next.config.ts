import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/dashboard", destination: "/painel", permanent: true },
      {
        source: "/catalogo",
        destination: "/tecnologias-assistivas/catalogo",
        permanent: true,
      },
      {
        source: "/oficina",
        destination: "/tecnologias-assistivas/oficina-maker",
        permanent: true,
      },
      {
        source: "/oficina-maker",
        destination: "/tecnologias-assistivas/oficina-maker",
        permanent: true,
      },
      {
        source: "/comunicacao-alternativa",
        destination: "/comunicacao/alternativa",
        permanent: true,
      },
      {
        source: "/davi-celacesso",
        destination: "/davi-intercel",
        permanent: true,
      },
      {
        source: "/tecnologias-assistivas/davi-imersivo",
        destination: "/davi-imersivo",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
