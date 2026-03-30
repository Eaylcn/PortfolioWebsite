import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Experience, Certification, Reference, Stat, StoryChapter, TechStackItem } from '../types/database';

const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 5 * 60 * 1000;

function useCachedQuery<T>(key: string, table: string, filterVisible?: boolean) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = cache[key];
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setData(cached.data);
      setLoading(false);
      return;
    }

    let query = supabase
      .from(table)
      .select('*');
    
    if (filterVisible) {
      query = query.eq('is_visible', true);
    }
    
    query
      .order('sort_order', { ascending: true })
      .then(({ data: result }) => {
        setData((result as T[]) || []);
        cache[key] = { data: result || [], timestamp: Date.now() };
        setLoading(false);
      });
  }, [key, table]);

  return { data, loading };
}

export function useExperiences() {
  return useCachedQuery<Experience>('experiences', 'experiences', true);
}

export function useCertifications() {
  return useCachedQuery<Certification>('certifications', 'certifications', true);
}

export function useReferences() {
  return useCachedQuery<Reference>('references_list', 'references_list', true);
}

export function useStats() {
  return useCachedQuery<Stat>('stats', 'stats');
}

export function useStoryChapters() {
  return useCachedQuery<StoryChapter>('story_chapters', 'story_chapters');
}

export function useTechStack() {
  return useCachedQuery<TechStackItem>('tech_stack', 'tech_stack', true);
}
