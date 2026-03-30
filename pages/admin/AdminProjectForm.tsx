import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import type { Project } from '../../types/database';

const AdminProjectForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);
  const [form, setForm] = useState({
    title: '', slug: '', category: 'web' as 'game' | 'mobile' | 'web',
    status: 'In Development', role: '', description: '', long_description: '',
    image_url: '', tags: '', platforms: '', genre: '', engine: '',
    mechanics: '', tech_stack: '', features: '', systems: '', roadmap: '',
    screenshots: '', links_live: '', links_github: '', links_demo: '',
    is_visible: false, is_featured: false,
  });

  useEffect(() => {
    if (!id) return;
    supabase.from('projects').select('*').eq('id', id).single().then(({ data }) => {
      if (data) {
        const p = data as unknown as Project;
        const links = (typeof p.links === 'object' && p.links !== null ? p.links : {}) as Record<string, string>;
        setForm({
          title: p.title, slug: p.slug, category: p.category,
          status: p.status || '', role: p.role || '',
          description: p.description || '', long_description: p.long_description || '',
          image_url: p.image_url || '', tags: (p.tags || []).join(', '),
          platforms: (p.platforms || []).join(', '), genre: p.genre || '',
          engine: p.engine || '', mechanics: (p.mechanics || []).join(', '),
          tech_stack: (p.tech_stack || []).join(', '),
          features: (p.features || []).join('\n'),
          systems: (p.systems || []).join('\n'),
          roadmap: (p.roadmap || []).join('\n'),
          screenshots: (p.screenshots || []).join('\n'),
          links_live: links.live || '', links_github: links.github || '',
          links_demo: links.demo || '',
          is_visible: p.is_visible, is_featured: p.is_featured,
        });
      }
      setInitialLoading(false);
    });
  }, [id]);

  const toArray = (s: string, sep = ',') => s ? s.split(sep).map(x => x.trim()).filter(Boolean) : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      title: form.title, slug: form.slug, category: form.category,
      status: form.status, role: form.role || null,
      description: form.description || null, long_description: form.long_description || null,
      image_url: form.image_url || null, tags: toArray(form.tags),
      platforms: toArray(form.platforms), genre: form.genre || null,
      engine: form.engine || null, mechanics: toArray(form.mechanics),
      tech_stack: toArray(form.tech_stack), features: toArray(form.features, '\n'),
      systems: toArray(form.systems, '\n'), roadmap: toArray(form.roadmap, '\n'),
      screenshots: toArray(form.screenshots, '\n'), gallery: [],
      links: JSON.parse(JSON.stringify({
        ...(form.links_live ? { live: form.links_live } : {}),
        ...(form.links_github ? { github: form.links_github } : {}),
        ...(form.links_demo ? { demo: form.links_demo } : {}),
      })),
      is_visible: form.is_visible, is_featured: form.is_featured,
      sort_order: 0,
    };

    let error;
    if (isEdit) {
      ({ error } = await (supabase.from('projects') as any).update(payload).eq('id', id));
    } else {
      ({ error } = await (supabase.from('projects') as any).insert([payload]));
    }
    setLoading(false);
    if (error) { alert('Error: ' + error.message); } else { navigate('/admin/projects'); }
  };

  const set = (field: string, value: any) => setForm(p => ({ ...p, [field]: value }));

  const inputCls = "w-full h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white text-sm focus:outline-none focus:border-primary transition-all";
  const textareaCls = "w-full bg-background-dark border border-border-dark rounded-xl p-4 text-white text-sm focus:outline-none focus:border-primary transition-all resize-none";
  const labelCls = "text-xs font-bold text-slate-400 uppercase tracking-widest ml-1";

  if (initialLoading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-full"></div></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/projects')} className="size-10 rounded-full bg-card-dark border border-border-dark flex items-center justify-center hover:border-primary transition-all group">
          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-transform group-hover:-translate-x-1">arrow_back</span>
        </button>
        <h1 className="text-3xl font-black font-display uppercase tracking-tight">{isEdit ? 'Edit Project' : 'New Project'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-card-dark border border-border-dark rounded-2xl p-8 space-y-5">
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">info</span> Basic Information
          </h2>
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1"><label className={labelCls}>Title</label><input value={form.title} onChange={e => { set('title', e.target.value); if (!isEdit && !form.slug) set('slug', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')); }} required className={inputCls} /></div>
            <div className="space-y-1"><label className={labelCls}>Slug (URL)</label><input value={form.slug} onChange={e => set('slug', e.target.value)} required className={inputCls + " font-mono"} /></div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="space-y-1">
              <label className={labelCls}>Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
                <option value="game">Game</option><option value="mobile">Mobile</option><option value="web">Web</option>
              </select>
            </div>
            <div className="space-y-1"><label className={labelCls}>Status</label><input value={form.status} onChange={e => set('status', e.target.value)} className={inputCls} placeholder="Released, In Development..." /></div>
            <div className="space-y-1"><label className={labelCls}>Role</label><input value={form.role} onChange={e => set('role', e.target.value)} className={inputCls} placeholder="Lead Developer & Designer" /></div>
          </div>
          <div className="space-y-1"><label className={labelCls}>Short Description</label><textarea value={form.description} onChange={e => set('description', e.target.value)} rows={2} className={textareaCls} /></div>
          <div className="space-y-1"><label className={labelCls}>Full Description</label><textarea value={form.long_description} onChange={e => set('long_description', e.target.value)} rows={4} className={textareaCls} /></div>
        </div>

        {/* Category-Specific Fields */}
        {form.category === 'game' && (
          <div className="bg-card-dark border border-amber-500/20 rounded-2xl p-8 space-y-5">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">sports_esports</span> Game-Specific
            </h2>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1"><label className={labelCls}>Engine</label><input value={form.engine} onChange={e => set('engine', e.target.value)} className={inputCls} placeholder="Unity, Unreal..." /></div>
              <div className="space-y-1"><label className={labelCls}>Genre</label><input value={form.genre} onChange={e => set('genre', e.target.value)} className={inputCls} placeholder="Puzzle, RPG, Platformer..." /></div>
            </div>
            <div className="space-y-1"><label className={labelCls}>Mechanics (comma separated)</label><input value={form.mechanics} onChange={e => set('mechanics', e.target.value)} className={inputCls} placeholder="Grid-based, Match-3, Strategic..." /></div>
            <div className="space-y-1"><label className={labelCls}>Systems (one per line)</label><textarea value={form.systems} onChange={e => set('systems', e.target.value)} rows={3} className={textareaCls} placeholder="Inventory System&#10;Level Procedural Generation&#10;Achievement Tracking" /></div>
          </div>
        )}

        {(form.category === 'mobile' || form.category === 'web') && (
          <div className="bg-card-dark border border-green-500/20 rounded-2xl p-8 space-y-5">
            <h2 className="text-sm font-bold text-green-400 uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">{form.category === 'mobile' ? 'smartphone' : 'web'}</span> {form.category === 'mobile' ? 'Mobile' : 'Web'}-Specific
            </h2>
            <div className="space-y-1"><label className={labelCls}>Tech Stack (comma separated)</label><input value={form.tech_stack} onChange={e => set('tech_stack', e.target.value)} className={inputCls} placeholder="React, TypeScript, Supabase..." /></div>
            <div className="space-y-1"><label className={labelCls}>Features (one per line)</label><textarea value={form.features} onChange={e => set('features', e.target.value)} rows={3} className={textareaCls} placeholder="User authentication&#10;Real-time sync&#10;Push notifications" /></div>
          </div>
        )}

        {/* Common Details */}
        <div className="bg-card-dark border border-border-dark rounded-2xl p-8 space-y-5">
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">tune</span> Details & Media
          </h2>
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1"><label className={labelCls}>Tags (comma separated)</label><input value={form.tags} onChange={e => set('tags', e.target.value)} className={inputCls} placeholder="Unity, C#, Mobile..." /></div>
            <div className="space-y-1"><label className={labelCls}>Platforms (comma separated)</label><input value={form.platforms} onChange={e => set('platforms', e.target.value)} className={inputCls} placeholder="Windows, Android, Web..." /></div>
          </div>
          <div className="space-y-1"><label className={labelCls}>Cover Image URL</label><input value={form.image_url} onChange={e => set('image_url', e.target.value)} className={inputCls} placeholder="/projects/game/cover.png" /></div>
          <div className="space-y-1"><label className={labelCls}>Screenshots (one URL per line)</label><textarea value={form.screenshots} onChange={e => set('screenshots', e.target.value)} rows={3} className={textareaCls} placeholder="/projects/game/ss-1.png&#10;/projects/game/ss-2.png" /></div>
          <div className="space-y-1"><label className={labelCls}>Roadmap (one item per line)</label><textarea value={form.roadmap} onChange={e => set('roadmap', e.target.value)} rows={3} className={textareaCls} /></div>
        </div>

        {/* Links */}
        <div className="bg-card-dark border border-border-dark rounded-2xl p-8 space-y-5">
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">link</span> Links
          </h2>
          <div className="grid grid-cols-3 gap-5">
            <div className="space-y-1"><label className={labelCls}>Live URL</label><input value={form.links_live} onChange={e => set('links_live', e.target.value)} className={inputCls} placeholder="https://..." /></div>
            <div className="space-y-1"><label className={labelCls}>GitHub</label><input value={form.links_github} onChange={e => set('links_github', e.target.value)} className={inputCls} placeholder="https://github.com/..." /></div>
            <div className="space-y-1"><label className={labelCls}>Demo / Store</label><input value={form.links_demo} onChange={e => set('links_demo', e.target.value)} className={inputCls} placeholder="https://..." /></div>
          </div>
        </div>

        {/* Visibility */}
        <div className="bg-card-dark border border-border-dark rounded-2xl p-8">
          <div className="flex items-center gap-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.is_visible} onChange={e => set('is_visible', e.target.checked)} className="sr-only peer" />
              <div className="relative w-11 h-6 bg-slate-700 peer-checked:bg-green-500 rounded-full transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-5"></div>
              <span className="text-sm font-bold text-slate-300">Publicly Visible</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={e => set('is_featured', e.target.checked)} className="sr-only peer" />
              <div className="relative w-11 h-6 bg-slate-700 peer-checked:bg-amber-500 rounded-full transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-5"></div>
              <span className="text-sm font-bold text-slate-300">Featured on Home</span>
            </label>
          </div>
        </div>

        <button disabled={loading} type="submit" className="w-full h-14 bg-primary hover:bg-blue-600 text-white font-bold text-lg rounded-xl transition-all shadow-glow flex items-center justify-center gap-2 disabled:opacity-50">
          {loading ? <span className="material-symbols-outlined animate-spin">refresh</span> : (isEdit ? 'Save Changes' : 'Create Project')}
        </button>
      </form>
    </div>
  );
};

export default AdminProjectForm;
