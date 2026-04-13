-- Supabase Setup for Trackflow Panel
-- Run this SQL in the Supabase SQL Editor

-- Create shipments table
create table if not exists shipments (
  id uuid default gen_random_uuid() primary key,
  tracking_number text not null unique,
  origin text not null,
  destination text not null,
  status text check (status in ('pending','in_transit','delivered','failed')) default 'pending',
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create profiles table
create table if not exists profiles (
  id uuid references auth.users(id) primary key,
  full_name text,
  role text check (role in ('admin','user')) default 'user',
  avatar_url text,
  company text,
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table shipments enable row level security;
alter table profiles enable row level security;

-- RLS Policies for shipments
-- Users see only their own shipments
create policy "users_own_shipments" on shipments
  for all using (auth.uid() = created_by);

-- Admins see all shipments
create policy "admins_all_shipments" on shipments
  for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- RLS Policies for profiles
-- Everyone reads their own profile
create policy "own_profile" on profiles
  for all using (auth.uid() = id);

-- Seed test data
insert into shipments (tracking_number, origin, destination, status) values
  ('TF-00421', 'Riga', 'Berlin', 'in_transit'),
  ('TF-00418', 'Tallinn', 'Warsaw', 'delivered'),
  ('TF-00415', 'Vilnius', 'Prague', 'pending'),
  ('TF-00412', 'Helsinki', 'Vienna', 'delivered'),
  ('TF-00409', 'Minsk', 'Budapest', 'failed')
on conflict (tracking_number) do nothing;

-- Create a function to handle new user profile creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', COALESCE(new.raw_user_meta_data->>'role', 'user'));
  return new;
end;
$$ language plpgsql security definer;

-- Trigger on new auth user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
