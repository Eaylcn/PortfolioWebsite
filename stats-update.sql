-- =============================================
-- PM-FOCUSED STATS UPDATE
-- Run this in Supabase SQL Editor
-- =============================================

DELETE FROM stats;

INSERT INTO stats (name, value, icon, description, color, sort_order) VALUES
('Product Strategy', 90, 'strategy', 'Roadmap planning, prioritization, and user needs analysis.', '#10b981', 1),
('User-Centric Thinking', 88, 'psychology', 'Deep user empathy built from years of QA — finding problems before users do.', '#f59e0b', 2),
('Technical Execution', 85, 'code', 'Full-stack development, Generative AI integration, and agentic coding.', '#135bec', 3),
('Game Industry Knowledge', 87, 'sports_esports', 'Game design, economy systems, and player behavior analysis.', '#8b5cf6', 4);

-- DONE! Stats are now PM-focused.
