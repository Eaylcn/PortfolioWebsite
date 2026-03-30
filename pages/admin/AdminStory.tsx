import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { StoryChapter } from '../../types/database';

const DEFAULT_CHAPTERS = [
  { title: "The Origin", subtitle: "Where Curiosity Began", years: "2010 — 2014", icon: "child_care", content: "While many developers started their journey just playing games, mine started by trying to break them. In elementary school, I used tools like Cheat Engine to modify variables in Facebook games. I wanted to understand the mechanism underneath. This curiosity led me to GameMaker Studio in 4th grade, where I created my first top-down fighting game.", achievement: "First Game Created", achievement_icon: "sports_esports", sort_order: 1 },
  { title: "The Training", subtitle: "Forging the Foundation", years: "2015 — 2021", icon: "school", content: "I pursued a Software Engineering degree at Bahcesehir University. During these years, I delved deep into programming fundamentals, algorithms, and software architecture. The academic foundation combined with personal projects shaped my understanding of how complex systems work together.", achievement: "Software Engineering Degree", achievement_icon: "workspace_premium", sort_order: 2 },
  { title: "The QA Chapter", subtitle: "The Secret Weapon", years: "2021 — 2024", icon: "bug_report", content: "My career path led me to Quality Assurance first. I worked as a QA Automation Engineer at companies like Huawei and IBTECH. Although my heart was always in game development, my time in QA became my secret weapon. It taught me how to dissect a problem, foresee potential bugs, and understand the user experience deeply.", achievement: "QA Mastery Achieved", achievement_icon: "verified", sort_order: 3 },
  { title: "The Turning Point", subtitle: "Crisis Into Opportunity", years: "2024", icon: "local_fire_department", content: "I was accepted into a Master's program at Northeastern University, but due to financial difficulties, I had to cancel my enrollment. Instead of letting this stop me, I turned this crisis into a creative opportunity. I focused fully on building my own projects to prove my skills.", achievement: "Resilience Built", achievement_icon: "diamond", sort_order: 4 },
  { title: "The Builder", subtitle: "Building the Legacy", years: "2024 — Present", icon: "construction", content: "I built eaylcn.com, a portfolio with an AI assistant I coded myself. I created Droid Shikai, a Generative AI art universe. I'm developing Tuty, a mobile app for makeup tracking, handling Developer, QA Lead, and Product Owner roles. I also create 3D models in Blender and 2D pixel art in Aseprite.", achievement: "Multi-Project Launch", achievement_icon: "rocket_launch", sort_order: 5 },
];

const AdminStory: React.FC = () => {
  const [chapters, setChapters] = useState<StoryChapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
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

  const seedDefaults = async () => {
    setSeeding(true);
    await (supabase.from('story_chapters') as any).insert(DEFAULT_CHAPTERS);
    await fetchChapters();
    setSeeding(false);
  };

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
    return <div className="flex justify-center items-center h-64"><div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-full"></div></div>;
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-display uppercase tracking-tight">Story Chapters</h1>
          <p className="text-slate-400 mt-1">Manage your timeline chapters on the Story page.</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); if (showForm) resetForm(); }} className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-glow hover:shadow-glow-hover flex items-center gap-2">
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
            <input value={form.achievement} onChange={e => setForm(p => ({ ...p, achievement: e.target.value }))} placeholder="Achievement badge" className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary" />
            <input value={form.achievement_icon} onChange={e => setForm(p => ({ ...p, achievement_icon: e.target.value }))} placeholder="Achievement icon" className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary" />
          </div>
          <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} placeholder="Chapter content..." required rows={4} className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary resize-none" />
          <button type="submit" className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold transition-all">{editingId ? 'Update' : 'Create'}</button>
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
        <div className="p-16 text-center bg-card-dark border border-border-dark rounded-2xl space-y-4">
          <span className="material-symbols-outlined text-5xl text-slate-500 block">auto_stories</span>
          <p className="text-slate-400">No chapters in the database. The public site shows fallback data.</p>
          <button onClick={seedDefaults} disabled={seeding} className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 mx-auto disabled:opacity-50">
            <span className="material-symbols-outlined">{seeding ? 'refresh' : 'download'}</span>
            {seeding ? 'Seeding...' : 'Seed Default Chapters'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminStory;
