import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Settings from './pages/Settings';
import LiveTv from './pages/LiveTv';
import Movies from './pages/Movies';
import Series from './pages/Series';

function App() {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('iptv_auth');
    return saved ? JSON.parse(saved) : null;
  });

  if (!auth) {
    return <Settings onLogin={(data) => {
      localStorage.setItem('iptv_auth', JSON.stringify(data));
      setAuth(data);
    }} />;
  }

  const serverInfo = {
    server: auth.url,
    user: auth.user,
    pass: auth.pass
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/tv" />} />
          <Route path="tv" element={<LiveTv serverInfo={serverInfo} />} />
          <Route path="movies" element={<Movies serverInfo={serverInfo} />} />
          <Route path="series" element={<Series serverInfo={serverInfo} />} />
          <Route path="settings" element={
            <div className="flex flex-col items-center justify-center h-[80vh] p-4 text-center">
              <h2 className="mb-4 text-slate-400 font-bold uppercase">Sessão Ativa</h2>
              <p className="text-xs mb-8 text-slate-600 truncate w-full">{serverInfo.server}</p>
              <button 
                className="bg-red-600/20 text-red-500 border border-red-600/30 p-4 rounded-2xl font-bold w-full max-w-xs active:scale-95 transition-all" 
                onClick={() => { localStorage.removeItem('iptv_auth'); setAuth(null); }}
              >
                SAIR E DESCONECTAR
              </button>
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
