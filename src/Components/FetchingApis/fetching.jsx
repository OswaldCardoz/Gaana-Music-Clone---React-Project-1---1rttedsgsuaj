const headers = {
  'Content-Type': 'application/json',
  projectId: "1rttedsgsuaj",
};

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchSongs = async (filter, limit) => {
  const url = `https://academics.newtonschool.co/api/v1/music/song?filter=${filter}&limit=${limit}`;
  const options = {
    headers,
  };

  return fetchData(url, options);
};

export const fetchAllSongs = async (limit = 100) => {
  const url = `https://academics.newtonschool.co/api/v1/music/song?&limit=${limit}`;
  const options = {
    headers,
  };

  return fetchData(url, options);
};

export const fetchArtists = async (limit = 200) => {
  const url = `https://academics.newtonschool.co/api/v1/music/artist?limit=${limit}`;
  const options = {
    headers,
  };

  return fetchData(url, options);
};

export const fetchAlbum = async (limit = 100) => {
  const url = `https://academics.newtonschool.co/api/v1/music/album?limit=${limit}`;
  const options = {
    headers,
  };

  return fetchData(url, options);
};

export const fetchByType = async (type) => {
  switch (type) {
    case 'Trending songs':
      return fetchSongs('{"featured":"Trending songs"}', 100);
    case 'Soul soother':
      return fetchSongs('{"featured":"Soul soother"}', 100);
    case 'Evergreen melodies':
      return fetchSongs('{"featured":"Evergreen melodies"}', 100);
    case 'Top 20 of this week':
      return fetchSongs('{"featured":"Top 20 of this week"}', 100);
    case 'Top 50 of this month':
      return fetchSongs('{"featured":"Top 50 of this month"}', 100);
    case 'happy':
      return fetchSongs('{"mood":"happy"}', 100);
    case 'romantic':
      return fetchSongs('{"mood":"romantic"}', 100);
    case 'sad':
      return fetchSongs('{"mood":"sad"}', 100);
    case 'excited':
      return fetchSongs('{"mood":"excited"}', 100);
    case 'artists':
      return fetchArtists(100);
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};
