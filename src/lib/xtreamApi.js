import axios from 'axios';

const createClient = (baseUrl, username, password) => {
  const client = axios.create({
    baseURL: baseUrl,
    params: { username, password },
    timeout: 10000 // 10 segundos de limite
  });

  return {
    authenticate: () => client.get('/player_api.php'),
    getLiveCategories: () => client.get('/player_api.php', { params: { action: 'get_live_categories' } }),
    getLiveStreams: (id) => client.get('/player_api.php', { params: { action: 'get_live_streams', category_id: id } }),
    getMovieCategories: () => client.get('/player_api.php', { params: { action: 'get_vod_categories' } }),
    getMovies: (id) => client.get('/player_api.php', { params: { action: 'get_vod_streams', category_id: id } }),
    
    // SÉRIES - Ajuste de fallback
    getSeriesCategories: () => client.get('/player_api.php', { params: { action: 'get_series_categories' } }),
    getSeries: (catId) => {
      const p = { action: 'get_series' };
      if (catId && catId !== 'all') p.category_id = catId;
      return client.get('/player_api.php', { params: p });
    },
    getSeriesInfo: (seriesId) => client.get('/player_api.php', { params: { action: 'get_series_info', series_id: seriesId } }),
    getStreamUrl: (id, type = 'live', ext = 'ts') => `${baseUrl}/${type}/${username}/${password}/${id}.${ext}`
  };
};

export default createClient;
