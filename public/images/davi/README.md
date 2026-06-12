# Imagens do Projeto DAVI

Coloque aqui as imagens ilustrativas reais do projeto. Enquanto elas não
existirem, o site usa placeholders elegantes (componente `MediaPlaceholder`
em `app/components/SiteShell.tsx`, com o atributo `data-image-slot` indicando
o nome de arquivo esperado).

## Imagens esperadas

| Arquivo | Conteúdo sugerido | Usada em |
| --- | --- | --- |
| `origem-davi-computador.jpg` | Criança usando computador adaptado na escola | Home (bloco Origem) |
| `origem-teclado-adaptado.jpg` | Criança pressionando teclas adaptadas com professora | /origem |
| `rastreamento-visual.jpg` | Pessoa interagindo com a tela por rastreamento visual | Home |
| `rastreamento-zonas.jpg` | Tela com zonas de seleção e indicador do olhar | /rastreamento-visual |
| `base-visual-davi.jpg` | Suporte de webcam com iluminação difusa | /captura-visual |
| `comunicacao-alternativa.jpg` | Prancha de comunicação com botões grandes | Home |
| `prancha-comunicacao.jpg` | Prancha digital com símbolos e categorias | /comunicacao-alternativa |
| `atividade-educacional.jpg` | Aluno em atividade adaptada com professor | /atividades |
| `oficina-maker.jpg` | Oficina com impressora 3D e peças assistivas | Home |
| `oficina-impressao-3d.jpg` | Impressora 3D produzindo peça assistiva | /oficina-maker |
| `familia-acessibilidade.jpg` | Família acompanhando criança com tecnologia assistiva | /familias |

## Recomendações

- Formato: JPG ou WebP, largura mínima de 1200px.
- Sempre obter autorização de uso de imagem das pessoas fotografadas
  (especialmente crianças — consentimento dos responsáveis).
- Prefira fotos reais do projeto; bancos de imagem podem ser usados
  temporariamente desde que a licença permita.
- Ao adicionar uma imagem, substitua o `MediaPlaceholder` correspondente por
  `<Image src="/images/davi/NOME.jpg" ... />` (componente `next/image`).
