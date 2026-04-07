import React, { useEffect, useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';

export default function Series({ serverInfo }) {
  const [series, setSeries] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [activeEp, setActiveEp] = useState(null);

  useEffect(() => {
    async function load() {
      const url = `${serverInfo.server}/player_api.php?username=${serverInfo.user}&password=${serverInfo.pass}&action=get_series`;
      const res = await fetch(url);
      const data = await res.json();
      setSeries(Array.isArray(data) ? data.slice(0, 50) : []);
    }
    load();
  }, [serverInfo]);

  async function openSeries(s) {
    setSelectedSeries(s);
    const url = `${serverInfo.server}/player_api.php?username=${serverInfo.user}&password=${serverInfo.pass}&action=get_series_info&series_id=${s.series_id}`;
    const res = await fetch(url);
    const data = await res.json();
    // Pega os episódios da primeira temporada disponível
    const firstSeason = Object.keys(data.episodes)[0];
    setEpisodes(data.episodes[firstSeason]);
  }

  if (selectedSeries) {
    return (
      <div className="p-4 text-white pb-24">
        <button onClick={() => setSelectedSeries(null)} className="mb-4 bg-blue-600 px-4 py-2 rounded">Voltar</button>
        <h2 className="text-xl font-bold mb-4">{selectedSeries.name}</h2>
        <div className="grid gap-2">
          {episodes.map(ep => (
            <div key={ep.id} onClick={() => setActiveEp(ep)} className="p-3 bg-slate-900 border border-slate-800 rounded flex justify-between">
               <span>Episódio {ep.episode_num}: {ep.title}</span>
               <span className="text-blue-500 font-bold">PLAY</span>
            </div>
          ))}
        </div>
        {activeEp && (
          <VideoPlayer 
            url={`${serverInfo.server}/series/${serverInfo.user}/${serverInfo.pass}/${activeEp.id}.${activeEp.container_extension}`}
            title={activeEp.title}
            onClose={() => setActiveEp(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="p-2 grid grid-cols-3 gap-3 pb-24">
      {series.map(s => (
        <div key={s.series_id} onClick={() => openSeries(s)} className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
          <img src={s.cover || s.stream_icon} className="w-full aspect-[2/3] object-cover" />
          <p className="p-1 text-[10px] truncate text-center">{s.name}</p>
        </div>
      ))}
    </div>
  );
}
