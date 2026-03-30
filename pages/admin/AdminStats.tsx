import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Stat } from '../../types/database';

const AdminStats: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', value: 85, icon: '', description: '', color: '#135bec' });

  const fetchStats = async () => {
    setLoading(true);
    const { data } = await supabase.from('stats').select('*').order('sort_order', { ascending: true });
    setStats((data as unknown as Stat[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchStats(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await (supabase.from('stats') as any).update({
        name: form.name, value: form.value, icon: form.icon,
        description: form.description, color: form.color,
      }).eq('id', editingId);
      setEditingId(null);
    } else {
      await (supabase.from('stats') as any).insert([{
        ...form, sort_order: stats.length + 1,
      }]);
    }
    setForm({ name: '', value: 85, icon: '', description: '', color: '#135bec' });
    setShowForm(false);
    fetchStats();
  };

  const startEdit = (stat: Stat) => {
    setEditingId(stat.id);
    setForm({
      name: stat.name,
      value: stat.value,
      icon: stat.icon || '',
      description: stat.description || '',
      color: stat.color || '#135bec',
    });
    setShowForm(true);
  };

  const deleteStat = async (id: string, name: string) => {
    if (window.confirm(`Delete "${name}"?`)) {
      await (supabase.from('stats') as any).delete().eq('id', id);
      fetchStats();
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
          <h1 className="text-3xl font-black font-display uppercase tracking-tight">Skill Stats</h1>
          <p className="text-slate-400 mt-1">Manage the competency cards displayed on the homepage and skills page.</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ name: '', value: 85, icon: '', description: '', color: '#135bec' }); }}
          className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-glow hover:shadow-glow-hover flex items-center gap-2"
        >
          <span className="material-symbols-outlined">{showForm ? 'close' : 'add'}</span>
          {showForm ? 'Cancel' : 'Add Stat'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="bg-card-dark border border-primary/30 rounded-2xl p-8 space-y-4">
          <h3 className="text-lg font-bold text-white font-display uppercase">{editingId ? 'Edit Stat' : 'New Stat'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Stat Name (e.g. Game Architecture)" required className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary transition-all" />
            <div className="flex gap-4">
              <input type="number" min={0} max={100} value={form.value} onChange={e => setForm(p => ({ ...p, value: parseInt(e.target.value) || 0 }))} placeholder="Value (0-100)" required className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary transition-all flex-1" />
              <input type="color" value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))} className="h-12 w-16 bg-background-dark border border-border-dark rounded-xl cursor-pointer" title="Accent Color" />
            </div>
            <input value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))} placeholder="Material Icon name (e.g. data_object)" className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary transition-all" />
            <input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Short description" className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary transition-all" />
          </div>
          <button type="submit" className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold transition-all">
            {editingId ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map(stat => (
          <div key={stat.id} className="bg-card-dark border border-border-dark rounded-2xl p-6 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                  <span className="material-symbols-outlined text-3xl" style={{ color: stat.color }}>{stat.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{stat.name}</h3>
                  <p className="text-xs text-slate-500">{stat.description}</p>
                </div>
              </div>
              <span className="text-2xl font-black font-display" style={{ color: stat.color }}>{stat.value}%</span>
            </div>
            <div className="mt-4 h-2 bg-background-dark rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${stat.value}%`, backgroundColor: stat.color }}></div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => startEdit(stat)} className="size-8 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center" title="Edit">
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
              <button onClick={() => deleteStat(stat.id, stat.name)} className="size-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center" title="Delete">
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {stats.length === 0 && (
        <div className="p-16 text-center text-slate-500 bg-card-dark border border-border-dark rounded-2xl">
          <span className="material-symbols-outlined text-5xl mb-4 block">bar_chart</span>
          No stats found. Add your first skill stat.
        </div>
      )}
    </div>
  );
};

export default AdminStats;
