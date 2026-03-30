import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { ShikaiCollection, ShikaiImage } from '../../types/database';

const AdminShikai: React.FC = () => {
  const [collections, setCollections] = useState<(ShikaiCollection & { images: ShikaiImage[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', series: '', freq: '', lore: '', folder: '' });

  const fetchData = async () => {
    setLoading(true);
    const { data: cols } = await supabase.from('shikai_collections').select('*').order('sort_order', { ascending: false });
    const { data: imgs } = await supabase.from('shikai_images').select('*').order('sort_order', { ascending: true });

    const collectionsData = (cols as unknown as ShikaiCollection[]) || [];
    const imagesData = (imgs as unknown as ShikaiImage[]) || [];

    const withImages = collectionsData.map(col => ({
      ...col,
      images: imagesData.filter(img => img.collection_id === col.id),
    }));

    setCollections(withImages);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const toggleVisibility = async (id: string, currentVisibility: boolean) => {
    await (supabase.from('shikai_collections') as any).update({ is_visible: !currentVisibility }).eq('id', id);
    fetchData();
  };

  const deleteCollection = async (id: string, title: string) => {
    if (window.confirm(`Delete "${title}" and all its images? This cannot be undone.`)) {
      await (supabase.from('shikai_collections') as any).delete().eq('id', id);
      fetchData();
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await (supabase.from('shikai_collections') as any).insert([{
      ...formData,
      is_visible: true,
      is_new: true,
      sort_order: collections.length,
    }]);
    setFormData({ title: '', series: '', freq: '', lore: '', folder: '' });
    setShowForm(false);
    fetchData();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-display uppercase tracking-tight">Shikai Forge</h1>
          <p className="text-slate-400 mt-1">{collections.length} collections deployed across the multiverse.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-glow hover:shadow-glow-hover flex items-center gap-2"
        >
          <span className="material-symbols-outlined">{showForm ? 'close' : 'add'}</span>
          {showForm ? 'Cancel' : 'New Collection'}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <form onSubmit={handleCreate} className="bg-card-dark border border-primary/30 rounded-2xl p-8 space-y-4">
          <h3 className="text-lg font-bold text-white font-display uppercase">Deploy New Collection</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} placeholder="Collection Title" required className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary transition-all" />
            <input name="series" value={formData.series} onChange={e => setFormData(p => ({ ...p, series: e.target.value }))} placeholder="Series (optional)" className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary transition-all" />
            <input name="freq" value={formData.freq} onChange={e => setFormData(p => ({ ...p, freq: e.target.value }))} placeholder="Frequency (e.g. 33.3Hz)" className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary transition-all" />
            <input name="folder" value={formData.folder} onChange={e => setFormData(p => ({ ...p, folder: e.target.value }))} placeholder="Folder path" className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary transition-all" />
          </div>
          <textarea name="lore" value={formData.lore} onChange={e => setFormData(p => ({ ...p, lore: e.target.value }))} placeholder="Collection lore..." rows={3} className="w-full bg-background-dark border border-border-dark rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-all resize-none" />
          <button type="submit" className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold transition-all">Deploy Collection</button>
        </form>
      )}

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map(col => (
          <div key={col.id} className="bg-card-dark border border-border-dark rounded-2xl overflow-hidden hover:border-primary/50 transition-colors group">
            {/* Preview */}
            <div className="aspect-video bg-background-dark relative overflow-hidden">
              {col.images.length > 0 ? (
                <img src={col.images[0].file_url} alt={col.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600">
                  <span className="material-symbols-outlined text-5xl">image_not_supported</span>
                </div>
              )}
              <div className="absolute top-3 right-3 flex gap-2">
                {col.is_new && <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[9px] font-black rounded-full border border-green-500/30 uppercase">New</span>}
                <span className="px-2 py-0.5 bg-black/50 text-white/70 text-[9px] font-bold rounded-full backdrop-blur-sm">{col.images.length} imgs</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-white text-lg">{col.title}</h3>
                  {col.freq && <p className="text-xs text-primary font-mono">{col.freq}</p>}
                </div>
                <button
                  onClick={() => toggleVisibility(col.id, col.is_visible)}
                  className={`shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${col.is_visible ? 'bg-green-500' : 'bg-slate-700'}`}
                >
                  <span className={`inline-block size-4 transform rounded-full bg-white transition-transform ${col.is_visible ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              {col.lore && <p className="text-xs text-slate-500 line-clamp-2 italic">{col.lore}</p>}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => deleteCollection(col.id, col.title)}
                  className="size-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center"
                  title="Delete"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {collections.length === 0 && (
        <div className="p-16 text-center text-slate-500 bg-card-dark border border-border-dark rounded-2xl">
          <span className="material-symbols-outlined text-5xl mb-4 block">image_not_supported</span>
          No collections found. Deploy your first Shikai realm.
        </div>
      )}
    </div>
  );
};

export default AdminShikai;
