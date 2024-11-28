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

import {
  requestSpotifyAccessToken,
  isSpotifyAccessTokenExpired,
} from 'utils/spotify';

import { clearUrlParams } from 'utils/helpers';

function App() {
  const defaultPlaylistName = 'Name Your Playlist';

  const [searchResultsTracks, setSearchResultsTracks] = useState(searchResultsTracksMock);
  const [playlistTracks, setPlaylistTracks] = useState(playlistTracksMock);
  const [playlistName, setPlaylistName] = useState(defaultPlaylistName);
  const [spotifyAccessToken, setSpotifyAccessToken] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [searchButtonText, setSearchButtonText] = useState('Search');
  const [isSearchButtonActive, setIsSearchButtonActive] = useState(true);

  const [savePlaylistButtonText, setSavePlaylistButtonText] = useState('Save to Spotify');
  const [isSavePlaylistButtonActive, setIsSavePlaylistButtonActive] = useState(true);

  useEffect(() => {
    // TODO tracks.length !== 0 && isSavePlaylistButtonActive
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

  const getSpotifyAccessToken = () => {
    if (isSpotifyAccessTokenExpired()) {
      setSearchButtonText('Requesting Spotify Access Token...');
      setIsSearchButtonActive(false);
      requestSpotifyAccessToken();

      return null;
    }

    const token = localStorage.getItem('spotifyAccessToken');

    if (token) {
      setSpotifyAccessToken(token);
      return token;
    }

    return null;
  };

  const isSpotifyAccessTokenAvailable = () => {
    if (!spotifyAccessToken) {
      const tokenFromLocalStorage = getSpotifyAccessToken();
      console.log(`token from storage is ${tokenFromLocalStorage}`);

      if (tokenFromLocalStorage) {
        setSpotifyAccessToken(tokenFromLocalStorage);

        return true;
      }
    } else {
      return true;
    }

    console.log('Failed to retrieve Spotify Access Token');

    return false;
  };


  const handleSearchButtonClick = (e) => {
    e.preventDefault();

    console.log(searchQuery);

    setSearchButtonText('Searching...');
    setIsSearchButtonActive(false);

    if (!isSpotifyAccessTokenAvailable()) {
      return;
    }

    console.log('Fetching tracks');

    // axios.get()

    setSearchResultsTracks(searchResultsTracksMock);

    setTimeout(() => {
      setSearchButtonText('Search');
      setIsSearchButtonActive(true);
    }, 1000);
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
    console.log(localStorage.getItem('spotifyAccessToken'));
    console.log(spotifyAccessToken);

    setIsSavePlaylistButtonActive(false);
    setSavePlaylistButtonText('Saving playlist...');

    if (!isSpotifyAccessTokenAvailable()) {
      console.log('Cannot save playlist - Spotify Access Token is missing');
      setIsSavePlaylistButtonActive(true);
      setSavePlaylistButtonText('Save to Spotify');
      return;
    }

    const spotifyUris = playlistTracks.map(track => track.uri);
    console.log('Saving playlist with URIs:', spotifyUris);

    setPlaylistTracks([]);
    setPlaylistName(defaultPlaylistName);

    setTimeout(() => {
      setIsSavePlaylistButtonActive(true);
      setSavePlaylistButtonText('Save to Spotify');
    }, 1000);
  };

  return (
    <PageWrapper>
      <Header />
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchButtonClick={handleSearchButtonClick}
          searchButtonText={searchButtonText}
          isSearchButtonActive={isSearchButtonActive}
        />
        <div className="columns">
          <SearchResults
            tracks={searchResultsTracks}
            handleAddTrack={handleAddTrack}
            searchButtonText={searchButtonText}
          />
          <Playlist
            playlistName={playlistName}
            setPlaylistName={setPlaylistName}
            savePlaylistButtonText={savePlaylistButtonText}
            isSavePlaylistButtonActive={isSavePlaylistButtonActive}
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
