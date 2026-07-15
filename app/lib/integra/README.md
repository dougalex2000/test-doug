# DAVI Integra — modelo de dados proposto

Este documento descreve o modelo de dados **proposto** para o módulo DAVI Integra.
Ele **ainda não está aplicado** no Supabase: hoje o módulo usa dados demonstrativos
locais (`data.ts`) e os formulários **não gravam nada** (`service.ts` retorna
`{ status: "prepared" }`). Quando o backend seguro for criado, basta trocar o corpo
das funções de `service.ts` por consultas reais — as telas não mudam.

## Princípios de segurança

- Nunca expor a `service_role` no navegador. Leitura/escrita do usuário usa a
  chave anônima + sessão (RLS). Operações administrativas usam a service role
  **apenas no servidor** (ver `app/lib/supabase/server.ts`).
- Row Level Security (RLS) **habilitado em todas as tabelas**.
- Conteúdo público (desafios, projetos, grupos) pode ser lido por todos, mas só
  escrito por perfis autorizados (equipe/curadoria).
- Manifestações de interesse e propostas: qualquer pessoa pode **inserir**; só a
  equipe pode **ler** (dados de contato não são públicos).
- Nunca solicitar nem armazenar diagnósticos, laudos, dados médicos ou dados
  pessoais de terceiros.

## Tabelas propostas

### `integra_challenges` (desafios)
`id uuid pk`, `slug text unique`, `title text`, `summary text`,
`modules text[]`, `knowledge_areas text[]`, `status text`, `maturity text`,
`skills text[]`, `contribution_types text[]`, `deliverables text[]`,
`workgroup text`, `ethics_review boolean`, `docs_url text null`,
`repo_url text null`, `is_demo boolean default true`,
`created_at timestamptz default now()`.

### `integra_projects` (projetos)
`id uuid pk`, `slug text unique`, `name text`, `objective text`,
`modules text[]`, `description text`, `status text`, `current_stage text`,
`expected_results text[]`, `technologies text[]`, `workgroup text`,
`wanted_profiles text[]`, `area text`, `participation_types text[]`,
`modality text`, `docs_url text null`, `repo_url text null`,
`is_demo boolean default true`, `created_at timestamptz default now()`.

### `integra_project_updates` (histórico)
`id uuid pk`, `project_id uuid fk → integra_projects`, `date text`,
`text text`, `created_at timestamptz default now()`.

### `integra_workgroups` (grupos de trabalho)
`id uuid pk`, `slug text unique`, `name text`, `objective text`, `area text`,
`activities text[]`, `useful_knowledge text[]`, `situation text`,
`participation text`, `module_href text null`.

### `integra_interest` (manifestações de interesse)
`id uuid pk`, `name text`, `email text`, `city_state text`,
`institution text null`, `field text`, `background text`, `modules text[]`,
`contribution_types text[]`, `availability text`, `modality text`,
`portfolio_url text null`, `message text`, `privacy_accepted boolean`,
`context_ref text null`, `created_at timestamptz default now()`.
RLS: `insert` liberado a qualquer papel; `select` apenas para a equipe.

### `integra_proposals` (propostas de contribuição)
`id uuid pk`, `title text`, `category text`, `problem text`, `audience text`,
`imagined_solution text`, `modules text[]`, `required_knowledge text`,
`required_resources text null`, `expected_result text`, `risks text null`,
`needs_participant_research boolean`, `proposer_name text`,
`proposer_contact text`, `created_at timestamptz default now()`.
RLS: `insert` liberado; `select` apenas para a equipe.

### `integra_institutions` (instituições interessadas em parceria)
`id uuid pk`, `name text`, `kind text`, `contact_name text`,
`contact_email text`, `partnership_kinds text[]`, `message text`,
`created_at timestamptz default now()`.
RLS: `insert` liberado; `select` apenas para a equipe.

## Passos para ativar (quando houver decisão)

1. Criar uma migration em `supabase/migrations/` com as tabelas acima + RLS.
2. Implementar as inserções em `service.ts` (`submitInterest`, `submitProposal`)
   usando `getSupabaseServerClient()` em uma server action (`"use server"`).
3. Trocar as leituras (`getChallenges`, `getProjects`, `getWorkgroups`) para
   consultar o Supabase, mantendo `data.ts` como *fallback* de demonstração.
4. Atualizar as telas de sucesso dos formulários para o estado `saved`.
