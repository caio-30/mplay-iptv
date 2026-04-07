import React, { useState, useEffect } from 'react';
import VideoPlayer from '../components/VideoPlayer';

export default function LiveTv({ serverInfo }) {
  const [categories, setCategories] = useState([]);
  const [channels, setChannels] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [activeChannel, setActiveChannel] = useState(null);

  useEffect(() => {
    fetch(`${serverInfo.server}/player_api.php?username=${serverInfo.user}&password=${serverInfo.pass}&action=get_live_categories`)
      .then(res => res.json()).then(setCategories).catch(console.error);
  }, [serverInfo]);

  const loadChannels = (id) => {
    setSelectedCat(id);
    fetch(`${serverInfo.server}/player_api.php?username=${serverInfo.user}&password=${serverInfo.pass}&action=get_live_streams&category_id=${id}`)
      .then(res => res.json()).then(setChannels).catch(console.error);
  };

  return (
    <div className="p-2 pb-24 bg-slate-950 min-h-screen">
      {activeChannel && (
        <VideoPlayer 
          url={`${serverInfo.server}/live/${serverInfo.user}/${serverInfo.pass}/${activeChannel.stream_id}.m3u8`} 
          title={activeChannel.name} 
          onClose={() => setActiveChannel(null)} 
        />
      )}
      <div className="flex gap-2 overflow-x-auto mb-4 p-2">
        {categories.map(cat => (
          <button key={cat.category_id} onClick={() => loadChannels(cat.category_id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-xs ${selectedCat === cat.category_id ? 'bg-blue-600' : 'bg-slate-800'}`}>
            {cat.category_name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {channels.map(ch => (
          <div key={ch.stream_id} onClick={() => setActiveChannel(ch)} className="bg-slate-900 p-2 rounded flex flex-col items-center">
            <img src={ch.stream_icon} className="w-12 h-12 object-contain" onError={e => e.target.src='https://via.placeholder.com/50'} />
            <span className="text-[10px] truncate w-full text-center mt-1">{ch.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
