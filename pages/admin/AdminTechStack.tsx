import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { TechStackItem } from '../../types/database';

const AdminTechStack: React.FC = () => {
  const [items, setItems] = useState<TechStackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', icon: 'code' });

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase.from('tech_stack').select('*').order('sort_order', { ascending: true });
    setItems((data as unknown as TechStackItem[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await (supabase.from('tech_stack') as any).update({
        name: form.name, category: form.category, icon: form.icon,
      }).eq('id', editingId);
    } else {
      await (supabase.from('tech_stack') as any).insert([{
        ...form, is_visible: true, sort_order: items.length + 1,
      }]);
    }
    resetForm();
    fetchItems();
  };

  const resetForm = () => {
    setForm({ name: '', category: '', icon: 'code' });
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (item: TechStackItem) => {
    setEditingId(item.id);
    setForm({ name: item.name, category: item.category, icon: item.icon });
    setShowForm(true);
  };

  const deleteItem = async (id: string, name: string) => {
    if (window.confirm(`Delete "${name}"?`)) {
      await (supabase.from('tech_stack') as any).delete().eq('id', id);
      fetchItems();
    }
  };

  const toggleVisible = async (id: string, current: boolean) => {
    await (supabase.from('tech_stack') as any).update({ is_visible: !current }).eq('id', id);
    setItems(prev => prev.map(i => i.id === id ? { ...i, is_visible: !current } : i));
  };

  // Group by category for display
  const categories = [...new Set(items.map(i => i.category))];

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
          <h1 className="text-3xl font-black font-display uppercase tracking-tight">Tech Stack</h1>
          <p className="text-slate-400 mt-1">Manage the tools & technologies displayed on the Skills page.</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); if (showForm) resetForm(); }}
          className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-glow hover:shadow-glow-hover flex items-center gap-2"
        >
          <span className="material-symbols-outlined">{showForm ? 'close' : 'add'}</span>
          {showForm ? 'Cancel' : 'Add Tool'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="bg-card-dark border border-primary/30 rounded-2xl p-8 space-y-4">
          <h3 className="text-lg font-bold text-white font-display uppercase">{editingId ? 'Edit Tool' : 'New Tool'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Tool name (e.g. Unity)" required className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary" />
            <input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} placeholder="Category (e.g. Game Dev)" required className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary" />
            <input value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))} placeholder="Material Icon (e.g. deployed_code)" required className="h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary" />
          </div>
          <button type="submit" className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold transition-all">
            {editingId ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      {categories.length > 0 ? (
        <div className="space-y-6">
          {categories.map(cat => (
            <div key={cat} className="bg-card-dark border border-border-dark rounded-2xl p-6">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{cat}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {items.filter(i => i.category === cat).map(item => (
                  <div key={item.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all group ${item.is_visible ? 'border-border-dark hover:border-primary/50' : 'border-red-500/20 opacity-50'}`}>
                    <div className="size-10 rounded-lg bg-background-dark flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <span className="font-bold text-white text-sm flex-1 truncate">{item.name}</span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => toggleVisible(item.id, item.is_visible)} className="size-6 rounded text-xs flex items-center justify-center text-slate-400 hover:text-white" title={item.is_visible ? 'Hide' : 'Show'}>
                        <span className="material-symbols-outlined text-[14px]">{item.is_visible ? 'visibility' : 'visibility_off'}</span>
                      </button>
                      <button onClick={() => startEdit(item)} className="size-6 rounded text-xs flex items-center justify-center text-blue-400 hover:text-white" title="Edit">
                        <span className="material-symbols-outlined text-[14px]">edit</span>
                      </button>
                      <button onClick={() => deleteItem(item.id, item.name)} className="size-6 rounded text-xs flex items-center justify-center text-red-400 hover:text-white" title="Delete">
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center text-slate-500 bg-card-dark border border-border-dark rounded-2xl">
          <span className="material-symbols-outlined text-5xl mb-4 block">inventory_2</span>
          No tools in the database. Skills page will use default fallback data until you add items here.
        </div>
      )}
    </div>
  );
};

export default AdminTechStack;
