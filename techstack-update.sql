-- =============================================
-- TECH STACK UPDATE — Add PM & AI Tools
-- Run this in Supabase SQL Editor
-- =============================================

-- Add PM & AI tools (keeping existing QA tools)
INSERT INTO tech_stack (name, category, icon, is_visible, sort_order) VALUES
-- AI & Agentic Coding
('Generative AI', 'AI & ML', 'psychology', true, 1),
('Agentic Coding', 'AI & ML', 'smart_toy', true, 2),
('Claude AI', 'AI Tools', 'cognition', true, 3),
('Gemini AI', 'AI Tools', 'auto_awesome', true, 4),

-- PM Skills
('Product Roadmapping', 'PM', 'route', true, 5),
('KPI Analysis', 'PM', 'analytics', true, 6),
('User Research', 'PM', 'person_search', true, 7),
('A/B Testing', 'PM', 'science', true, 8),

-- Dev Tools (if not already in DB)
('Next.js', 'Frontend', 'web', true, 9),
('Supabase', 'Backend', 'database', true, 10),
('TypeScript', 'Language', 'code', true, 11),
('React', 'Frontend', 'deployed_code', true, 12),
('Figma', 'Design', 'palette', true, 13)

-- NOTE: If any of these already exist, you'll get a duplicate error.
-- In that case, just remove the duplicate lines and re-run.

ON CONFLICT DO NOTHING;
-- If your tech_stack table doesn't have a UNIQUE constraint on name,
-- just remove the ON CONFLICT line and manually check for duplicates.

-- DONE! PM & AI tools added to tech stack.
