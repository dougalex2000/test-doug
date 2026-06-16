/**
 * Resolve o caminho da imagem de cada "slot" do site.
 *
 * Alguns slots têm foto real (.webp, banco Pexels); os demais usam a
 * ilustração vetorial (.svg). Este conjunto é a única fonte da verdade:
 * ao adicionar uma foto nova em public/images/davi, inclua o nome aqui.
 */
export const photoSlots = new Set<string>([
  "oficina-impressao-3d",
  "oficina-bancada-eletronica",
  "catalogo-dispositivos",
  "oficina-testes",
  "biosinal",
]);

export function assetSrc(name: string): string {
  const ext = photoSlots.has(name) ? "webp" : "svg";
  return `/images/davi/${name}.${ext}`;
}
