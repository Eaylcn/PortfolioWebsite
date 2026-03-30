-- =============================================
-- SUPABASE RLS FIX v3 - Drop ALL known names first
-- Run this in Supabase SQL Editor
-- =============================================

-- STEP 1: Drop ALL existing policies for each table (every possible name)
-- This ensures a clean slate regardless of which version was run before

-- projects
DROP POLICY IF EXISTS "Admin manage projects" ON projects;
DROP POLICY IF EXISTS "Admin full access projects" ON projects;
DROP POLICY IF EXISTS "Admin full access" ON projects;
DROP POLICY IF EXISTS "Public read visible projects" ON projects;

-- shikai_collections
DROP POLICY IF EXISTS "Admin manage collections" ON shikai_collections;
DROP POLICY IF EXISTS "Admin full access shikai_collections" ON shikai_collections;
DROP POLICY IF EXISTS "Admin full access" ON shikai_collections;
DROP POLICY IF EXISTS "Public read visible collections" ON shikai_collections;

-- shikai_images
DROP POLICY IF EXISTS "Admin manage shikai images" ON shikai_images;
DROP POLICY IF EXISTS "Admin full access shikai_images" ON shikai_images;
DROP POLICY IF EXISTS "Admin full access" ON shikai_images;
DROP POLICY IF EXISTS "Public read shikai images" ON shikai_images;

-- experiences
DROP POLICY IF EXISTS "Admin manage experiences" ON experiences;
DROP POLICY IF EXISTS "Admin full access experiences" ON experiences;
DROP POLICY IF EXISTS "Admin full access" ON experiences;
DROP POLICY IF EXISTS "Public read visible experiences" ON experiences;

-- certifications
DROP POLICY IF EXISTS "Admin manage certifications" ON certifications;
DROP POLICY IF EXISTS "Admin full access certifications" ON certifications;
DROP POLICY IF EXISTS "Admin full access" ON certifications;
DROP POLICY IF EXISTS "Public read visible certifications" ON certifications;

-- references_list
DROP POLICY IF EXISTS "Admin manage references" ON references_list;
DROP POLICY IF EXISTS "Admin full access references" ON references_list;
DROP POLICY IF EXISTS "Admin full access" ON references_list;
DROP POLICY IF EXISTS "Public read visible references" ON references_list;

-- stats
DROP POLICY IF EXISTS "Admin manage stats" ON stats;
DROP POLICY IF EXISTS "Admin full access stats" ON stats;
DROP POLICY IF EXISTS "Admin full access" ON stats;
DROP POLICY IF EXISTS "Public read stats" ON stats;

-- story_chapters
DROP POLICY IF EXISTS "Admin manage story chapters" ON story_chapters;
DROP POLICY IF EXISTS "Admin full access story chapters" ON story_chapters;
DROP POLICY IF EXISTS "Admin full access" ON story_chapters;
DROP POLICY IF EXISTS "Public read story chapters" ON story_chapters;

-- tech_stack
DROP POLICY IF EXISTS "Admin manage tech stack" ON tech_stack;
DROP POLICY IF EXISTS "Admin full access tech stack" ON tech_stack;
DROP POLICY IF EXISTS "Admin full access" ON tech_stack;
DROP POLICY IF EXISTS "Public read visible tech stack" ON tech_stack;


-- STEP 2: Recreate PUBLIC read policies (anon users see only visible items)
CREATE POLICY "Public read visible" ON projects FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read visible" ON shikai_collections FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read visible" ON shikai_images FOR SELECT USING (true);
CREATE POLICY "Public read visible" ON experiences FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read visible" ON certifications FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read visible" ON references_list FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read visible" ON stats FOR SELECT USING (true);
CREATE POLICY "Public read visible" ON story_chapters FOR SELECT USING (true);
CREATE POLICY "Public read visible" ON tech_stack FOR SELECT USING (is_visible = true);


-- STEP 3: Recreate ADMIN full access policies (logged-in users can do everything)
-- Using auth.uid() IS NOT NULL which is more reliable than auth.role()
CREATE POLICY "Admin full access" ON projects FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access" ON shikai_collections FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access" ON shikai_images FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access" ON experiences FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access" ON certifications FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access" ON references_list FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access" ON stats FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access" ON story_chapters FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access" ON tech_stack FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);


-- DONE! 
-- Public visitors: can only READ visible=true rows
-- Logged-in admin: can SELECT/INSERT/UPDATE/DELETE ALL rows (including invisible ones)
