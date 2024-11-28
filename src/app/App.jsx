import { useState, useEffect } from 'react';

import axios from 'axios';

import './App.css';

import { PageWrapper } from 'layout/PageWrapper/PageWrapper';
import { Header } from 'components/Header/Header';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { SearchResults } from 'components/SearchResults/SearchResults';
import { Playlist } from 'components/Playlist/Playlist';
import { Footer } from 'components/Footer/Footer';

import { searchResultsTracksMock } from 'mocks/searchResultsTracks';
import { playlistTracksMock } from 'mocks/playlistTracks';

function App() {
  const defaultPlaylistName = 'Name Your Playlist';

  const [searchResultsTracks, setSearchResultsTracks] = useState(searchResultsTracksMock);
  const [playlistTracks, setPlaylistTracks] = useState(playlistTracksMock);
  const [playlistName, setPlaylistName] = useState(defaultPlaylistName);
  const [spotifyAccessToken, setSpotifyAccessToken] = useState('');

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');

      if (token) {
        setSpotifyAccessToken(token);
        localStorage.setItem('spotifyAccessToken', token);

        console.log(`Spotify access token is ${token}`);
      }

      const expiresIn = params.get('expires_in');

      if (expiresIn) {
        const expirationDate = new Date().getTime() + expiresIn * 1000;
        localStorage.setItem('spotifyAccessTokenExpirationDate', expirationDate);

        console.log(`Spotify access token expires in ${expiresIn}`);
      }

      clearUrlParams();
    }
  }, []);

  const clearUrlParams = () => {
    const newUrl = `${window.location.origin}${window.location.pathname}`;
    window.history.replaceState({}, document.title, newUrl);
  };

  const requestSpotifyAccessToken = () => {
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

  const isSpotifyAccessTokenExpired = () => {
    const expirationDate = localStorage.getItem('spotifyAccessTokenExpirationDate');

    if (!expirationDate) {
      return true;
    }

    return new Date().getTime() > parseInt(expirationDate, 10);
  };

  const getSpotifyAccessToken = () => {
    if (isSpotifyAccessTokenExpired()) {
      requestSpotifyAccessToken();
    }

    return localStorage.getItem('spotifyAccessToken');
  };

  const isSpotifyAccessTokenAvailable = () => {
    if (!spotifyAccessToken) {
      setSpotifyAccessToken(getSpotifyAccessToken());
    }

    if (spotifyAccessToken) {
      return true;
    }

    console.log('Failed to retrieve Spotify Access Token');

    return false;
  };

  const handleSearchButtonClick = (e) => {
    e.preventDefault();

    if (!isSpotifyAccessTokenAvailable()) {
      return;
    }

    console.log('Fetching songs');

    setSearchResultsTracks(searchResultsTracksMock);
  };

  const handleAddTrack = (track) => {
    const { id } = track;
    const isTrackAlreadyInPlaylist = playlistTracks.some(track => track.id === id);

    if (!isTrackAlreadyInPlaylist) {
      console.log(`Adding track with id = ${id}`);

      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const handleRemoveTrack = ({ id }) => {
    console.log(`Removing song with id = ${id}`);

    setPlaylistTracks(playlistTracks.filter(track => track.id !== id));
  };

  const handleSavePlaylist = () => {
    if (!isSpotifyAccessTokenAvailable()) {
      return;
    }

    const spotifyUris = playlistTracks.map(track => track.uri);
    console.log(spotifyUris);

    setPlaylistTracks([]);
    setPlaylistName(defaultPlaylistName);

    console.log('Saving playlist');
  };

  return (
    <PageWrapper>
      <Header />
        <SearchBar handleSearchButtonClick={handleSearchButtonClick} />
        <div className="columns">
          <SearchResults
            tracks={searchResultsTracks}
            handleAddTrack={handleAddTrack}
          />
          <Playlist
            playlistName={playlistName}
            setPlaylistName={setPlaylistName}
            tracks={playlistTracks}
            handleRemoveTrack={handleRemoveTrack}
            handleSavePlaylist={handleSavePlaylist}
          />
        </div>
        <Footer />
    </PageWrapper>
  );
}

export default App;
