import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { Project } from '../../types/database';

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    // Admin fetch: no RLS filter — authenticated users see all rows
    const { data } = await supabase.from('projects').select('*').order('sort_order', { ascending: true });
    setProjects((data as unknown as Project[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const toggleField = async (id: string, field: 'is_visible' | 'is_featured', currentValue: boolean) => {
    const { error } = await (supabase.from('projects') as any).update({ [field]: !currentValue }).eq('id', id);
    if (error) {
      alert(`Toggle failed: ${error.message}\n\nYou need to run the RLS fix SQL in Supabase.`);
      return;
    }
    // Optimistic update
    setProjects(prev => prev.map(p => p.id === id ? { ...p, [field]: !currentValue } : p));
  };

  const deleteProject = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      await (supabase.from('projects') as any).delete().eq('id', id);
      setProjects(prev => prev.filter(p => p.id !== id));
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
          <h1 className="text-3xl font-black font-display uppercase tracking-tight">Projects</h1>
          <p className="text-slate-400 mt-1">{projects.length} projects in database.</p>
        </div>
        <Link
          to="/admin/projects/new"
          className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-glow hover:shadow-glow-hover flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          New Project
        </Link>
      </div>

      <div className="bg-card-dark border border-border-dark rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-border-dark/30 border-b border-border-dark text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="p-4">Project</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4">Visible</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-border-dark/10 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-border-dark/30 overflow-hidden shrink-0">
                        {project.image_url ? (
                          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500">
                            <span className="material-symbols-outlined text-lg">image_not_supported</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-white">{project.title}</p>
                        <p className="text-xs text-slate-500 font-mono">{project.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-bold text-slate-300 uppercase tracking-widest">
                      {project.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-slate-400">{project.status}</span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleField(project.id, 'is_visible', project.is_visible)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        project.is_visible ? 'bg-green-500' : 'bg-slate-700'
                      }`}
                      title={project.is_visible ? 'Click to hide from public' : 'Click to show publicly'}
                    >
                      <span
                        className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                          project.is_visible ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleField(project.id, 'is_featured', project.is_featured)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        project.is_featured ? 'bg-amber-500' : 'bg-slate-700'
                      }`}
                      title={project.is_featured ? 'Remove from homepage' : 'Show on homepage'}
                    >
                      <span
                        className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                          project.is_featured ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/projects/edit/${project.id}`}
                        className="size-8 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </Link>
                      <button 
                        onClick={() => deleteProject(project.id, project.title)}
                        className="size-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center" title="Delete">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No projects found in the database.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;
