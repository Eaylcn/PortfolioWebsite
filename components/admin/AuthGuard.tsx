import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login', { 
        replace: true, 
        state: { from: location.pathname } 
      });
    }
  }, [user, loading, navigate, location]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="animate-spin size-12 border-4 border-primary border-t-transparent rounded-full shadow-glow"></div>
      </div>
    );
  }

  // Only render if authenticated
  return user ? <>{children}</> : null;
};
