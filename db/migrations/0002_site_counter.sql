-- Contador de acessos do site (exibido discretamente no rodapé).
-- Aplicado em produção via DATABASE_URL. Idempotente.

create table if not exists public.site_counters (
  key text primary key,
  count bigint not null default 0
);

insert into public.site_counters (key, count)
values ('visits', 0)
on conflict (key) do nothing;

-- Incremento atômico: usado pela rota /api/visitas (service role).
create or replace function public.increment_counter(counter_key text)
returns bigint
language sql
security definer
set search_path = public
as $$
  insert into public.site_counters (key, count) values (counter_key, 1)
  on conflict (key) do update set count = site_counters.count + 1
  returning count;
$$;

-- RLS habilitado sem policies públicas: a tabela só é acessada pelo
-- service role no servidor (a rota /api/visitas), nunca pelo navegador.
alter table public.site_counters enable row level security;
