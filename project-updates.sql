-- ============================================
-- PROJECT UPDATES: Tuty (UPDATE) + Lance Web (INSERT)
-- Run this in Supabase SQL Editor
-- ============================================

-- ============ TUTY — FULL UPDATE ============
UPDATE projects SET
  status = 'Beta',
  role = 'Founder & Solo Developer',
  image_url = '/projects/mobile/Tuty.png',
  description = 'An AI-powered beauty product tracker that helps users manage their cosmetics inventory, track expiration dates and get personalized skincare & makeup recommendations from Lily, a smart beauty assistant.',
  long_description = E'Tuty was born from a simple frustration: keeping track of beauty products, their expiry dates, how much is left and what to buy next is a problem every beauty enthusiast faces but no app truly solves. Tuty bridges this gap with an intelligent product management system combined with an AI-powered beauty assistant called Lily.\n\nDesigned for beauty enthusiasts and skincare-conscious users of all ages, Tuty lets you scan product barcodes for instant recognition, track usage and expiration dates with smart alerts and consult Lily across 8 specialized AI modes, from building personalized skincare routines and travel beauty kits to finding your perfect perfume match. The app is built with Flutter and follows a clean, feature-based architecture powered by Riverpod for state management, Cloud Firestore for real-time sync and a custom Express.js backend on Google Cloud Run that proxies AI requests. Localized in 10 languages and designed with an offline-first philosophy, Tuty is being developed end-to-end using Agentic Coding, where AI acts as a true pair-programming partner throughout the entire product lifecycle. The vision is to evolve Lily into a full-fledged personal beauty advisor that learns your preferences, adapts to your skin and proactively helps you make smarter beauty decisions.',
  tags = ARRAY['Flutter', 'Firebase', 'AI', 'Beauty-Tech'],
  tech_stack = ARRAY['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Firebase Storage', 'Firebase Analytics', 'Firebase Crashlytics', 'Firebase Messaging', 'Riverpod', 'GoRouter', 'Google Cloud Run', 'Express.js', 'TypeScript', 'DeepSeek AI', 'RevenueCat', 'Google Mobile Ads', 'Mobile Scanner (Barcode)', 'Lottie Animations', 'Google Fonts', 'Cached Network Image', 'Flutter Markdown', 'Connectivity Plus', 'SharedPreferences', 'Flutter Local Notifications', 'App Tracking Transparency', 'In-App Review'],
  features = ARRAY['Barcode scanning for automatic product detection and details autofill', 'Smart expiration date tracking with configurable push notification alerts', 'AI-powered beauty assistant (Lily) with 8 specialized chat modes', 'Personalized skincare routine builder with saveable plans', 'Travel beauty kit planner tailored to your destination and climate', 'AI perfume finder matching your scent preferences', 'Product usage & depletion prediction based on frequency and quantity', 'Wishlist management with priority ranking and price tracking', 'Daily skincare missions & usage streak gamification', 'Dark / Light mode with full 10-language localization'],
  systems = ARRAY['Clean Architecture with feature-based modular structure (data / domain / presentation per feature)', 'State management via Riverpod with provider-per-feature pattern', 'Offline-first hybrid image system with local file priority and cloud URL fallback', 'Custom Express.js backend on Cloud Run with Firebase Auth middleware and rate limiting', 'Adaptive product depletion algorithm with per-category UPA (Usage Per Application) values', 'Custom JSON-based localization system supporting 10 languages with dot-notation keys', 'Freemium monetization architecture with RevenueCat subscriptions and Google AdMob'],
  roadmap = ARRAY['Photo-based AI skin analysis mode (capture & analyze skin condition)', 'AI-powered product ingredient analysis and compatibility warnings', 'Social sharing: share your beauty bag and routines with friends', 'Smart shopping list auto-generated from depleted & wishlisted products', 'Community features: product reviews and recommendations from other users', 'Lily memory: persistent user preference learning across sessions'],
  screenshots = ARRAY['/projects/mobile/Tuty-1.png', '/projects/mobile/Tuty-2.png', '/projects/mobile/Tuty-3.png', '/projects/mobile/Tuty-4.png', '/projects/mobile/Tuty-5.png', '/projects/mobile/Tuty-6.png', '/projects/mobile/Tuty-7.png', '/projects/mobile/Tuty-8.png'],
  links = '{}',
  updated_at = now()
WHERE slug = 'tuty';

-- ============ LANCE WEB — NEW INSERT ============
-- First delete if exists (safe re-run)
DELETE FROM projects WHERE slug = 'lance-web';

INSERT INTO projects (
  slug, title, category, status, role, description, long_description,
  tags, image_url, platforms, tech_stack, features, systems, roadmap,
  screenshots, links, is_featured, is_visible, sort_order
) VALUES (
  'lance-web',
  'Lance Web',
  'web',
  'Live',
  'Founder & Full-Stack Developer',
  'An AI-powered professional development platform for Gaming Product Managers, featuring structured game analysis, AI mentorship via Claude, interview simulation and career growth tracking across 16+ interconnected modules.',
  E'Lance was born from a real need: as an aspiring Gaming PM, there was no structured tool to practice mobile game analysis, get expert-level feedback and track professional growth all in one place. Instead of scattered spreadsheets and notes, Lance provides a comprehensive digital workspace where PM candidates can dissect games across 50+ analytical dimensions, receive AI-powered mentorship from Claude, simulate real interview scenarios and watch their skills evolve over time.\n\nBuilt entirely with Agentic Coding (AI-assisted development using Claude as a pair-programming partner), the platform runs on Next.js 16 with App Router, Supabase for authentication and PostgreSQL database, and Anthropic''s Claude API for all AI features. The architecture follows a modular, sprint-driven approach with 16 database tables, 27+ API endpoints and ~103 React components organized into clean domain boundaries. The UI, crafted with Tailwind CSS v4 and shadcn/ui, delivers a premium dark/light experience inspired by Notion''s clarity and Spotify''s modern aesthetics. Full Turkish/English internationalization ensures accessibility. The AI-powered GDD (Game Design Document) Creator, the platform''s crown jewel, uses a 7-phase conversational wizard with real-time split-view preview to transform raw game ideas into professional design documents. Every feature feeds into a unified PM Growth system that tracks skill progression from Beginner to Lead PM level.',
  ARRAY['Next.js', 'AI-Powered', 'Full-Stack', 'SaaS'],
  '/projects/web/Lance-1.png',
  ARRAY['Web'],
  ARRAY['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'shadcn/ui', 'Supabase', 'PostgreSQL', 'Drizzle ORM', 'Anthropic Claude API', 'TanStack React Query', 'next-intl', 'next-themes', 'Recharts', 'Zod', 'Lucide React', 'jsPDF', 'html2canvas', 'cmdk', 'react-markdown', 'Vercel'],
  ARRAY['Structured game analysis across 8 categories with 50+ fields and AI Draft Fill', 'AI Mentor powered by Claude with executive summary, category scores, strengths/weaknesses and PM coaching', 'AI-powered GDD Creator with 7-phase conversational wizard and real-time split-view preview', 'Interview simulation with 7 PM topics, multi-turn AI conversations and final scoring', 'Daily PM challenges with AI evaluation and streak tracking system', 'Side-by-side game comparison with AI-generated competitive analysis', 'PM Growth dashboard with skill radar chart, level progression and trend analysis', 'KPI Metrics toolkit with education, interactive calculator, genre benchmarks and AI insights', 'Full internationalization (Turkish & English) with dark/light theme toggle', 'PDF and Markdown export for analyses and Game Design Documents'],
  ARRAY['Next.js 16 App Router with layout-based auth guards and i18n routing', 'Supabase Auth (Google + GitHub OAuth) with Row Level Security for data isolation', 'Drizzle ORM schema with 16 PostgreSQL tables and JSONB for complex nested data', 'Modular AI architecture with 8 specialized prompt files and domain-specific system prompts', 'TanStack React Query for server state management with 13 custom hooks', 'Middleware chain: session refresh, locale detection, auth redirect, cookie sync', 'Component-driven architecture with ~103 components across 17 domain groups'],
  ARRAY['Public survey system with 28-question multi-page wizard and AI-generated insights', 'Interactive PM Guide with case studies, framework deep-dives and glossary', 'Freemium model with Stripe integration and usage-based gating', 'CSV/PDF bulk export for game library and portfolio', 'Performance optimization and Vercel Edge Function migration', 'Mobile-responsive PWA version for on-the-go game analysis'],
  ARRAY['/projects/web/Lance-1.png', '/projects/web/Lance-2.png', '/projects/web/Lance-3.png', '/projects/web/Lance-4.png', '/projects/web/Lance-5.png', '/projects/web/Lance-6.png', '/projects/web/Lance-7.png', '/projects/web/Lance-8.png'],
  '{"github":"https://github.com/Eaylcn/lancePMTool"}',
  true,
  true,
  12
);
