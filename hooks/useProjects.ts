import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Project } from '../types/database';

// Simple in-memory cache
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes

function getCached<T>(key: string): T | null {
  const entry = cache[key];
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data as T;
  }
  return null;
}

function setCache(key: string, data: any) {
  cache[key] = { data, timestamp: Date.now() };
}

// Clear all project caches (called after admin updates)
export function clearProjectCache() {
  Object.keys(cache).forEach(key => delete cache[key]);
}

// Fetch all visible projects by category
export function useProjects(category?: 'game' | 'mobile' | 'web') {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cacheKey = `projects-${category || 'all'}`;
    const cached = getCached<Project[]>(cacheKey);
    if (cached) {
      setProjects(cached);
      setLoading(false);
      return;
    }

    let query = supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    query.then(({ data, error: err }) => {
      if (err) {
        setError(err.message);
      } else {
        setProjects(data || []);
        setCache(cacheKey, data || []);
      }
      setLoading(false);
    });
  }, [category]);

  return { projects, loading, error };
}

// Fetch featured projects (for Home page)
export function useFeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = getCached<Project[]>('projects-featured');
    if (cached) {
      setProjects(cached);
      setLoading(false);
      return;
    }

    supabase
      .from('projects')
      .select('*')
      .eq('is_featured', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setProjects(data || []);
        setCache('projects-featured', data || []);
        setLoading(false);
      });
  }, []);

  return { projects, loading };
}

// Fetch single project by slug
export function useProject(slug: string | undefined) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const cacheKey = `project-${slug}`;
    const cached = getCached<Project>(cacheKey);
    if (cached) {
      setProject(cached);
      setLoading(false);
      return;
    }

    supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data, error: err }) => {
        if (err) {
          setError(err.message);
        } else {
          setProject(data);
          setCache(cacheKey, data);
        }
        setLoading(false);
      });
  }, [slug]);

  return { project, loading, error };
}
