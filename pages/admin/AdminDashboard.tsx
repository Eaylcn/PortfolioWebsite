import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Projects', value: 3, icon: 'library_books', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Shikai Realms', value: 15, icon: 'image', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Database Status', value: 'Online', icon: 'database', color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Storage Usage', value: '< 1 MB', icon: 'cloud', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-4xl font-black font-display uppercase tracking-tight">Main Protocol Interface</h1>
        <p className="text-slate-400 mt-2">Welcome back, Architect. System is fully operational.</p>
        <div className="mt-4 px-3 py-1.5 bg-black/40 border border-border-dark rounded-full inline-flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          User: {user?.email}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
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
            <span className="material-symbols-outlined text-primary">campaign</span>
            Quick Actions
          </h2>
          <div className="space-y-4 relative z-10">
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-background-dark border border-border-dark hover:border-primary hover:text-primary transition-colors text-left group/btn">
              <span className="font-bold">Add New Project</span>
              <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-background-dark border border-border-dark hover:border-primary hover:text-primary transition-colors text-left group/btn">
              <span className="font-bold">Deploy Shikai Collection</span>
              <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-background-dark border border-border-dark hover:border-primary hover:text-primary transition-colors text-left group/btn">
              <span className="font-bold">Update Stat Matrix</span>
              <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="bg-card-dark border border-border-dark rounded-2xl p-8 relative overflow-hidden group">
          <div className="absolute left-0 bottom-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] group-hover:bg-purple-500/10 transition-colors pointer-events-none"></div>
          <h2 className="text-xl font-bold font-display uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-400">history</span>
            System Log
          </h2>
          <div className="space-y-6 relative z-10">
            <div className="flex gap-4">
              <div className="mt-1">
                <span className="size-2 rounded-full bg-primary block"></span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Migration Completed</p>
                <p className="text-xs text-slate-500 mt-1">JSON static files successfully migrated to Supabase architecture.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1">
                <span className="size-2 rounded-full bg-green-500 block"></span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Security Patch Applied</p>
                <p className="text-xs text-slate-500 mt-1">Admin protection overlay activated. All perimeter defenses holding.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
