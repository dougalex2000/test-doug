# Banco de Dados do Projeto DAVI

Schema PostgreSQL preparado para **Supabase** (Postgres + Auth + Storage +
Row Level Security). Nenhuma dependência foi instalada ainda — a integração
com o app será feita quando o projeto Supabase for criado.

## Como aplicar o schema

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Copie `.env.example` para `.env.local` e preencha as variáveis.
3. Aplique a migração de uma destas formas:
   - **SQL Editor** do Supabase: cole o conteúdo de
     `db/migrations/0001_initial_schema.sql` e execute; ou
   - **CLI**: `supabase db push` (com o supabase CLI configurado); ou
   - **psql**: `psql "$DATABASE_URL" -f db/migrations/0001_initial_schema.sql`.

## Visão geral das tabelas (25)

| # | Tabela | Conteúdo | Sensível? |
| --- | --- | --- | --- |
| 1 | `auth.users` (Supabase) | Usuários autenticados (gerenciada pelo Supabase Auth) | Sim |
| 2 | `profiles` | Perfil e papel do usuário (8 papéis) | Sim |
| 3 | `students` | Alunos/pacientes avaliados | **Sim** |
| 4 | `institutions` | Escolas, ONGs, OSCIPs, clínicas, prefeituras | Não |
| 5 | `professional_links` | Vínculo profissional ↔ instituição ↔ aluno | Sim |
| 6 | `evaluations` | Avaliações funcionais | **Sim** |
| 7 | `access_methods` | Catálogo de métodos de acesso | Não (público) |
| 8 | `evaluation_access_tests` | Testes práticos de método de acesso | **Sim** |
| 9 | `assistive_devices` | Catálogo de dispositivos | Não (público) |
| 10 | `device_categories` (+ `device_category_links`) | Categorias | Não (público) |
| 11 | `device_files` | Arquivos de projeto aberto (STL, PDF, código) | Não (público) |
| 12 | `device_recommendations` | Recomendações por aluno | **Sim** |
| 13 | `activity_modules` | Módulos educacionais e CAA | Não (público) |
| 14 | `activity_sessions` | Sessões de uso | **Sim** |
| 15 | `interaction_events` | Eventos (clique, olhar, sopro, tecla…) | **Sim** |
| 16 | `gaze_calibrations` | Calibrações do rastreamento visual | **Sim** |
| 17 | `gaze_samples` | Amostras **numéricas** de calibração — sem fotos da face | **Sim** |
| 18 | `reports` | Relatórios gerados | **Sim** |
| 19 | `ai_summaries` | Resumos de IA (com campo de revisão humana) | **Sim** |
| 20 | `maker_requests` | Solicitações de adaptação/fabricação | Sim |
| 21 | `store_products` | Loja social futura (inativa por padrão) | Não |
| 22 | `orders` | Pedidos futuros — **sem pagamento real** | Sim |
| 23 | `consent_records` | Consentimentos informados (com revogação) | **Sim** |
| 24 | `audit_logs` | Auditoria de acessos e ações | Sim |
| 25 | `files` | Metadados de arquivos com controle de acesso | Depende |

## Modelo de segurança (RLS)

- **Negar por padrão**: RLS habilitado em todas as tabelas; sem política, sem acesso.
- **Catálogos públicos** (dispositivos, categorias, métodos, módulos): leitura
  aberta apenas do que está `published`/`active`; escrita só de admin.
- **Dados de alunos**: visíveis apenas para o responsável (`guardian_profile_id`)
  e profissionais com vínculo ativo em `professional_links`
  (função `can_access_student`).
- **Calibração visual**: além de leitura/escrita vinculada, há política de
  `DELETE` — o direito de apagar dados de calibração é requisito do projeto.
- **`audit_logs`**: leitura só de admin; escrita apenas pelo servidor
  (service role), nunca pelo cliente.
- **IA**: `ai_summaries.reviewed_by_profile_id` registra a revisão humana —
  a IA apoia, o profissional decide.

## Regras para o código do app

1. `SUPABASE_SERVICE_ROLE_KEY` **somente** em código server-side
   (Route Handlers / Server Actions). Jamais com prefixo `NEXT_PUBLIC_`.
2. O cliente do navegador usa apenas a chave anônima + RLS.
3. Toda operação sensível deve registrar entrada em `audit_logs` (server-side).
4. Antes de gravar `gaze_calibrations`/`gaze_samples`, verificar
   `consent_records` com escopo `gaze_calibration` ativo (sem `revoked_at`).
5. Nunca armazenar imagens da face — apenas características numéricas em
   `gaze_samples.features`.

## Próximos passos

- [ ] **Criar o projeto Supabase, aplicar a migração e preencher `.env.local`**
      (único passo manual restante).
- [x] Instalar `@supabase/supabase-js` e `@supabase/ssr`.
- [x] Criar `app/lib/supabase/` com clientes browser (anon), server (anon +
      cookies) e admin (service role, server-only).
- [x] `proxy.ts` na raiz renovando a sessão (Next 16: middleware → proxy).
- [x] Fluxo de login/cadastro em `/entrar` com confirmação de e-mail
      (`/auth/confirm`) e criação de `profiles` a partir dos metadados.
- [x] Formulário de avaliação (`/avaliacao`) conectado via Server Action
      (`app/actions/evaluations.ts`), com fallback local quando o banco não
      está configurado ou o usuário não está autenticado.
- [ ] Revisar as políticas de RLS com a equipe antes de produção (em especial
      a auto-declaração de papel profissional no cadastro, que ainda não tem
      verificação).
