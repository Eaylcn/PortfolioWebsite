-- =============================================
-- RUN THIS IN SUPABASE SQL EDITOR
-- Safe to re-run: uses IF NOT EXISTS everywhere
-- =============================================

-- 1. Create tables (skip if already exist)
CREATE TABLE IF NOT EXISTS story_chapters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL, subtitle TEXT, years TEXT NOT NULL,
  icon TEXT, content TEXT NOT NULL, achievement TEXT,
  achievement_icon TEXT, sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS tech_stack (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL, category TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'code',
  is_visible BOOLEAN DEFAULT true, sort_order INTEGER DEFAULT 0
);

-- 2. Enable RLS
ALTER TABLE story_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stack ENABLE ROW LEVEL SECURITY;

-- 3. Add ALL policies safely (IF NOT EXISTS)
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read story chapters' AND tablename = 'story_chapters') THEN CREATE POLICY "Public read story chapters" ON story_chapters FOR SELECT USING (true); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read visible tech stack' AND tablename = 'tech_stack') THEN CREATE POLICY "Public read visible tech stack" ON tech_stack FOR SELECT USING (is_visible = true); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin manage story chapters' AND tablename = 'story_chapters') THEN CREATE POLICY "Admin manage story chapters" ON story_chapters FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated'); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin manage tech stack' AND tablename = 'tech_stack') THEN CREATE POLICY "Admin manage tech stack" ON tech_stack FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated'); END IF; END $$;

-- 4. Admin full access for existing tables
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin full access projects') THEN CREATE POLICY "Admin full access projects" ON projects FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated'); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin full access experiences') THEN CREATE POLICY "Admin full access experiences" ON experiences FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated'); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin full access certifications') THEN CREATE POLICY "Admin full access certifications" ON certifications FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated'); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin full access references') THEN CREATE POLICY "Admin full access references" ON references_list FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated'); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin full access stats') THEN CREATE POLICY "Admin full access stats" ON stats FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated'); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin full access shikai_collections') THEN CREATE POLICY "Admin full access shikai_collections" ON shikai_collections FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated'); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin full access shikai_images') THEN CREATE POLICY "Admin full access shikai_images" ON shikai_images FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated'); END IF; END $$;

-- DONE!
