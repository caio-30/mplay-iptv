import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Tv, Film, Clapperboard, Settings } from 'lucide-react';

const AppLayout = () => {
  const location = useLocation();
  const menuItems = [
    { path: '/tv', icon: <Tv size={24} />, label: 'TV' },
    { path: '/movies', icon: <Film size={24} />, label: 'Filmes' },
    { path: '/series', icon: <Clapperboard size={24} />, label: 'Séries' },
    { path: '/settings', icon: <Settings size={24} />, label: 'Ajustes' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Aqui é onde as páginas (TV, Filmes, Séries) vão aparecer */}
      <main className="pb-20">
        <Outlet /> 
      </main>

      {/* Menu Inferior */}
      <nav className="fixed bottom-0 w-full bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 flex justify-around p-3 z-50">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-all ${
              location.pathname === item.path ? 'text-blue-500 scale-110' : 'text-slate-500'
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-bold uppercase">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AppLayout;
