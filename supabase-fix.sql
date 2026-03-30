-- =============================================
-- SUPABASE RLS FIX v2 - Guaranteed to work
-- Run this in Supabase SQL Editor
-- =============================================

-- STEP 1: Drop ALL existing admin policies (clean slate)
DROP POLICY IF EXISTS "Admin manage projects" ON projects;
DROP POLICY IF EXISTS "Admin full access projects" ON projects;
DROP POLICY IF EXISTS "Admin manage collections" ON shikai_collections;
DROP POLICY IF EXISTS "Admin full access shikai_collections" ON shikai_collections;
DROP POLICY IF EXISTS "Admin manage shikai images" ON shikai_images;
DROP POLICY IF EXISTS "Admin full access shikai_images" ON shikai_images;
DROP POLICY IF EXISTS "Admin manage experiences" ON experiences;
DROP POLICY IF EXISTS "Admin full access experiences" ON experiences;
DROP POLICY IF EXISTS "Admin manage certifications" ON certifications;
DROP POLICY IF EXISTS "Admin full access certifications" ON certifications;
DROP POLICY IF EXISTS "Admin manage references" ON references_list;
DROP POLICY IF EXISTS "Admin full access references" ON references_list;
DROP POLICY IF EXISTS "Admin manage stats" ON stats;
DROP POLICY IF EXISTS "Admin full access stats" ON stats;
DROP POLICY IF EXISTS "Admin manage story chapters" ON story_chapters;
DROP POLICY IF EXISTS "Admin manage tech stack" ON tech_stack;

-- STEP 2: Recreate admin policies using auth.uid() IS NOT NULL
-- This is more reliable than auth.role() = 'authenticated'
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

-- DONE! Now logged-in users can read, update, insert, delete ALL rows.
-- Public users can still only read visible rows (existing public policies).
