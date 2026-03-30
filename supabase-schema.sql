-- ============================================
-- THE GRAND ARCHIVE — Database Schema
-- Run this in Supabase SQL Editor (supabase.com → SQL Editor)
-- ============================================

-- 1. PROJECTS (games, mobile, web — tek tabloda)
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('game', 'mobile', 'web')),
  status TEXT NOT NULL DEFAULT 'In Development',
  role TEXT,
  description TEXT,
  long_description TEXT,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  platforms TEXT[] DEFAULT '{}',
  genre TEXT,
  engine TEXT,
  mechanics TEXT[] DEFAULT '{}',
  tech_stack TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  systems TEXT[] DEFAULT '{}',
  roadmap TEXT[] DEFAULT '{}',
  screenshots TEXT[] DEFAULT '{}',
  gallery TEXT[] DEFAULT '{}',
  links JSONB DEFAULT '{}',
  is_visible BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. SHIKAI COLLECTIONS
CREATE TABLE shikai_collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  series TEXT,
  freq TEXT,
  lore TEXT,
  folder TEXT,
  is_new BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. SHIKAI IMAGES
CREATE TABLE shikai_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID REFERENCES shikai_collections(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  prompt TEXT,
  sort_order INTEGER DEFAULT 0
);

-- 4. EXPERIENCES
CREATE TABLE experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT[] DEFAULT '{}',
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- 5. CERTIFICATIONS
CREATE TABLE certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  icon TEXT,
  rarity TEXT,
  url TEXT,
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- 6. REFERENCES (named references_list to avoid PG reserved word)
CREATE TABLE references_list (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  text TEXT,
  avatar_url TEXT,
  linkedin TEXT,
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- 7. STATS
CREATE TABLE stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  value INTEGER NOT NULL DEFAULT 0,
  icon TEXT,
  description TEXT,
  color TEXT,
  sort_order INTEGER DEFAULT 0
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- Public: read visible rows
-- Authenticated: full CRUD
-- ============================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE shikai_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE shikai_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE references_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- Public read policies (anon users can only see visible items)
CREATE POLICY "Public read visible projects" ON projects FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read visible collections" ON shikai_collections FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read shikai images" ON shikai_images FOR SELECT USING (true);
CREATE POLICY "Public read visible experiences" ON experiences FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read visible certifications" ON certifications FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read visible references" ON references_list FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read stats" ON stats FOR SELECT USING (true);

-- Admin full access policies (authenticated users)
CREATE POLICY "Admin manage projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage collections" ON shikai_collections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage shikai images" ON shikai_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage experiences" ON experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage certifications" ON certifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage references" ON references_list FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage stats" ON stats FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- AUTO-UPDATE updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- STORAGE BUCKETS (run manually in Supabase Dashboard → Storage)
-- 1. Create bucket: "project-images" (public)
-- 2. Create bucket: "shikai-images" (public)
-- 3. Create bucket: "profile-assets" (public)
-- ============================================
