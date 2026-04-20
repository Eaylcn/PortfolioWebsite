-- =============================================
-- FEATURED PROJECTS UPDATE
-- Make Tuty and Zoo Merge featured on Skills page
-- Run this in Supabase SQL Editor
-- =============================================

UPDATE projects SET is_featured = true WHERE slug = 'tuty';
UPDATE projects SET is_featured = true WHERE slug = 'zoo-merge';

-- lance-web is already featured (set during insert)
-- Verify:
-- SELECT slug, title, is_featured FROM projects WHERE is_featured = true;

-- DONE!
