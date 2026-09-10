create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.admin_users where user_id = auth.uid());
$$;

create table public.site_settings (
  id uuid primary key default gen_random_uuid(), key text unique not null,
  value jsonb not null default '{}'::jsonb, is_public boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.media (
  id uuid primary key default gen_random_uuid(), storage_path text unique not null, public_url text,
  filename text not null, mime_type text, alt_text text, caption text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.homepage_sections (
  id uuid primary key default gen_random_uuid(), section_key text unique not null,
  eyebrow text, heading text, supporting_text text, media_id uuid references public.media(id) on delete set null,
  cta_primary_label text, cta_primary_url text, cta_primary_enabled boolean default true,
  cta_secondary_label text, cta_secondary_url text, cta_secondary_enabled boolean default true,
  settings jsonb not null default '{}'::jsonb, display_order integer not null default 0,
  is_published boolean not null default false, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.series (
  id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null,
  subtitle text, description text, hero_image_id uuid references public.media(id) on delete set null,
  artwork_id uuid references public.media(id) on delete set null, quote text, status text,
  display_order integer not null default 0, is_published boolean not null default false,
  archived_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.books (
  id uuid primary key default gen_random_uuid(), slug text unique not null, title text not null,
  series_id uuid references public.series(id) on delete set null, series_position integer,
  short_description text, synopsis text, long_description text, quote text,
  endorsement_quote text, endorsement_source text, release_date date, release_label text,
  publication_status text not null default 'Announced' check (publication_status in ('Released','Coming Soon','Announced','Unreleased')),
  isbn text, cover_media_id uuid references public.media(id) on delete set null,
  additional_artwork jsonb not null default '[]'::jsonb, trailer_url text,
  seo jsonb not null default '{}'::jsonb, display_order integer not null default 0,
  is_published boolean not null default false, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.book_purchase_links (
  id uuid primary key default gen_random_uuid(), book_id uuid not null references public.books(id) on delete cascade,
  label text not null, url text not null, display_order integer not null default 0, is_enabled boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.character_groups (
  id uuid primary key default gen_random_uuid(), name text not null, slug text unique,
  description text, image_id uuid references public.media(id) on delete set null, accent text,
  display_order integer not null default 0, is_published boolean not null default false, archived_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.characters (
  id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null,
  image_id uuid references public.media(id) on delete set null, short_description text, biography text,
  character_group_id uuid references public.character_groups(id) on delete set null,
  organisation text, rank_title text, nationality text, status text,
  first_appearance_book_id uuid references public.books(id) on delete set null,
  quote text, related_book_ids uuid[] default '{}', related_character_ids uuid[] default '{}',
  display_order integer not null default 0, is_published boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.news_categories (
  id uuid primary key default gen_random_uuid(), name text not null, slug text unique not null,
  display_order integer not null default 0, is_published boolean not null default true
);

create table public.news_articles (
  id uuid primary key default gen_random_uuid(), slug text unique not null, title text not null,
  hero_image_id uuid references public.media(id) on delete set null, summary text, body text,
  publication_date timestamptz, author text, category_id uuid references public.news_categories(id) on delete set null,
  tags text[] default '{}', is_featured boolean not null default false, seo jsonb not null default '{}'::jsonb,
  display_order integer not null default 0, is_published boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.product_categories (
  id uuid primary key default gen_random_uuid(), name text not null, slug text unique not null,
  display_order integer not null default 0, is_published boolean not null default true
);

create table public.products (
  id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null,
  subtitle text, description text, main_image_id uuid references public.media(id) on delete set null,
  price numeric(10,2), currency text default 'GBP',
  category_id uuid references public.product_categories(id) on delete set null, availability text,
  purchase_url text, display_order integer not null default 0, is_published boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(), product_id uuid not null references public.products(id) on delete cascade,
  media_id uuid not null references public.media(id) on delete cascade, display_order integer not null default 0
);

create table public.social_links (
  id uuid primary key default gen_random_uuid(), platform text not null, label text not null, url text not null,
  icon text, display_order integer not null default 0, is_enabled boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.cross_site_links (
  id uuid primary key default gen_random_uuid(), site_name text not null, label text not null,
  promotion_text text, destination_url text not null, icon text, is_enabled boolean not null default true,
  open_in_new_tab boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
create policy "admins read own grant" on public.admin_users for select using (user_id = auth.uid());

alter table public.site_settings enable row level security;
alter table public.homepage_sections enable row level security;
alter table public.series enable row level security;
alter table public.books enable row level security;
alter table public.book_purchase_links enable row level security;
alter table public.character_groups enable row level security;
alter table public.characters enable row level security;
alter table public.news_categories enable row level security;
alter table public.news_articles enable row level security;
alter table public.product_categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.social_links enable row level security;
alter table public.cross_site_links enable row level security;
alter table public.media enable row level security;

create policy "public settings read" on public.site_settings for select using (is_public);
create policy "public homepage read" on public.homepage_sections for select using (is_published);
create policy "public series read" on public.series for select using (is_published and archived_at is null);
create policy "public books read" on public.books for select using (is_published);
create policy "public purchase links read" on public.book_purchase_links for select using (is_enabled);
create policy "public character groups read" on public.character_groups for select using (is_published and archived_at is null);
create policy "public characters read" on public.characters for select using (is_published);
create policy "public news categories read" on public.news_categories for select using (is_published);
create policy "public articles read" on public.news_articles for select using (is_published and publication_date <= now());
create policy "public product categories read" on public.product_categories for select using (is_published);
create policy "public products read" on public.products for select using (is_published);
create policy "public product images read" on public.product_images for select using (true);
create policy "public socials read" on public.social_links for select using (is_enabled);
create policy "public cross links read" on public.cross_site_links for select using (is_enabled);
create policy "public media table read" on public.media for select using (true);

create policy "admin settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());
create policy "admin homepage" on public.homepage_sections for all using (public.is_admin()) with check (public.is_admin());
create policy "admin series" on public.series for all using (public.is_admin()) with check (public.is_admin());
create policy "admin books" on public.books for all using (public.is_admin()) with check (public.is_admin());
create policy "admin purchase links" on public.book_purchase_links for all using (public.is_admin()) with check (public.is_admin());
create policy "admin character groups" on public.character_groups for all using (public.is_admin()) with check (public.is_admin());
create policy "admin characters" on public.characters for all using (public.is_admin()) with check (public.is_admin());
create policy "admin news categories" on public.news_categories for all using (public.is_admin()) with check (public.is_admin());
create policy "admin articles" on public.news_articles for all using (public.is_admin()) with check (public.is_admin());
create policy "admin product categories" on public.product_categories for all using (public.is_admin()) with check (public.is_admin());
create policy "admin products" on public.products for all using (public.is_admin()) with check (public.is_admin());
create policy "admin product images" on public.product_images for all using (public.is_admin()) with check (public.is_admin());
create policy "admin socials" on public.social_links for all using (public.is_admin()) with check (public.is_admin());
create policy "admin cross links" on public.cross_site_links for all using (public.is_admin()) with check (public.is_admin());
create policy "admin media table" on public.media for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict (id) do nothing;
create policy "public media read" on storage.objects for select using (bucket_id = 'media');
create policy "admin media insert" on storage.objects for insert with check (bucket_id = 'media' and public.is_admin());
create policy "admin media update" on storage.objects for update using (bucket_id = 'media' and public.is_admin());
create policy "admin media delete" on storage.objects for delete using (bucket_id = 'media' and public.is_admin());

create trigger set_site_settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at();
create trigger set_homepage_updated_at before update on public.homepage_sections for each row execute function public.set_updated_at();
create trigger set_series_updated_at before update on public.series for each row execute function public.set_updated_at();
create trigger set_books_updated_at before update on public.books for each row execute function public.set_updated_at();
create trigger set_purchase_updated_at before update on public.book_purchase_links for each row execute function public.set_updated_at();
create trigger set_groups_updated_at before update on public.character_groups for each row execute function public.set_updated_at();
create trigger set_characters_updated_at before update on public.characters for each row execute function public.set_updated_at();
create trigger set_articles_updated_at before update on public.news_articles for each row execute function public.set_updated_at();
create trigger set_products_updated_at before update on public.products for each row execute function public.set_updated_at();
create trigger set_socials_updated_at before update on public.social_links for each row execute function public.set_updated_at();
create trigger set_cross_updated_at before update on public.cross_site_links for each row execute function public.set_updated_at();
create trigger set_media_updated_at before update on public.media for each row execute function public.set_updated_at();

-- Grant the first administrator after creating an Auth user:
-- insert into public.admin_users (user_id, display_name) values ('AUTH-USER-UUID', 'Site administrator');
