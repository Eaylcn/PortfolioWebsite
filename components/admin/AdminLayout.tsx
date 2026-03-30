import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: 'dashboard' },
    { name: 'Projects', path: '/admin/projects', icon: 'library_books' },
    { name: 'Shikai Realms', path: '/admin/shikai', icon: 'image' },
    { name: 'Experience & Certs', path: '/admin/experience', icon: 'work' },
  ];

  return (
    <div className="min-h-screen bg-background-dark flex font-body text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-card-dark border-r border-border-dark flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border-dark">
          <span className="font-display font-black text-xl tracking-widest uppercase text-primary">
            Grand Archive
          </span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive 
                    ? 'bg-primary/20 text-primary border border-primary/30' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border-dark">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors font-medium border border-transparent hover:border-red-500/20"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-16 flex items-center px-8 border-b border-border-dark bg-card-dark/50 shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-500">
            <span className="material-symbols-outlined text-[16px] text-primary">admin_panel_settings</span>
            System Override Active
          </div>
          <div className="ml-auto text-xs text-slate-400 font-mono">
            {new Date().toISOString().split('T')[0]}
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
