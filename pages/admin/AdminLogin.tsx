import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      const from = (location.state as any)?.from || '/admin';
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center p-4">
      {/* Abstract Backgrounds */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-3xl bg-card-dark border border-border-dark mb-4 shadow-glow">
            <span className="material-symbols-outlined text-4xl text-primary block">
              admin_panel_settings
            </span>
          </div>
          <h1 className="text-3xl font-black text-white font-display tracking-tight">
            System Override
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Restricted access. Authenticate to proceed.
          </p>
        </div>

        <form onSubmit={handleLogin} className="bg-card-dark/80 backdrop-blur-xl border border-border-dark p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                Admin UID
              </label>
              <div className="relative group/input">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-slate-500 group-focus-within/input:text-primary transition-colors">
                  person
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 bg-background-dark border border-border-dark rounded-xl pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="admin@domain.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                Access Code
              </label>
              <div className="relative group/input">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-slate-500 group-focus-within/input:text-primary transition-colors">
                  key
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 bg-background-dark border border-border-dark rounded-xl pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-glow hover:shadow-glow-hover flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin">refresh</span>
            ) : (
              <>
                <span className="material-symbols-outlined">login</span>
                Engage Protocol
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
