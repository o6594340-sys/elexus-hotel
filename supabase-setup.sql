-- Run this in Supabase SQL Editor

create table if not exists requests (
  id         uuid default gen_random_uuid() primary key,
  hotel_id   text not null default 'elexus',
  room       text not null default '314',
  type       text not null,
  detail     text not null default 'Quick request',
  status     text not null default 'new' check (status in ('new', 'in_progress', 'done')),
  created_at timestamptz default now()
);

-- Enable realtime
alter publication supabase_realtime add table requests;

-- RLS (open for MVP demo)
alter table requests enable row level security;

create policy "Anyone can insert" on requests for insert with check (true);
create policy "Anyone can read"   on requests for select using (true);
create policy "Anyone can update" on requests for update using (true);
