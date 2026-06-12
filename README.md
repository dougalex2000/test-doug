# Projeto DAVI

**DAVI — Desenvolvimento Assistivo para Vida Independente**

Plataforma inteligente de tecnologia assistiva para avaliação, aprendizagem,
comunicação, recomendação de dispositivos e criação de soluções
personalizadas. O DAVI integra software, inteligência artificial,
rastreamento visual, comunicação alternativa, dispositivos assistivos e
oficina maker para ampliar autonomia, aprendizagem e participação social de
pessoas com deficiência.

O projeto nasceu de uma experiência real com um aluno chamado Davi, de 9
anos, em Valinhos-SP — a história completa está na página `/origem` do site.

## Tecnologias

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- MediaPipe Tasks Vision (rastreamento visual no navegador)
- Supabase (PostgreSQL + Auth + RLS) — integração pronta, ativada via `.env.local`

## Como executar

```bash
npm install
npm run dev
# http://localhost:3000
```

Scripts: `dev`, `build`, `start`, `lint`.

O site funciona completo **sem** banco de dados (modo demonstração). Para
ativar autenticação e persistência:

1. Crie um projeto em [supabase.com](https://supabase.com);
2. Execute `db/migrations/0001_initial_schema.sql` no SQL Editor;
3. Copie `.env.example` para `.env.local` e preencha as chaves;
4. Reinicie o servidor. Login em `/entrar`.

Detalhes do schema, RLS e modelo de segurança: [`db/README.md`](db/README.md).

## Estrutura

| Caminho | Conteúdo |
| --- | --- |
| `app/` | Páginas (App Router) — institucionais, módulos, galeria, avaliação |
| `app/components/` | Design system e componentes interativos ([guia](app/components/README.md)) |
| `app/lib/` | Dados mockados, navegação e clientes Supabase |
| `app/actions/` | Server Actions (persistência sob RLS) |
| `db/migrations/` | Schema SQL (25 tabelas + Row Level Security) |
| `proxy.ts` | Renovação de sessão (Next 16: antigo middleware) |
| `public/images/davi/` | Imagens ilustrativas ([lista do que falta](public/images/davi/README.md)) |

## Principais recursos

- **Site institucional** acessível (navegação por teclado, foco visível,
  alto contraste, leitores de tela), com 18+ páginas organizadas por serviço.
- **Rastreamento visual assistivo** (`/rastreamento`): webcam + calibração de
  9 pontos (~3 s e múltiplos frames por ponto, com descarte de frames ruins),
  seleção por permanência. Processamento 100% local; botão para apagar os
  dados de calibração. *Não substitui um eye tracker profissional.*
- **Comunicação alternativa** (`/comunicacao-alternativa`): prancha
  interativa com botões grandes, áudio em pt-BR, varredura automática e
  seleção por permanência.
- **Galeria de tecnologias assistivas** (`/galeria`): 15 dispositivos com
  filtros e páginas de detalhe preparadas para projetos abertos.
- **Avaliação funcional** (`/avaliacao`): formulário estruturado; salva no
  banco quando configurado (perfil profissional), com fallback local.

## Princípios inegociáveis

- Sem diagnóstico clínico automatizado — a IA apoia, o profissional decide.
- Sem fotos da face por padrão — calibração guarda apenas dados numéricos.
- Dados sensíveis exigem consentimento registrado e podem ser apagados.
- Sem pagamento real na loja social nesta etapa.
- Linguagem respeitosa: "pessoas com deficiência".

## Roadmap

- [x] Fase 1 — Auditoria
- [x] Fase 2 — Reestruturação institucional (home, menu, 14 páginas novas)
- [x] Fase 3 — Design system documentado
- [x] Fase 4 — Galeria com filtros e páginas de detalhe
- [x] Fase 5 — Prancha de comunicação interativa
- [x] Fase 6 — Schema de banco (25 tabelas + RLS) e integração Supabase
- [x] Fase 7 — Formulário de avaliação com persistência
- [x] Fase 8 — Calibração multi-frame com validação de qualidade
- [ ] Criar projeto Supabase e aplicar a migração (passo manual)
- [ ] Verificação de perfis profissionais (hoje auto-declarados no cadastro)
- [ ] Aprendizado de máquina local por zonas + confirmação por acionador/sopro
- [ ] Pranchas de comunicação configuráveis por usuário e integração com olhar
- [ ] Relatórios com exportação em PDF e resumos por IA
- [ ] Fluxo de maker requests e estrutura da loja social
- [ ] Imagens reais em `public/images/davi/` (com autorização de uso)
