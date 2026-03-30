import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ projects: 0, shikai: 0, experiences: 0, stats: 0 });

  useEffect(() => {
    async function fetchCounts() {
      const [{ count: pCount }, { count: sCount }, { count: eCount }, { count: stCount }] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('shikai_collections').select('*', { count: 'exact', head: true }),
        supabase.from('experiences').select('*', { count: 'exact', head: true }),
        supabase.from('stats').select('*', { count: 'exact', head: true }),
      ]);
      setCounts({
        projects: pCount || 0,
        shikai: sCount || 0,
        experiences: eCount || 0,
        stats: stCount || 0,
      });
    }
    fetchCounts();
  }, []);

  const statCards = [
    { label: 'Projects', value: counts.projects, icon: 'library_books', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Shikai Collections', value: counts.shikai, icon: 'image', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Experiences', value: counts.experiences, icon: 'work', color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Skill Stats', value: counts.stats, icon: 'bar_chart', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ];

  const quickActions = [
    { label: 'Add New Project', path: '/admin/projects/new', icon: 'add_circle' },
    { label: 'Manage Collections', path: '/admin/shikai', icon: 'collections' },
    { label: 'Edit Skill Stats', path: '/admin/stats', icon: 'tune' },
    { label: 'Manage Experience', path: '/admin/experience', icon: 'work_history' },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-4xl font-black font-display uppercase tracking-tight">Dashboard</h1>
        <p className="text-slate-400 mt-2">Welcome back. Here's your portfolio overview.</p>
        <div className="mt-4 px-3 py-1.5 bg-black/40 border border-border-dark rounded-full inline-flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          {user?.email}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-card-dark border border-border-dark rounded-2xl p-6 flex flex-col hover:border-primary/50 transition-colors">
            <div className={`size-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
              <span className="material-symbols-outlined text-[24px]">{stat.icon}</span>
            </div>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-black font-display mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card-dark border border-border-dark rounded-2xl p-8 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
          <h2 className="text-xl font-bold font-display uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">bolt</span>
            Quick Actions
          </h2>
          <div className="space-y-4 relative z-10">
            {quickActions.map((action) => (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-background-dark border border-border-dark hover:border-primary hover:text-primary transition-colors text-left group/btn"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">{action.icon}</span>
                  <span className="font-bold">{action.label}</span>
                </div>
                <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card-dark border border-border-dark rounded-2xl p-8 relative overflow-hidden group">
          <div className="absolute left-0 bottom-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] group-hover:bg-purple-500/10 transition-colors pointer-events-none"></div>
          <h2 className="text-xl font-bold font-display uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-400">history</span>
            Recent Activity
          </h2>
          <div className="space-y-6 relative z-10">
            <div className="flex gap-4">
              <div className="mt-1">
                <span className="size-2 rounded-full bg-primary block"></span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Portfolio Refactored</p>
                <p className="text-xs text-slate-500 mt-1">Migrated to Supabase. Admin panel, shared components, and theme updated.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1">
                <span className="size-2 rounded-full bg-green-500 block"></span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Security Updated</p>
                <p className="text-xs text-slate-500 mt-1">API keys moved to serverless proxy. Admin routes protected.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
