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

  // Experience
  const [showExpForm, setShowExpForm] = useState(false);
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expForm, setExpForm] = useState({ title: '', company: '', period: '', description: '' });

  // Cert
  const [showCertForm, setShowCertForm] = useState(false);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [certForm, setCertForm] = useState({ title: '', issuer: '', icon: '', rarity: '', url: '' });

  // Ref
  const [showRefForm, setShowRefForm] = useState(false);
  const [editingRefId, setEditingRefId] = useState<string | null>(null);
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

  const toggleVisible = async (table: string, id: string, current: boolean) => {
    await (supabase.from(table) as any).update({ is_visible: !current }).eq('id', id);
    fetchAll();
  };

  // ── Experience CRUD ──
  const saveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    const descArray = expForm.description.split('\n').filter(Boolean);
    const payload = { title: expForm.title, company: expForm.company, period: expForm.period, description: descArray };
    if (editingExpId) {
      await (supabase.from('experiences') as any).update(payload).eq('id', editingExpId);
    } else {
      await (supabase.from('experiences') as any).insert([{ ...payload, is_visible: true, sort_order: experiences.length + 1 }]);
    }
    resetExpForm(); fetchAll();
  };
  const editExp = (exp: Experience) => {
    setEditingExpId(exp.id);
    setExpForm({ title: exp.title, company: exp.company, period: exp.period, description: exp.description.join('\n') });
    setShowExpForm(true);
  };
  const resetExpForm = () => { setExpForm({ title: '', company: '', period: '', description: '' }); setEditingExpId(null); setShowExpForm(false); };

  // ── Cert CRUD ──
  const saveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title: certForm.title, issuer: certForm.issuer, icon: certForm.icon || null, rarity: certForm.rarity || null, url: certForm.url || null };
    if (editingCertId) {
      await (supabase.from('certifications') as any).update(payload).eq('id', editingCertId);
    } else {
      await (supabase.from('certifications') as any).insert([{ ...payload, is_visible: true, sort_order: certifications.length + 1 }]);
    }
    resetCertForm(); fetchAll();
  };
  const editCert = (cert: Certification) => {
    setEditingCertId(cert.id);
    setCertForm({ title: cert.title, issuer: cert.issuer, icon: cert.icon || '', rarity: cert.rarity || '', url: cert.url || '' });
    setShowCertForm(true);
  };
  const resetCertForm = () => { setCertForm({ title: '', issuer: '', icon: '', rarity: '', url: '' }); setEditingCertId(null); setShowCertForm(false); };

  // ── Ref CRUD ──
  const saveRef = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name: refForm.name, role: refForm.role || null, text: refForm.text || null, avatar_url: refForm.avatar_url || null, linkedin: refForm.linkedin || null };
    if (editingRefId) {
      await (supabase.from('references_list') as any).update(payload).eq('id', editingRefId);
    } else {
      await (supabase.from('references_list') as any).insert([{ ...payload, is_visible: true, sort_order: references.length + 1 }]);
    }
    resetRefForm(); fetchAll();
  };
  const editRef = (ref: Reference) => {
    setEditingRefId(ref.id);
    setRefForm({ name: ref.name, role: ref.role || '', text: ref.text || '', avatar_url: ref.avatar_url || '', linkedin: ref.linkedin || '' });
    setShowRefForm(true);
  };
  const resetRefForm = () => { setRefForm({ name: '', role: '', text: '', avatar_url: '', linkedin: '' }); setEditingRefId(null); setShowRefForm(false); };

  const tabs: { key: Tab; label: string; icon: string; count: number }[] = [
    { key: 'experience', label: 'Experience', icon: 'work', count: experiences.length },
    { key: 'certifications', label: 'Certifications', icon: 'verified', count: certifications.length },
    { key: 'references', label: 'References', icon: 'groups', count: references.length },
  ];

  const inputCls = "h-11 bg-background-dark border border-border-dark rounded-xl px-4 text-white text-sm focus:outline-none focus:border-primary transition-all";

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-full"></div></div>;
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h1 className="text-3xl font-black font-display uppercase tracking-tight">Experience & Credentials</h1>

      <div className="flex gap-2 bg-card-dark border border-border-dark rounded-2xl p-2">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${tab === t.key ? 'bg-primary/20 text-primary border border-primary/30' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}>
            <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
            {t.label}
            <span className="px-2 py-0.5 bg-white/5 rounded-md text-[10px]">{t.count}</span>
          </button>
        ))}
      </div>

      {/* ═══ EXPERIENCE TAB ═══ */}
      {tab === 'experience' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => { if (showExpForm) resetExpForm(); else setShowExpForm(true); }} className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">
              <span className="material-symbols-outlined text-[18px]">{showExpForm ? 'close' : 'add'}</span>
              {showExpForm ? 'Cancel' : 'Add Experience'}
            </button>
          </div>
          {showExpForm && (
            <form onSubmit={saveExp} className="bg-card-dark border border-primary/30 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-primary uppercase">{editingExpId ? 'Edit Experience' : 'New Experience'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input value={expForm.title} onChange={e => setExpForm(p => ({ ...p, title: e.target.value }))} placeholder="Job Title" required className={inputCls} />
                <input value={expForm.company} onChange={e => setExpForm(p => ({ ...p, company: e.target.value }))} placeholder="Company" required className={inputCls} />
                <input value={expForm.period} onChange={e => setExpForm(p => ({ ...p, period: e.target.value }))} placeholder="Period" required className={inputCls} />
              </div>
              <textarea value={expForm.description} onChange={e => setExpForm(p => ({ ...p, description: e.target.value }))} placeholder="Description (one bullet per line)" rows={4} className="w-full bg-background-dark border border-border-dark rounded-xl p-4 text-white text-sm focus:outline-none focus:border-primary transition-all resize-none" />
              <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm">{editingExpId ? 'Update' : 'Save'}</button>
            </form>
          )}
          {experiences.map(exp => (
            <div key={exp.id} className={`bg-card-dark border rounded-2xl p-6 flex items-start justify-between gap-4 transition-colors ${exp.is_visible ? 'border-border-dark hover:border-primary/30' : 'border-red-500/20 opacity-60'}`}>
              <div className="space-y-1 flex-1">
                <h3 className="font-bold text-white">{exp.title}</h3>
                <p className="text-primary text-sm font-bold">{exp.company} <span className="text-slate-500 font-normal">• {exp.period}</span></p>
                <ul className="mt-2 space-y-1">
                  {exp.description.map((d, i) => <li key={i} className="text-xs text-slate-400 flex gap-2"><span className="text-primary mt-0.5">•</span>{d}</li>)}
                </ul>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => toggleVisible('experiences', exp.id, exp.is_visible)} className="size-8 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors flex items-center justify-center" title={exp.is_visible ? 'Hide' : 'Show'}>
                  <span className="material-symbols-outlined text-[18px]">{exp.is_visible ? 'visibility' : 'visibility_off'}</span>
                </button>
                <button onClick={() => editExp(exp)} className="size-8 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center" title="Edit">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button onClick={() => deleteItem('experiences', exp.id, exp.title)} className="size-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center" title="Delete">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══ CERTIFICATIONS TAB ═══ */}
      {tab === 'certifications' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => { if (showCertForm) resetCertForm(); else setShowCertForm(true); }} className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">
              <span className="material-symbols-outlined text-[18px]">{showCertForm ? 'close' : 'add'}</span>
              {showCertForm ? 'Cancel' : 'Add Certification'}
            </button>
          </div>
          {showCertForm && (
            <form onSubmit={saveCert} className="bg-card-dark border border-primary/30 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-primary uppercase">{editingCertId ? 'Edit Certification' : 'New Certification'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input value={certForm.title} onChange={e => setCertForm(p => ({ ...p, title: e.target.value }))} placeholder="Certificate Title" required className={inputCls} />
                <input value={certForm.issuer} onChange={e => setCertForm(p => ({ ...p, issuer: e.target.value }))} placeholder="Issuer" required className={inputCls} />
                <input value={certForm.icon} onChange={e => setCertForm(p => ({ ...p, icon: e.target.value }))} placeholder="Material Icon (e.g. verified)" className={inputCls} />
                <input value={certForm.url} onChange={e => setCertForm(p => ({ ...p, url: e.target.value }))} placeholder="Certificate URL" className={inputCls} />
              </div>
              <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm">{editingCertId ? 'Update' : 'Save'}</button>
            </form>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map(cert => (
              <div key={cert.id} className={`bg-card-dark border rounded-2xl p-5 flex items-center justify-between gap-4 transition-colors ${cert.is_visible ? 'border-border-dark hover:border-primary/30' : 'border-red-500/20 opacity-60'}`}>
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">{cert.icon || 'verified'}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{cert.title}</h3>
                    <p className="text-xs text-slate-400">{cert.issuer}</p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => toggleVisible('certifications', cert.id, cert.is_visible)} className="size-7 rounded text-slate-400 hover:text-white flex items-center justify-center" title={cert.is_visible ? 'Hide' : 'Show'}>
                    <span className="material-symbols-outlined text-[16px]">{cert.is_visible ? 'visibility' : 'visibility_off'}</span>
                  </button>
                  <button onClick={() => editCert(cert)} className="size-7 rounded text-blue-400 hover:text-white flex items-center justify-center" title="Edit">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                  <button onClick={() => deleteItem('certifications', cert.id, cert.title)} className="size-7 rounded text-red-400 hover:text-white flex items-center justify-center" title="Delete">
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ REFERENCES TAB ═══ */}
      {tab === 'references' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => { if (showRefForm) resetRefForm(); else setShowRefForm(true); }} className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">
              <span className="material-symbols-outlined text-[18px]">{showRefForm ? 'close' : 'add'}</span>
              {showRefForm ? 'Cancel' : 'Add Reference'}
            </button>
          </div>
          {showRefForm && (
            <form onSubmit={saveRef} className="bg-card-dark border border-primary/30 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-primary uppercase">{editingRefId ? 'Edit Reference' : 'New Reference'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input value={refForm.name} onChange={e => setRefForm(p => ({ ...p, name: e.target.value }))} placeholder="Name" required className={inputCls} />
                <input value={refForm.role} onChange={e => setRefForm(p => ({ ...p, role: e.target.value }))} placeholder="Role / Title" className={inputCls} />
                <input value={refForm.linkedin} onChange={e => setRefForm(p => ({ ...p, linkedin: e.target.value }))} placeholder="LinkedIn URL" className={inputCls} />
                <input value={refForm.avatar_url} onChange={e => setRefForm(p => ({ ...p, avatar_url: e.target.value }))} placeholder="Avatar URL" className={inputCls} />
              </div>
              <textarea value={refForm.text} onChange={e => setRefForm(p => ({ ...p, text: e.target.value }))} placeholder="Reference text / testimonial" rows={3} className="w-full bg-background-dark border border-border-dark rounded-xl p-4 text-white text-sm focus:outline-none focus:border-primary transition-all resize-none" />
              <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm">{editingRefId ? 'Update' : 'Save'}</button>
            </form>
          )}
          {references.map(ref => (
            <div key={ref.id} className={`bg-card-dark border rounded-2xl p-6 flex items-start gap-4 transition-colors ${ref.is_visible ? 'border-border-dark hover:border-primary/30' : 'border-red-500/20 opacity-60'}`}>
              <div className="size-12 rounded-full bg-background-dark border border-border-dark overflow-hidden shrink-0">
                {ref.avatar_url ? <img src={ref.avatar_url} alt={ref.name} className="w-full h-full object-cover" /> :
                  <div className="w-full h-full flex items-center justify-center text-slate-500"><span className="material-symbols-outlined">person</span></div>}
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-white">{ref.name}</h3>
                {ref.role && <p className="text-xs text-primary">{ref.role}</p>}
                {ref.text && <p className="text-xs text-slate-400 italic mt-2">"{ref.text}"</p>}
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => toggleVisible('references_list', ref.id, ref.is_visible)} className="size-7 rounded text-slate-400 hover:text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">{ref.is_visible ? 'visibility' : 'visibility_off'}</span>
                </button>
                <button onClick={() => editRef(ref)} className="size-7 rounded text-blue-400 hover:text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                </button>
                <button onClick={() => deleteItem('references_list', ref.id, ref.name)} className="size-7 rounded text-red-400 hover:text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminExperience;
