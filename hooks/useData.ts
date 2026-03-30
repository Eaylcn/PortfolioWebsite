import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Experience, Certification, Reference, Stat } from '../types/database';

const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 5 * 60 * 1000;

function useCachedQuery<T>(key: string, table: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = cache[key];
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setData(cached.data);
      setLoading(false);
      return;
    }

    supabase
      .from(table)
      .select('*')
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
  return useCachedQuery<Experience>('experiences', 'experiences');
}

export function useCertifications() {
  return useCachedQuery<Certification>('certifications', 'certifications');
}

export function useReferences() {
  return useCachedQuery<Reference>('references', 'references_list');
}

export function useStats() {
  return useCachedQuery<Stat>('stats', 'stats');
}
