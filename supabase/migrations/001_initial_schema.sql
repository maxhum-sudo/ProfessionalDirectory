-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Profiles table
create table profiles (
  id                uuid primary key references auth.users(id) on delete cascade,
  email             text unique not null,
  name              text not null,
  headline          text not null check (char_length(headline) <= 100),
  avatar_url        text,
  role              text not null,
  domains           text[] not null default '{}',
  offering          text not null check (char_length(offering) <= 280),
  seeking           text not null check (char_length(seeking) <= 280),
  contact_link      text not null,
  in_directory      boolean not null default true,
  survey_completed  boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at();

-- RLS
alter table profiles enable row level security;

-- Any authenticated user can read profiles in the directory
create policy "members can read directory profiles"
  on profiles for select
  to authenticated
  using (in_directory = true and survey_completed = true);

-- Users can always read their own profile (even if not in directory)
create policy "users can read own profile"
  on profiles for select
  to authenticated
  using (id = auth.uid());

-- Users can insert their own profile
create policy "users can insert own profile"
  on profiles for insert
  to authenticated
  with check (id = auth.uid());

-- Users can update only their own profile
create policy "users can update own profile"
  on profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- Storage bucket for avatars
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);

-- Anyone authenticated can upload to their own avatar path
create policy "users can upload own avatar"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'avatars' and
    name = auth.uid()::text || '.jpg'
  );

-- Anyone can read avatars (they are public)
create policy "avatars are publicly readable"
  on storage.objects for select
  using (bucket_id = 'avatars');

-- Users can update their own avatar
create policy "users can update own avatar"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'avatars' and
    name = auth.uid()::text || '.jpg'
  );
