# Design System do Projeto DAVI

Componentes reutilizáveis do site institucional. Todos seguem os princípios de
acessibilidade do projeto: foco visível, alvos grandes, contraste adequado e
HTML semântico.

## Mapa de componentes

| Componente pedido | Implementação | Arquivo |
| --- | --- | --- |
| Header | `SiteHeader` | `SiteShell.tsx` |
| Footer | `SiteFooter` | `SiteShell.tsx` |
| Hero | `PageHero` | `SiteShell.tsx` |
| Section | `Section` | `SiteShell.tsx` |
| PageTitle | `SectionHeader` (eyebrow + título + descrição) | `SiteShell.tsx` |
| Card / FeatureCard / ModuleCard / ServiceCard | `InfoGrid` (grade de cards com link opcional) | `SiteShell.tsx` |
| DeviceCard | `DeviceCard` + `DeviceStatusBadge` | `DeviceCard.tsx` |
| AccessibleButton | `LinkButton` (variants `primary`/`secondary`) | `SiteShell.tsx` |
| Breadcrumb | `Breadcrumb` | `SiteShell.tsx` |
| — | `TagList` (lista de etiquetas) | `SiteShell.tsx` |
| — | `MediaPlaceholder` (placeholder elegante de imagem) | `SiteShell.tsx` |
| — | `PageShell` (header + conteúdo + footer) | `SiteShell.tsx` |
| — | `GalleryExplorer` (filtros da galeria, client) | `GalleryExplorer.tsx` |
| — | `ModulePage` (página padrão de módulo da plataforma) | `ModulePage.tsx` |
| — | `EyeTrackingDemo` (rastreamento visual, client) | `EyeTrackingDemo.tsx` |

## Convenções

- Páginas institucionais são Server Components; interatividade fica em
  componentes `"use client"` isolados (`GalleryExplorer`, `EyeTrackingDemo`).
- Cores: azul (`blue-700/800`) para ação primária, verde para destaques
  positivos, âmbar para avisos, zinco para neutros. Fundo alternado
  branco / `#F6F8FB` / `zinc-950` entre seções.
- Tipografia: Inter para texto, Atkinson Hyperlegible para títulos
  (definidas em `app/layout.tsx`).
- Anel de foco: `focus-visible:ring-4 focus-visible:ring-blue-300` em todo
  elemento interativo.
- Dados mockados ficam em `app/lib/` (`devices.ts`, `siteContent.ts`,
  `navigation.ts`, `platformModules.ts`, `userData.ts`).
