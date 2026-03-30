import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

const AdminProjectForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'web',
    status: 'In Development',
    role: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && !prev.slug ? { slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') } : {})
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // @ts-ignore
    const { error } = await (supabase.from('projects') as any).insert([
      { ...formData, is_visible: false, sort_order: 0 }
    ]);

    setLoading(false);
    if (error) {
      alert('Error creating project: ' + error.message);
    } else {
      navigate('/admin/projects');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => navigate('/admin/projects')} className="size-10 rounded-full bg-card-dark border border-border-dark flex items-center justify-center hover:border-primary transition-all group">
          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-transform group-hover:-translate-x-1">arrow_back</span>
        </button>
        <h1 className="text-3xl font-black font-display uppercase tracking-tight">Create New Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-card-dark border border-border-dark rounded-3xl p-8 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Project Title</label>
            <input name="title" value={formData.title} onChange={handleChange} required className="w-full h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Slug (URL)</label>
            <input name="slug" value={formData.slug} onChange={handleChange} required className="w-full h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
              <option value="game">Game</option>
              <option value="mobile">Mobile</option>
              <option value="web">Web</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Status</label>
            <input name="status" value={formData.status} onChange={handleChange} required className="w-full h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="e.g. In Development, Released" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">My Role</label>
          <input name="role" value={formData.role} onChange={handleChange} required className="w-full h-12 bg-background-dark border border-border-dark rounded-xl px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="e.g. Lead Developer & Designer" />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Short Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} className="w-full bg-background-dark border border-border-dark rounded-xl p-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"></textarea>
        </div>

        <button disabled={loading} type="submit" className="w-full h-14 bg-primary hover:bg-blue-600 text-white font-bold text-lg rounded-xl transition-all shadow-glow flex items-center justify-center gap-2">
          {loading ? <span className="material-symbols-outlined animate-spin">refresh</span> : 'Create Project'}
        </button>
      </form>
    </div>
  );
};

export default AdminProjectForm;
