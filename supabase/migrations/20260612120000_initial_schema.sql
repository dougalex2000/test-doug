-- ============================================================================
-- Projeto DAVI — Schema inicial do banco de dados
-- Alvo: PostgreSQL no Supabase (Row Level Security habilitado em tudo).
--
-- IMPORTANTE:
-- * A tabela de usuários autenticados (1. users) é fornecida pelo Supabase
--   Auth como `auth.users` — não é criada aqui. Em Postgres puro, crie uma
--   tabela `users (id uuid primary key, email text unique, ...)` e ajuste as
--   referências `auth.users` e as funções `auth.uid()` deste arquivo.
-- * As políticas de RLS abaixo são uma base segura por padrão (negar tudo,
--   liberar o mínimo). Revise com a equipe antes de produção.
-- * Nenhuma tabela armazena imagens da face. `gaze_samples` guarda apenas
--   características numéricas, conforme a política de privacidade do DAVI.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Tipos enumerados
-- ----------------------------------------------------------------------------
create type public.user_role as enum (
  'student',        -- Aluno/Paciente
  'teacher',        -- Professor
  'therapist',      -- Terapeuta
  'guardian',       -- Responsável/Família
  'researcher',     -- Pesquisador
  'admin',          -- Administrador
  'maker',          -- Oficina Maker
  'institution'     -- Gestor institucional
);

create type public.device_status as enum (
  'open_project',      -- Projeto aberto
  'in_development',    -- Em desenvolvimento
  'available',         -- Disponível
  'on_demand'          -- Sob demanda
);

create type public.file_kind as enum (
  'stl', 'pdf', 'image', 'video', 'code', 'schematic', 'other'
);

create type public.maker_request_status as enum (
  'received', 'in_review', 'approved', 'in_production', 'delivered', 'cancelled'
);

create type public.order_status as enum (
  -- Loja social futura: SEM pagamento real nesta etapa.
  'draft', 'requested', 'cancelled'
);

-- ----------------------------------------------------------------------------
-- 2. profiles — perfil de cada usuário autenticado
-- ----------------------------------------------------------------------------
create table public.profiles (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null unique references auth.users (id) on delete cascade,
  role        public.user_role not null default 'guardian',
  display_name text not null,
  phone       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 4. institutions — escolas, ONGs, OSCIPs, clínicas, prefeituras, universidades
-- ----------------------------------------------------------------------------
create table public.institutions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  kind        text not null, -- escola | ong | oscip | clinica | prefeitura | universidade | espaco_maker | outra
  city        text,
  state       text,
  contact_email text,
  created_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 3. students — alunos/pacientes avaliados (dados sensíveis)
-- ----------------------------------------------------------------------------
create table public.students (
  id             uuid primary key default gen_random_uuid(),
  institution_id uuid references public.institutions (id) on delete set null,
  guardian_profile_id uuid references public.profiles (id) on delete set null,
  created_by_profile uuid references public.profiles (id) on delete set null,
  full_name      text not null,
  birth_date     date,
  school_grade   text,
  notes          text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 5. professional_links — vínculo profissional ↔ instituição ↔ aluno
-- ----------------------------------------------------------------------------
create table public.professional_links (
  id              uuid primary key default gen_random_uuid(),
  profile_id      uuid not null references public.profiles (id) on delete cascade,
  institution_id  uuid references public.institutions (id) on delete cascade,
  student_id      uuid references public.students (id) on delete cascade,
  link_role       text not null, -- professor | terapeuta | aee | pesquisador | gestor
  active          boolean not null default true,
  created_at      timestamptz not null default now(),
  unique (profile_id, institution_id, student_id, link_role)
);

-- ----------------------------------------------------------------------------
-- 7. access_methods — catálogo de métodos de acesso assistivo
-- ----------------------------------------------------------------------------
create table public.access_methods (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique, -- olhar | toque | acionador | sopro | cabeca | joystick | pedal | proximidade | voz | varredura | multimodal
  name        text not null,
  description text,
  created_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 6. evaluations — avaliações funcionais (dados sensíveis)
-- ----------------------------------------------------------------------------
create table public.evaluations (
  id                   uuid primary key default gen_random_uuid(),
  student_id           uuid not null references public.students (id) on delete cascade,
  evaluator_profile_id uuid not null references public.profiles (id),
  institution_id       uuid references public.institutions (id),
  motor_limitations    text,
  preserved_movements  text,
  current_communication text,
  hand_use             text,
  head_control         text,
  gaze_control         text,
  blow_capacity        text,
  attention            text,
  comprehension        text,
  fatigue              text,
  observations         text,
  evaluated_at         timestamptz not null default now(),
  created_at           timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 8. evaluation_access_tests — testes práticos de método de acesso
-- ----------------------------------------------------------------------------
create table public.evaluation_access_tests (
  id               uuid primary key default gen_random_uuid(),
  evaluation_id    uuid not null references public.evaluations (id) on delete cascade,
  access_method_id uuid not null references public.access_methods (id),
  performance      text, -- excelente | bom | regular | dificil | inviavel
  response_time_ms integer,
  observations     text,
  created_at       timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 10. device_categories — categorias de dispositivos
-- ----------------------------------------------------------------------------
create table public.device_categories (
  id   uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null
);

-- ----------------------------------------------------------------------------
-- 9. assistive_devices — catálogo de dispositivos assistivos (público)
-- ----------------------------------------------------------------------------
create table public.assistive_devices (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique,
  name                text not null,
  short_description   text not null,
  long_description    text,
  indicated_for       text,
  access_type         text,
  assembly_difficulty text, -- baixa | media | alta
  estimated_cost      text,
  status              public.device_status not null default 'in_development',
  published           boolean not null default false,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create table public.device_category_links (
  device_id   uuid not null references public.assistive_devices (id) on delete cascade,
  category_id uuid not null references public.device_categories (id) on delete cascade,
  primary key (device_id, category_id)
);

-- ----------------------------------------------------------------------------
-- 25. files — metadados de arquivos enviados (controle de acesso)
-- ----------------------------------------------------------------------------
create table public.files (
  id           uuid primary key default gen_random_uuid(),
  storage_path text not null unique, -- caminho no bucket de storage
  kind         public.file_kind not null default 'other',
  mime_type    text,
  size_bytes   bigint,
  is_public    boolean not null default false,
  owner_profile_id uuid references public.profiles (id) on delete set null,
  created_at   timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 11. device_files — arquivos de projeto aberto (STL, PDF, código, esquemas)
-- ----------------------------------------------------------------------------
create table public.device_files (
  id        uuid primary key default gen_random_uuid(),
  device_id uuid not null references public.assistive_devices (id) on delete cascade,
  file_id   uuid not null references public.files (id) on delete cascade,
  label     text not null, -- "Manual de montagem", "STL da base", ...
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 12. device_recommendations — recomendações de dispositivos para alunos
-- ----------------------------------------------------------------------------
create table public.device_recommendations (
  id                     uuid primary key default gen_random_uuid(),
  student_id             uuid not null references public.students (id) on delete cascade,
  device_id              uuid not null references public.assistive_devices (id),
  recommended_by_profile uuid not null references public.profiles (id),
  evaluation_id          uuid references public.evaluations (id) on delete set null,
  rationale              text,
  ai_assisted            boolean not null default false, -- IA apoia; decisão é do profissional
  created_at             timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 13. activity_modules — módulos educacionais e de comunicação alternativa
-- ----------------------------------------------------------------------------
create table public.activity_modules (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique, -- alfabetizacao | matematica | portugues | causa-efeito | caa | personalizada
  name        text not null,
  description text,
  published   boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 14. activity_sessions — sessões de uso (dados sensíveis)
-- ----------------------------------------------------------------------------
create table public.activity_sessions (
  id               uuid primary key default gen_random_uuid(),
  student_id       uuid not null references public.students (id) on delete cascade,
  module_id        uuid references public.activity_modules (id),
  access_method_id uuid references public.access_methods (id),
  supervisor_profile_id uuid references public.profiles (id),
  started_at       timestamptz not null default now(),
  ended_at         timestamptz,
  correct_count    integer not null default 0,
  error_count      integer not null default 0,
  help_count       integer not null default 0, -- ajudas externas (indicador de autonomia)
  notes            text
);

-- ----------------------------------------------------------------------------
-- 15. interaction_events — eventos de interação (clique, olhar, sopro, tecla…)
-- ----------------------------------------------------------------------------
create table public.interaction_events (
  id          bigint generated always as identity primary key,
  session_id  uuid not null references public.activity_sessions (id) on delete cascade,
  event_type  text not null, -- click | gaze | switch | blow | key | joystick | scan_select | dwell_select
  payload     jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);
create index interaction_events_session_idx
  on public.interaction_events (session_id, occurred_at);

-- ----------------------------------------------------------------------------
-- 16. gaze_calibrations — calibrações do rastreamento visual (sensível)
-- ----------------------------------------------------------------------------
create table public.gaze_calibrations (
  id           uuid primary key default gen_random_uuid(),
  student_id   uuid not null references public.students (id) on delete cascade,
  created_by   uuid references public.profiles (id),
  point_count  integer not null default 9,
  screen_width integer,
  screen_height integer,
  camera_label text,
  quality_score numeric,
  created_at   timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 17. gaze_samples — amostras NUMÉRICAS de calibração (sem fotos da face)
-- ----------------------------------------------------------------------------
create table public.gaze_samples (
  id             bigint generated always as identity primary key,
  calibration_id uuid not null references public.gaze_calibrations (id) on delete cascade,
  point_index    integer not null, -- 0..8 na calibração de 9 pontos
  features       jsonb not null,   -- apenas características numéricas (olhos, íris, cabeça)
  captured_at    timestamptz not null default now()
);
create index gaze_samples_calibration_idx
  on public.gaze_samples (calibration_id, point_index);

-- ----------------------------------------------------------------------------
-- 18. reports — relatórios gerados (sensível)
-- ----------------------------------------------------------------------------
create table public.reports (
  id           uuid primary key default gen_random_uuid(),
  student_id   uuid not null references public.students (id) on delete cascade,
  author_profile_id uuid references public.profiles (id),
  title        text not null,
  period_start date,
  period_end   date,
  content      jsonb not null default '{}'::jsonb, -- indicadores estruturados
  created_at   timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 19. ai_summaries — sumarizações geradas por IA (apoio, não decisão)
-- ----------------------------------------------------------------------------
create table public.ai_summaries (
  id         uuid primary key default gen_random_uuid(),
  report_id  uuid references public.reports (id) on delete cascade,
  session_id uuid references public.activity_sessions (id) on delete cascade,
  model      text not null,
  summary    text not null,
  reviewed_by_profile_id uuid references public.profiles (id), -- revisão humana
  created_at timestamptz not null default now(),
  check (report_id is not null or session_id is not null)
);

-- ----------------------------------------------------------------------------
-- 20. maker_requests — solicitações de adaptação/fabricação
-- ----------------------------------------------------------------------------
create table public.maker_requests (
  id                   uuid primary key default gen_random_uuid(),
  requester_profile_id uuid not null references public.profiles (id),
  student_id           uuid references public.students (id) on delete set null,
  device_id            uuid references public.assistive_devices (id) on delete set null,
  description          text not null,
  status               public.maker_request_status not null default 'received',
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 21. store_products — estrutura futura da loja social (sem pagamento real)
-- ----------------------------------------------------------------------------
create table public.store_products (
  id          uuid primary key default gen_random_uuid(),
  device_id   uuid not null references public.assistive_devices (id) on delete cascade,
  price_cents integer, -- preço de custo; null = a definir
  active      boolean not null default false, -- inativo até a loja existir
  created_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 22. orders — estrutura futura de pedidos (sem pagamento real)
-- ----------------------------------------------------------------------------
create table public.orders (
  id                 uuid primary key default gen_random_uuid(),
  buyer_profile_id   uuid not null references public.profiles (id),
  status             public.order_status not null default 'draft',
  items              jsonb not null default '[]'::jsonb, -- [{product_id, qty}]
  created_at         timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 23. consent_records — registros de consentimento informado
-- ----------------------------------------------------------------------------
create table public.consent_records (
  id                 uuid primary key default gen_random_uuid(),
  student_id         uuid not null references public.students (id) on delete cascade,
  granted_by_profile uuid not null references public.profiles (id),
  scope              text not null, -- gaze_calibration | activity_tracking | reports | research | photos
  granted_at         timestamptz not null default now(),
  revoked_at         timestamptz,
  details            text
);
create index consent_records_student_idx on public.consent_records (student_id, scope);

-- ----------------------------------------------------------------------------
-- 24. audit_logs — logs de auditoria e segurança
-- ----------------------------------------------------------------------------
create table public.audit_logs (
  id          bigint generated always as identity primary key,
  actor_profile_id uuid references public.profiles (id),
  action      text not null,  -- ex.: 'evaluation.read', 'gaze_calibration.delete'
  entity      text not null,
  entity_id   text,
  metadata    jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);
create index audit_logs_entity_idx on public.audit_logs (entity, entity_id);

-- ============================================================================
-- Row Level Security — negar por padrão, liberar o mínimo necessário
-- ============================================================================

-- Funções auxiliares -----------------------------------------------------------
create or replace function public.current_profile_id()
returns uuid
language sql stable security definer set search_path = public as $$
  select id from public.profiles where user_id = auth.uid();
$$;

create or replace function public.current_role()
returns public.user_role
language sql stable security definer set search_path = public as $$
  select role from public.profiles where user_id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(public.current_role() = 'admin', false);
$$;

-- Profissional (ou responsável) vinculado ao aluno?
create or replace function public.can_access_student(target_student uuid)
returns boolean
language sql stable security definer set search_path = public as $$
  select public.is_admin()
    or exists (
      select 1 from public.students s
      where s.id = target_student
        and (s.guardian_profile_id = public.current_profile_id()
          or s.created_by_profile = public.current_profile_id())
    )
    or exists (
      select 1 from public.professional_links pl
      where pl.student_id = target_student
        and pl.profile_id = public.current_profile_id()
        and pl.active
    );
$$;

-- Habilitar RLS em todas as tabelas --------------------------------------------
alter table public.profiles                 enable row level security;
alter table public.institutions             enable row level security;
alter table public.students                 enable row level security;
alter table public.professional_links       enable row level security;
alter table public.access_methods           enable row level security;
alter table public.evaluations              enable row level security;
alter table public.evaluation_access_tests  enable row level security;
alter table public.device_categories        enable row level security;
alter table public.assistive_devices        enable row level security;
alter table public.device_category_links    enable row level security;
alter table public.files                    enable row level security;
alter table public.device_files             enable row level security;
alter table public.device_recommendations   enable row level security;
alter table public.activity_modules         enable row level security;
alter table public.activity_sessions        enable row level security;
alter table public.interaction_events       enable row level security;
alter table public.gaze_calibrations        enable row level security;
alter table public.gaze_samples             enable row level security;
alter table public.reports                  enable row level security;
alter table public.ai_summaries             enable row level security;
alter table public.maker_requests           enable row level security;
alter table public.store_products           enable row level security;
alter table public.orders                   enable row level security;
alter table public.consent_records          enable row level security;
alter table public.audit_logs               enable row level security;

-- Catálogos públicos: leitura aberta, escrita só admin --------------------------
create policy "catalogo publico: leitura" on public.access_methods
  for select using (true);
create policy "catalogo publico: admin escreve" on public.access_methods
  for all using (public.is_admin()) with check (public.is_admin());

create policy "categorias: leitura" on public.device_categories
  for select using (true);
create policy "categorias: admin escreve" on public.device_categories
  for all using (public.is_admin()) with check (public.is_admin());

create policy "dispositivos: leitura de publicados" on public.assistive_devices
  for select using (published or public.is_admin());
create policy "dispositivos: admin escreve" on public.assistive_devices
  for all using (public.is_admin()) with check (public.is_admin());

create policy "device_category_links: leitura" on public.device_category_links
  for select using (true);
create policy "device_category_links: admin escreve" on public.device_category_links
  for all using (public.is_admin()) with check (public.is_admin());

create policy "modulos: leitura de publicados" on public.activity_modules
  for select using (published or public.is_admin());
create policy "modulos: admin escreve" on public.activity_modules
  for all using (public.is_admin()) with check (public.is_admin());

create policy "produtos: leitura de ativos" on public.store_products
  for select using (active or public.is_admin());
create policy "produtos: admin escreve" on public.store_products
  for all using (public.is_admin()) with check (public.is_admin());

-- Perfis ------------------------------------------------------------------------
create policy "perfil: dono le" on public.profiles
  for select using (user_id = auth.uid() or public.is_admin());
create policy "perfil: dono atualiza" on public.profiles
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "perfil: dono cria" on public.profiles
  for insert with check (user_id = auth.uid());
create policy "perfil: admin gerencia" on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());

-- Instituições -------------------------------------------------------------------
create policy "instituicoes: membros leem" on public.institutions
  for select using (
    public.is_admin()
    or exists (
      select 1 from public.professional_links pl
      where pl.institution_id = institutions.id
        and pl.profile_id = public.current_profile_id()
        and pl.active
    )
  );
create policy "instituicoes: admin escreve" on public.institutions
  for all using (public.is_admin()) with check (public.is_admin());

-- Vínculos profissionais -----------------------------------------------------------
create policy "vinculos: envolvidos leem" on public.professional_links
  for select using (
    profile_id = public.current_profile_id() or public.is_admin()
  );
create policy "vinculos: admin escreve" on public.professional_links
  for all using (public.is_admin()) with check (public.is_admin());

-- Alunos e dados sensíveis ---------------------------------------------------------
create policy "alunos: vinculados leem" on public.students
  for select using (public.can_access_student(id));
create policy "alunos: profissionais criam" on public.students
  for insert with check (
    public.current_role() in ('teacher', 'therapist', 'admin', 'institution')
    and created_by_profile = public.current_profile_id()
  );
create policy "alunos: vinculados atualizam" on public.students
  for update using (public.can_access_student(id))
  with check (public.can_access_student(id));

create policy "avaliacoes: vinculados leem" on public.evaluations
  for select using (public.can_access_student(student_id));
create policy "avaliacoes: avaliador cria" on public.evaluations
  for insert with check (
    evaluator_profile_id = public.current_profile_id()
    and public.can_access_student(student_id)
  );

create policy "testes de acesso: via avaliacao" on public.evaluation_access_tests
  for select using (
    exists (
      select 1 from public.evaluations e
      where e.id = evaluation_id and public.can_access_student(e.student_id)
    )
  );
create policy "testes de acesso: avaliador cria" on public.evaluation_access_tests
  for insert with check (
    exists (
      select 1 from public.evaluations e
      where e.id = evaluation_id
        and e.evaluator_profile_id = public.current_profile_id()
    )
  );

create policy "recomendacoes: vinculados leem" on public.device_recommendations
  for select using (public.can_access_student(student_id));
create policy "recomendacoes: profissional cria" on public.device_recommendations
  for insert with check (
    recommended_by_profile = public.current_profile_id()
    and public.can_access_student(student_id)
  );

create policy "sessoes: vinculados leem" on public.activity_sessions
  for select using (public.can_access_student(student_id));
create policy "sessoes: vinculados criam" on public.activity_sessions
  for insert with check (public.can_access_student(student_id));
create policy "sessoes: vinculados atualizam" on public.activity_sessions
  for update using (public.can_access_student(student_id))
  with check (public.can_access_student(student_id));

create policy "eventos: via sessao" on public.interaction_events
  for select using (
    exists (
      select 1 from public.activity_sessions s
      where s.id = session_id and public.can_access_student(s.student_id)
    )
  );
create policy "eventos: via sessao insert" on public.interaction_events
  for insert with check (
    exists (
      select 1 from public.activity_sessions s
      where s.id = session_id and public.can_access_student(s.student_id)
    )
  );

create policy "calibracoes: vinculados leem" on public.gaze_calibrations
  for select using (public.can_access_student(student_id));
create policy "calibracoes: vinculados criam" on public.gaze_calibrations
  for insert with check (public.can_access_student(student_id));
-- Direito de apagar dados de calibração (usuário/responsável/profissional vinculado)
create policy "calibracoes: vinculados apagam" on public.gaze_calibrations
  for delete using (public.can_access_student(student_id));

create policy "amostras: via calibracao" on public.gaze_samples
  for select using (
    exists (
      select 1 from public.gaze_calibrations c
      where c.id = calibration_id and public.can_access_student(c.student_id)
    )
  );
create policy "amostras: via calibracao insert" on public.gaze_samples
  for insert with check (
    exists (
      select 1 from public.gaze_calibrations c
      where c.id = calibration_id and public.can_access_student(c.student_id)
    )
  );
create policy "amostras: via calibracao delete" on public.gaze_samples
  for delete using (
    exists (
      select 1 from public.gaze_calibrations c
      where c.id = calibration_id and public.can_access_student(c.student_id)
    )
  );

create policy "relatorios: vinculados leem" on public.reports
  for select using (public.can_access_student(student_id));
create policy "relatorios: profissional cria" on public.reports
  for insert with check (
    author_profile_id = public.current_profile_id()
    and public.can_access_student(student_id)
  );

create policy "ai_summaries: via relatorio ou sessao" on public.ai_summaries
  for select using (
    (report_id is not null and exists (
      select 1 from public.reports r
      where r.id = report_id and public.can_access_student(r.student_id)
    ))
    or (session_id is not null and exists (
      select 1 from public.activity_sessions s
      where s.id = session_id and public.can_access_student(s.student_id)
    ))
  );

-- Maker, loja e arquivos -----------------------------------------------------------
create policy "maker_requests: solicitante le" on public.maker_requests
  for select using (
    requester_profile_id = public.current_profile_id()
    or public.current_role() = 'maker'
    or public.is_admin()
  );
create policy "maker_requests: usuario cria" on public.maker_requests
  for insert with check (requester_profile_id = public.current_profile_id());
create policy "maker_requests: maker atualiza" on public.maker_requests
  for update using (public.current_role() = 'maker' or public.is_admin())
  with check (public.current_role() = 'maker' or public.is_admin());

create policy "orders: comprador le" on public.orders
  for select using (
    buyer_profile_id = public.current_profile_id() or public.is_admin()
  );
create policy "orders: comprador cria" on public.orders
  for insert with check (buyer_profile_id = public.current_profile_id());

create policy "files: publicos ou dono" on public.files
  for select using (
    is_public
    or owner_profile_id = public.current_profile_id()
    or public.is_admin()
  );
create policy "files: dono cria" on public.files
  for insert with check (owner_profile_id = public.current_profile_id());

create policy "device_files: leitura segue arquivo" on public.device_files
  for select using (
    exists (
      select 1 from public.files f
      where f.id = file_id and (f.is_public or public.is_admin())
    )
  );
create policy "device_files: admin escreve" on public.device_files
  for all using (public.is_admin()) with check (public.is_admin());

-- Consentimento e auditoria ---------------------------------------------------------
create policy "consentimentos: vinculados leem" on public.consent_records
  for select using (public.can_access_student(student_id));
create policy "consentimentos: responsavel registra" on public.consent_records
  for insert with check (
    granted_by_profile = public.current_profile_id()
    and public.can_access_student(student_id)
  );
create policy "consentimentos: responsavel revoga" on public.consent_records
  for update using (granted_by_profile = public.current_profile_id())
  with check (granted_by_profile = public.current_profile_id());

-- audit_logs: apenas admin lê; escrita apenas via service role (server-only)
create policy "auditoria: admin le" on public.audit_logs
  for select using (public.is_admin());

-- ============================================================================
-- Dados iniciais (seeds mínimos de catálogo)
-- ============================================================================
insert into public.access_methods (slug, name, description) values
  ('olhar', 'Olhar', 'Seleção por zonas da tela com rastreamento visual'),
  ('toque', 'Toque', 'Telas sensíveis, teclados ampliados e superfícies capacitivas'),
  ('acionador', 'Acionador físico', 'Botões adaptados de diferentes tamanhos e sensibilidades'),
  ('sopro', 'Sopro', 'Sensores que transformam o sopro em comando'),
  ('cabeca', 'Inclinação da cabeça', 'Movimentos da cabeça controlam cursor ou opções'),
  ('joystick', 'Joystick', 'Joysticks adaptados com empunhadura ampla'),
  ('pedal', 'Pedal', 'Acionamento com os pés'),
  ('proximidade', 'Sensor de proximidade', 'Detecção de aproximação sem contato'),
  ('voz', 'Voz', 'Comandos de voz'),
  ('varredura', 'Varredura automática', 'Opções percorridas automaticamente com acionador único'),
  ('multimodal', 'Olhar + confirmação física', 'Combinação de olhar com botão, sopro ou toque');

insert into public.activity_modules (slug, name, description, published) values
  ('alfabetizacao', 'Alfabetização', 'Letras, sílabas e palavras com poucos comandos', false),
  ('matematica', 'Matemática', 'Números, quantidades e operações simples', false),
  ('portugues', 'Língua Portuguesa', 'Leitura, vocabulário e construção de frases', false),
  ('causa-efeito', 'Causa e Efeito', 'Jogos de resposta imediata ao acionamento', false),
  ('caa', 'Comunicação Alternativa', 'Pranchas, símbolos e frases rápidas', true),
  ('personalizada', 'Atividades Personalizadas', 'Conteúdo criado pelo profissional', false);
