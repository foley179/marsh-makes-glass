-- Run this once in the Supabase dashboard: Project -> SQL Editor -> New query -> paste -> Run.
-- Creates the products table, locks it to public read-only access, and seeds
-- it with the two real products that currently exist (the JSON file had
-- these duplicated several times as placeholder/pagination test data - only
-- the unique ones are seeded here).

create table if not exists products (
  id text primary key,
  name text not null,
  category text[] not null default '{}',
  price numeric(10, 2) not null,
  dimensions text,
  brief_description text,
  full_description text,
  thumbnail_url text,
  image_urls text[] not null default '{}'
);

alter table products enable row level security;

create policy "Public read access"
  on products for select
  using (true);

-- Upload the images to a public "product-images" storage bucket first
-- (Storage -> New bucket -> name it product-images -> Public bucket), then
-- replace the placeholder image_urls/thumbnail_url below with the real
-- Supabase Storage URLs before running this insert.
insert into products (id, name, category, price, dimensions, brief_description, full_description, thumbnail_url, image_urls)
values
  (
    'shark-01',
    'Shark with Background',
    array['wildlife', 'underwater'],
    30.00,
    '25cm x 15cm',
    'A sleek shark suspended over deep blues.',
    'This hand-cut stained glass piece captures a shark gliding through layered blues and teals, each panel leaded individually to catch the light like moving water. Designed to hang in a window where natural light can pass through the glass.',
    'REPLACE_WITH_STORAGE_URL/shark-01/thumb.jpeg',
    array['REPLACE_WITH_STORAGE_URL/shark-01/full-1.jpeg', 'REPLACE_WITH_STORAGE_URL/shark-01/full-2.jpeg']
  ),
  (
    'bee-01',
    'Bee',
    array['wildlife', 'insect'],
    20.00,
    '19cm x 20cm',
    'A busy bee among blooming flowers.',
    'This hand-cut stained glass piece features a detailed bee, each pane individually leaded to create a stunning play of light and shadow. Perfect for hanging in a sunny window to bring a touch of nature indoors.',
    'REPLACE_WITH_STORAGE_URL/bee-01/thumb.jpeg',
    array['REPLACE_WITH_STORAGE_URL/bee-01/full-1.jpeg']
  )
on conflict (id) do nothing;
