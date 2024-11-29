import axios from "axios";

export const requestSpotifyAccessToken = () => {
  const clientId = 'feb3091794be47a6a1f23f62b693c933';
  const redirectUri = 'http://localhost:3000';
  const scope = 'playlist-modify-public';
  const state = Math.random().toString(36).substring(2, 2 + 16);

  localStorage.setItem('spotifyState', state);

  const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${
    encodeURIComponent(clientId)
  }&scope=${
    encodeURIComponent(scope)
  }&redirect_uri=${
    encodeURIComponent(redirectUri)
  }&state=${
    encodeURIComponent(state)
  }`;
  console.log(url);

  window.location.href = url;
};

export const isSpotifyAccessTokenExpired = () => {
  const expirationDate = localStorage.getItem('spotifyAccessTokenExpirationDate');

  return !expirationDate || new Date().getTime() > parseInt(expirationDate, 10);
};

const getAuthHeader = (spotifyAccessToken) => {
  return {
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
    },
  }
};

const baseUrl = 'https://api.spotify.com/v1';

const getUserId = async (spotifyAccessToken) => {
  try {
    const response = await axios.get(
      `${baseUrl}/me`,
      getAuthHeader(spotifyAccessToken),
    );

    return response.data.id;
  } catch (error) {
    throw new Error(`Error fetching user info: ${error.message}`);
  }
};

const createPlaylist = async (userId, playlistName, spotifyAccessToken) => {
  try {
    const response = await axios.post(
      `${baseUrl}/users/${userId}/playlists`,
      {
        name: playlistName,
        description: playlistName,
        public: true,
      },
      getAuthHeader(spotifyAccessToken),
    );

    return response.data;
  } catch (error) {
    throw new Error(`Error creating playlist: ${error.message}`);
  }
};

const addTracksToPlaylist = async (userId, playlistId, spotifyUris, spotifyAccessToken) => {
  try {
    const response = axios.post(
      `${baseUrl}/users/${userId}/playlists/${playlistId}/tracks`,
      {
        uris: spotifyUris,
      },
      getAuthHeader(spotifyAccessToken),
    );

    return response.data;
  } catch (error) {
    throw new Error(`Error adding tracks to playlist: ${error.message}`);
  }
};

export const createAndPopulatePlaylist = async (spotifyAccessToken, playlistName, spotifyUris) => {
  try {
    const userId = await getUserId(spotifyAccessToken);
    console.log(`userid ${userId}`);
    const playlist = await createPlaylist(userId, playlistName, spotifyAccessToken);
    console.log(`playlist ${playlist}`);
    const playlistId = playlist.id;
    console.log(`playlist id ${playlist.id}`);

    await addTracksToPlaylist(userId, playlistId, spotifyUris, spotifyAccessToken);

    return playlist;
  } catch (error) {
    throw error;
  }
};

export const fetchSpotifyTracks = async (searchQuery, spotifyAccessToken) => {
  try {
    const authHeader = getAuthHeader(spotifyAccessToken);
    const response = await axios.get(
      `${baseUrl}/search`,
      {
        params: {
          q: searchQuery,
          type: 'track',
          limit: 20,
        },
        headers: authHeader.headers,
      },
    );

    return response.data.tracks.items.map((item, index) => ({
      id: index,
      title: item.name,
      artist: item.artists[0].name,
      album: item.album.name,
      uri: item.uri,
    }));
  } catch (error) {
    console.error(`Error fetching tracks from Spotify: ${error.message}`);
    throw error;
  }
};
