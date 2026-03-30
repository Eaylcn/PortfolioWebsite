import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Experience, Certification, Reference } from '../../types/database';

type Tab = 'experience' | 'certifications' | 'references';

const AdminExperience: React.FC = () => {
  const [tab, setTab] = useState<Tab>('experience');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);

  // Experience form
  const [showExpForm, setShowExpForm] = useState(false);
  const [expForm, setExpForm] = useState({ title: '', company: '', period: '', description: '' });

  // Cert form
  const [showCertForm, setShowCertForm] = useState(false);
  const [certForm, setCertForm] = useState({ title: '', issuer: '', icon: '', rarity: '', url: '' });

  // Ref form
  const [showRefForm, setShowRefForm] = useState(false);
  const [refForm, setRefForm] = useState({ name: '', role: '', text: '', avatar_url: '', linkedin: '' });

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: exp }, { data: cert }, { data: ref }] = await Promise.all([
      supabase.from('experiences').select('*').order('sort_order'),
      supabase.from('certifications').select('*').order('sort_order'),
      supabase.from('references_list').select('*').order('sort_order'),
    ]);
    setExperiences((exp as unknown as Experience[]) || []);
    setCertifications((cert as unknown as Certification[]) || []);
    setReferences((ref as unknown as Reference[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const deleteItem = async (table: string, id: string, name: string) => {
    if (window.confirm(`Delete "${name}"?`)) {
      await (supabase.from(table) as any).delete().eq('id', id);
      fetchAll();
    }
  };

  const createExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    const descArray = expForm.description.split('\n').filter(Boolean);
    await (supabase.from('experiences') as any).insert([{
      title: expForm.title, company: expForm.company, period: expForm.period,
      description: descArray, is_visible: true, sort_order: experiences.length + 1,
    }]);
    setExpForm({ title: '', company: '', period: '', description: '' });
    setShowExpForm(false);
    fetchAll();
  };

  const createCert = async (e: React.FormEvent) => {
    e.preventDefault();
    await (supabase.from('certifications') as any).insert([{
      title: certForm.title, issuer: certForm.issuer, icon: certForm.icon || null,
      rarity: certForm.rarity || null, url: certForm.url || null,
      is_visible: true, sort_order: certifications.length + 1,
    }]);
    setCertForm({ title: '', issuer: '', icon: '', rarity: '', url: '' });
    setShowCertForm(false);
    fetchAll();
  };

  const createRef = async (e: React.FormEvent) => {
    e.preventDefault();
    await (supabase.from('references_list') as any).insert([{
      name: refForm.name, role: refForm.role || null, text: refForm.text || null,
      avatar_url: refForm.avatar_url || null, linkedin: refForm.linkedin || null,
      is_visible: true, sort_order: references.length + 1,
    }]);
    setRefForm({ name: '', role: '', text: '', avatar_url: '', linkedin: '' });
    setShowRefForm(false);
    fetchAll();
  };

  const tabs: { key: Tab; label: string; icon: string; count: number }[] = [
    { key: 'experience', label: 'Experience', icon: 'work', count: experiences.length },
    { key: 'certifications', label: 'Certifications', icon: 'verified', count: certifications.length },
    { key: 'references', label: 'References', icon: 'groups', count: references.length },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h1 className="text-3xl font-black font-display uppercase tracking-tight">Campaign History</h1>

      {/* Tab Bar */}
      <div className="flex gap-2 bg-card-dark border border-border-dark rounded-2xl p-2">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
              tab === t.key
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
            {t.label}
            <span className="px-2 py-0.5 bg-white/5 rounded-md text-[10px]">{t.count}</span>
          </button>
        ))}
      </div>

      {/* === EXPERIENCE TAB === */}
      {tab === 'experience' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => setShowExpForm(!showExpForm)} className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">
              <span className="material-symbols-outlined text-[18px]">{showExpForm ? 'close' : 'add'}</span>
              {showExpForm ? 'Cancel' : 'Add Experience'}
            </button>
          </div>
          {showExpForm && (
            <form onSubmit={createExperience} className="bg-card-dark border border-primary/30 rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input value={expForm.title} onChange={e => setExpForm(p => ({ ...p, title: e.target.value }))} placeholder="Job Title" required className="h-11 bg-background-dark border border-border-dark rounded-xl px-4 text-white text-sm focus:outline-none focus:border-primary transition-all" />
                <input value={expForm.company} onChange={e => setExpForm(p => ({ ...p, company: e.target.value }))} placeholder="Company" required className="h-11 bg-background-dark border border-border-dark rounded-xl px-4 text-white text-sm focus:outline-none focus:border-primary transition-all" />
                <input value={expForm.period} onChange={e => setExpForm(p => ({ ...p, period: e.target.value }))} placeholder="Period (e.g. 2023 – 2024)" required className="h-11 bg-background-dark border border-border-dark rounded-xl px-4 text-white text-sm focus:outline-none focus:border-primary transition-all" />
              </div>
              <textarea value={expForm.description} onChange={e => setExpForm(p => ({ ...p, description: e.target.value }))} placeholder="Description (one bullet per line)" rows={4} className="w-full bg-background-dark border border-border-dark rounded-xl p-4 text-white text-sm focus:outline-none focus:border-primary transition-all resize-none" />
              <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm">Save</button>
            </form>
          )}
          {experiences.map(exp => (
            <div key={exp.id} className="bg-card-dark border border-border-dark rounded-2xl p-6 flex items-start justify-between gap-4 hover:border-primary/30 transition-colors">
              <div className="space-y-1 flex-1">
                <h3 className="font-bold text-white">{exp.title}</h3>
                <p className="text-primary text-sm font-bold">{exp.company} <span className="text-slate-500 font-normal">• {exp.period}</span></p>
                <ul className="mt-2 space-y-1">
                  {exp.description.map((d, i) => (
                    <li key={i} className="text-xs text-slate-400 flex gap-2"><span className="text-primary mt-0.5">•</span>{d}</li>
                  ))}
                </ul>
              </div>
              <button onClick={() => deleteItem('experiences', exp.id, exp.title)} className="size-8 shrink-0 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* === CERTIFICATIONS TAB === */}
      {tab === 'certifications' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => setShowCertForm(!showCertForm)} className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">
              <span className="material-symbols-outlined text-[18px]">{showCertForm ? 'close' : 'add'}</span>
              {showCertForm ? 'Cancel' : 'Add Certification'}
            </button>
          </div>
          {showCertForm && (
            <form onSubmit={createCert} className="bg-card-dark border border-primary/30 rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input value={certForm.title} onChange={e => setCertForm(p => ({ ...p, title: e.target.value }))} placeholder="Certificate Title" required className="h-11 bg-background-dark border border-border-dark rounded-xl px-4 text-white text-sm focus:outline-none focus:border-primary transition-all" />
                <input value={certForm.issuer} onChange={e => setCertForm(p => ({ ...p, issuer: e.target.value }))} placeholder="Issuer" required className="h-11 bg-background-dark border border-border-dark rounded-xl px-4 text-white text-sm focus:outline-none focus:border-primary transition-all" />
                <input value={certForm.rarity} onChange={e => setCertForm(p => ({ ...p, rarity: e.target.value }))} placeholder="Rarity (Legendary, Epic...)" className="h-11 bg-background-dark border border-border-dark rounded-xl px-4 text-white text-sm focus:outline-none focus:border-primary transition-all" />
                <input value={certForm.url} onChange={e => setCertForm(p => ({ ...p, url: e.target.value }))} placeholder="Certificate URL" className="h-11 bg-background-dark border border-border-dark rounded-xl px-4 text-white text-sm focus:outline-none focus:border-primary transition-all" />
              </div>
              <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm">Save</button>
            </form>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map(cert => (
              <div key={cert.id} className="bg-card-dark border border-border-dark rounded-2xl p-5 flex items-center justify-between gap-4 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">{cert.icon || 'verified'}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{cert.title}</h3>
                    <p className="text-xs text-slate-400">{cert.issuer}</p>
                    {cert.rarity && <span className="text-[9px] text-amber-400 font-bold uppercase tracking-widest">{cert.rarity}</span>}
                  </div>
                </div>
                <button onClick={() => deleteItem('certifications', cert.id, cert.title)} className="size-8 shrink-0 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === REFERENCES TAB === */}
      {tab === 'references' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => setShowRefForm(!showRefForm)} className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">
              <span className="material-symbols-outlined text-[18px]">{showRefForm ? 'close' : 'add'}</span>
              {showRefForm ? 'Cancel' : 'Add Reference'}
            </button>
          </div>
          {showRefForm && (
            <form onSubmit={createRef} className="bg-card-dark border border-primary/30 rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input value={refForm.name} onChange={e => setRefForm(p => ({ ...p, name: e.target.value }))} placeholder="Name" required className="h-11 bg-background-dark border border-border-dark rounded-xl px-4 text-white text-sm focus:outline-none focus:border-primary transition-all" />
                <input value={refForm.role} onChange={e => setRefForm(p => ({ ...p, role: e.target.value }))} placeholder="Role / Title" className="h-11 bg-background-dark border border-border-dark rounded-xl px-4 text-white text-sm focus:outline-none focus:border-primary transition-all" />
                <input value={refForm.linkedin} onChange={e => setRefForm(p => ({ ...p, linkedin: e.target.value }))} placeholder="LinkedIn URL" className="h-11 bg-background-dark border border-border-dark rounded-xl px-4 text-white text-sm focus:outline-none focus:border-primary transition-all" />
                <input value={refForm.avatar_url} onChange={e => setRefForm(p => ({ ...p, avatar_url: e.target.value }))} placeholder="Avatar URL" className="h-11 bg-background-dark border border-border-dark rounded-xl px-4 text-white text-sm focus:outline-none focus:border-primary transition-all" />
              </div>
              <textarea value={refForm.text} onChange={e => setRefForm(p => ({ ...p, text: e.target.value }))} placeholder="Reference text / testimonial" rows={3} className="w-full bg-background-dark border border-border-dark rounded-xl p-4 text-white text-sm focus:outline-none focus:border-primary transition-all resize-none" />
              <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm">Save</button>
            </form>
          )}
          {references.map(ref => (
            <div key={ref.id} className="bg-card-dark border border-border-dark rounded-2xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="size-12 rounded-full bg-background-dark border border-border-dark overflow-hidden shrink-0">
                {ref.avatar_url ? (
                  <img src={ref.avatar_url} alt={ref.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-white">{ref.name}</h3>
                {ref.role && <p className="text-xs text-primary">{ref.role}</p>}
                {ref.text && <p className="text-xs text-slate-400 italic mt-2">"{ref.text}"</p>}
              </div>
              <button onClick={() => deleteItem('references_list', ref.id, ref.name)} className="size-8 shrink-0 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminExperience;
