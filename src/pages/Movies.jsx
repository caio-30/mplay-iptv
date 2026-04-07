import React, { useState, useEffect } from 'react';
import VideoPlayer from '../components/VideoPlayer';

export default function Movies({ serverInfo }) {
  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [activeMovie, setActiveMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCats() {
      if (!serverInfo.server) return;
      try {
        const url = `${serverInfo.server}/player_api.php?username=${serverInfo.user}&password=${serverInfo.pass}&action=get_vod_categories`;
        const res = await fetch(url);
        const data = await res.json();
        setCategories(data);
        if (data.length > 0) loadMovies(data[0].category_id);
      } catch (err) { console.error("Erro nas categorias de filmes:", err); }
    }
    loadCats();
  }, [serverInfo]);

  async function loadMovies(id) {
    setSelectedCat(id);
    setLoading(true);
    try {
      const url = `${serverInfo.server}/player_api.php?username=${serverInfo.user}&password=${serverInfo.pass}&action=get_vod_streams&category_id=${id}`;
      const res = await fetch(url);
      const data = await res.json();
      setMovies(Array.isArray(data) ? data : []);
    } catch (err) { console.error("Erro ao carregar filmes:", err); }
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-full text-white">
      {activeMovie && (
        <VideoPlayer 
          url={`${serverInfo.server}/movie/${serverInfo.user}/${serverInfo.pass}/${activeMovie.stream_id}.${activeMovie.container_extension || 'mp4'}`}
          title={activeMovie.name}
          onClose={() => setActiveMovie(null)}
        />
      )}

      <div className="flex overflow-x-auto p-2 gap-2 bg-slate-900 sticky top-0 z-10 no-scrollbar">
        {categories.map(cat => (
          <button 
            key={cat.category_id} 
            onClick={() => loadMovies(cat.category_id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-xs font-bold ${selectedCat === cat.category_id ? 'bg-blue-600' : 'bg-slate-800'}`}
          >
            {cat.category_name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="p-10 text-center animate-pulse">A carregar filmes...</div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 p-3 pb-24">
          {movies.map(m => (
            <div key={m.stream_id} onClick={() => setActiveMovie(m)} className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 active:scale-95 transition-all shadow-lg">
              <img 
                src={m.stream_icon} 
                className="w-full aspect-[2/3] object-cover" 
                onError={(e) => e.target.src='https://via.placeholder.com/200x300?text=Sem+Capa'} 
              />
              <p className="p-1 text-[9px] truncate text-center uppercase font-bold text-slate-400">{m.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
