-- =============================================
-- RUN THIS IN SUPABASE SQL EDITOR
-- This adds the missing admin policies and new tables
-- =============================================

-- 1. CREATE NEW TABLES (skip if already exists)
CREATE TABLE IF NOT EXISTS story_chapters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  years TEXT NOT NULL,
  icon TEXT,
  content TEXT NOT NULL,
  achievement TEXT,
  achievement_icon TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS tech_stack (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'code',
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- 2. ENABLE RLS ON NEW TABLES
ALTER TABLE story_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stack ENABLE ROW LEVEL SECURITY;

-- 3. PUBLIC READ POLICIES (new tables)
CREATE POLICY "Public read story chapters" ON story_chapters FOR SELECT USING (true);
CREATE POLICY "Public read visible tech stack" ON tech_stack FOR SELECT USING (is_visible = true);

-- 4. ADMIN FULL ACCESS (new tables)
CREATE POLICY "Admin manage story chapters" ON story_chapters FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage tech stack" ON tech_stack FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- 5. FIX: Ensure admin policies exist for ALL existing tables
-- These use CREATE OR REPLACE pattern (drop + create if duplicated)
-- =============================================

-- Projects
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin full access projects') THEN
    CREATE POLICY "Admin full access projects" ON projects FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

-- Experiences
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin full access experiences') THEN
    CREATE POLICY "Admin full access experiences" ON experiences FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

-- Certifications
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin full access certifications') THEN
    CREATE POLICY "Admin full access certifications" ON certifications FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

-- References
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin full access references') THEN
    CREATE POLICY "Admin full access references" ON references_list FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

-- Stats
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin full access stats') THEN
    CREATE POLICY "Admin full access stats" ON stats FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

-- Shikai Collections
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin full access shikai_collections') THEN
    CREATE POLICY "Admin full access shikai_collections" ON shikai_collections FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

-- Shikai Images
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin full access shikai_images') THEN
    CREATE POLICY "Admin full access shikai_images" ON shikai_images FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

-- =============================================
-- DONE! After running this:
-- - Visibility toggles will work (admin sees ALL rows)
-- - New tables will be ready for admin CRUD
-- - All admin operations will have proper RLS access
-- =============================================
