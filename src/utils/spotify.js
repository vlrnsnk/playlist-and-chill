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

  if (!expirationDate) {
    return true;
  }

  return new Date().getTime() > parseInt(expirationDate, 10);
};
