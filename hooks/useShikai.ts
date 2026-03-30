import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { ShikaiCollection, ShikaiImage } from '../types/database';

export interface ShikaiCollectionWithImages extends ShikaiCollection {
  images: ShikaiImage[];
}

const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 5 * 60 * 1000;

export function useShikaiCollections() {
  const [collections, setCollections] = useState<ShikaiCollectionWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = cache['shikai-all'];
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setCollections(cached.data);
      setLoading(false);
      return;
    }

    async function fetchData() {
      const { data: cols, error: colErr } = await supabase
        .from('shikai_collections')
        .select('*')
        .eq('is_visible', true)
        .order('sort_order', { ascending: false });

      if (colErr) {
        setError(colErr.message);
        setLoading(false);
        return;
      }

      const { data: imgs } = await supabase
        .from('shikai_images')
        .select('*')
        .order('sort_order', { ascending: true });

      const collectionsData = (cols as unknown as ShikaiCollection[]) || [];
      const imagesData = (imgs as unknown as ShikaiImage[]) || [];

      const withImages: ShikaiCollectionWithImages[] = collectionsData.map(col => ({
        ...col,
        images: imagesData.filter(img => img.collection_id === col.id),
      }));

      setCollections(withImages);
      cache['shikai-all'] = { data: withImages, timestamp: Date.now() };
      setLoading(false);
    }

    fetchData();
  }, []);

  return { collections, loading, error };
}
