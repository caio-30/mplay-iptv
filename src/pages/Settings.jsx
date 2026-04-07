import React, { useState } from 'react';

const Settings = ({ onLogin }) => {
  const [url, setUrl] = useState('http://z01.shop');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Teste básico de conexão
      const testUrl = `${url}/player_api.php?username=${user}&password=${pass}`;
      const response = await fetch(testUrl);
      const data = await response.json();

      if (data.user_info && data.user_info.auth === 1) {
        // SALVA E ENVIA PARA O APP.JSX
        const userData = { url, user, pass };
        localStorage.setItem('iptv_url', url);
        localStorage.setItem('iptv_user', user);
        localStorage.setItem('iptv_pass', pass);
        
        onLogin(userData);
      } else {
        alert("Usuário ou senha inválidos");
      }
    } catch (err) {
      alert("Erro ao conectar no servidor. Verifique a URL.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-md border border-slate-800 shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/20">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white uppercase tracking-wider">Mplay IPTV</h1>
          <p className="text-slate-400 text-sm">Dados de acesso Xtream</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="text" placeholder="URL do Servidor" 
            className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-blue-500 transition-all"
            value={url} onChange={(e) => setUrl(e.target.value)}
          />
          <input 
            type="text" placeholder="Usuário" 
            className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-blue-500 transition-all"
            value={user} onChange={(e) => setUser(e.target.value)}
          />
          <input 
            type="password" placeholder="Senha" 
            className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-blue-500 transition-all"
            value={pass} onChange={(e) => setPass(e.target.value)}
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/30 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? 'AUTENTICANDO...' : 'CONECTAR AGORA'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
