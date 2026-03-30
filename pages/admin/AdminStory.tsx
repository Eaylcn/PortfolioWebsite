import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { StoryChapter } from '../../types/database';

const AdminStory: React.FC = () => {
  const [chapters, setChapters] = useState<StoryChapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '', subtitle: '', years: '', icon: 'school', content: '',
    achievement: '', achievement_icon: 'star',
  });

  const fetchChapters = async () => {
    setLoading(true);
    const { data } = await supabase.from('story_chapters').select('*').order('sort_order', { ascending: true });
    setChapters((data as unknown as StoryChapter[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchChapters(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await (supabase.from('story_chapters') as any).update({
        title: form.title, subtitle: form.subtitle, years: form.years,
        icon: form.icon, content: form.content,
        achievement: form.achievement, achievement_icon: form.achievement_icon,
      }).eq('id', editingId);
    } else {
      await (supabase.from('story_chapters') as any).insert([{
        ...form, sort_order: chapters.length + 1,
      }]);
    }
    resetForm();
    fetchChapters();
  };

  const resetForm = () => {
    setForm({ title: '', subtitle: '', years: '', icon: 'school', content: '', achievement: '', achievement_icon: 'star' });
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (ch: StoryChapter) => {
    setEditingId(ch.id);
    setForm({
      title: ch.title, subtitle: ch.subtitle || '', years: ch.years,
      icon: ch.icon || 'school', content: ch.content,
      achievement: ch.achievement || '', achievement_icon: ch.achievement_icon || 'star',
    });
    setShowForm(true);
  };

  const deleteChapter = async (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"?`)) {
      await (supabase.from('story_chapters') as any).delete().eq('id', id);
      fetchChapters();
    }
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
          <h1 className="text-3xl font-black font-display uppercase tracking-tight">Story Chapters</h1>
          <p className="text-slate-400 mt-1">Manage your timeline chapters on the Story page.</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); if (showForm) resetForm(); }}
          className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-glow hover:shadow-glow-hover flex items-center gap-2"
        >
          <span className="material-symbols-outlined">{showForm ? 'close' : 'add'}</span>
          {showForm ? 'Cancel' : 'Add Chapter'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="bg-card-dark border border-primary/30 rounded-2xl p-8 space-y-4">
          <h3 className="text-lg font-bold text-white font-display uppercase">{editingId ? 'Edit Chapter' : 'New Chapter'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Title (e.g. The Origin)" required className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary" />
            <input value={form.subtitle} onChange={e => setForm(p => ({ ...p, subtitle: e.target.value }))} placeholder="Subtitle (e.g. Where Curiosity Began)" className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary" />
            <input value={form.years} onChange={e => setForm(p => ({ ...p, years: e.target.value }))} placeholder="Years (e.g. 2010 — 2014)" required className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary" />
            <input value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))} placeholder="Material Icon (e.g. school)" className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary" />
            <input value={form.achievement} onChange={e => setForm(p => ({ ...p, achievement: e.target.value }))} placeholder="Achievement badge text" className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary" />
            <input value={form.achievement_icon} onChange={e => setForm(p => ({ ...p, achievement_icon: e.target.value }))} placeholder="Achievement icon (e.g. star)" className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary" />
          </div>
          <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} placeholder="Chapter content..." required rows={4} className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary resize-none" />
          <button type="submit" className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold transition-all">
            {editingId ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {chapters.map((ch, idx) => (
          <div key={ch.id} className="bg-card-dark border border-border-dark rounded-2xl p-6 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-2xl">{ch.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs text-slate-500 font-bold">Ch.{idx + 1}</span>
                    <h3 className="font-bold text-white text-lg">{ch.title}</h3>
                    <span className="text-xs text-primary font-mono">{ch.years}</span>
                  </div>
                  <p className="text-sm text-slate-400 italic">{ch.subtitle}</p>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">{ch.content}</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(ch)} className="size-8 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center" title="Edit">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button onClick={() => deleteChapter(ch.id, ch.title)} className="size-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center" title="Delete">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {chapters.length === 0 && (
        <div className="p-16 text-center text-slate-500 bg-card-dark border border-border-dark rounded-2xl">
          <span className="material-symbols-outlined text-5xl mb-4 block">auto_stories</span>
          No chapters found. Add your first story chapter, or they'll use the default fallback data.
        </div>
      )}
    </div>
  );
};

export default AdminStory;
