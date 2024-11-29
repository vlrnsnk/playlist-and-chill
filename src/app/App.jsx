import { useState, useEffect } from 'react';

import './App.css';

import { PageWrapper } from 'layout/PageWrapper/PageWrapper';
import { Header } from 'components/Header/Header';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { SearchResults } from 'components/SearchResults/SearchResults';
import { Playlist } from 'components/Playlist/Playlist';
import { Footer } from 'components/Footer/Footer';

import {
  requestSpotifyAccessToken,
  isSpotifyAccessTokenExpired,
  createAndPopulatePlaylist,
  fetchSpotifyTracks,
} from 'utils/spotify';

import { clearUrlParams } from 'utils/helpers';

function App() {
  const defaultPlaylistName = 'Name Your Playlist';

  const [searchResultsTracks, setSearchResultsTracks] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState(defaultPlaylistName);
  const [spotifyAccessToken, setSpotifyAccessToken] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [searchButtonText, setSearchButtonText] = useState('Search');
  const [isSearchButtonActive, setIsSearchButtonActive] = useState(true);

  const [savePlaylistButtonText, setSavePlaylistButtonText] = useState('Save to Spotify');
  const [isSavePlaylistButtonActive, setIsSavePlaylistButtonActive] = useState(true);

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

  const getSpotifyAccessToken = () => {
    if (isSpotifyAccessTokenExpired()) {
      setSearchButtonText('Requesting Spotify Access Token...');
      setIsSearchButtonActive(false);
      requestSpotifyAccessToken();

      return null;
    }

    if (spotifyAccessToken) {
      return spotifyAccessToken;
    }

    const tokenFromLocalStorage = localStorage.getItem('spotifyAccessToken');

    if (tokenFromLocalStorage) {
      setSpotifyAccessToken(tokenFromLocalStorage);

      return tokenFromLocalStorage;
    }

    return null;
  };

  const handleSearchButtonClick = async (e) => {
    e.preventDefault();

    console.log(searchQuery);
    const spotifyAccessToken = getSpotifyAccessToken();

    setSearchButtonText('Searching...');
    setIsSearchButtonActive(false);

    console.log('Fetching tracks');

    try {
      const foundTracks = await fetchSpotifyTracks(searchQuery, spotifyAccessToken);
      setSearchResultsTracks(foundTracks);
    } catch (error) {
      setSearchResultsTracks([]);
      console.log(`Search failed: ${error.message}`);
    } finally {
      setSearchQuery('');
      setSearchButtonText('Search');
      setIsSearchButtonActive(true);
    }
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

  const handleSavePlaylist = async () => {
    const spotifyAccessToken = getSpotifyAccessToken();

    setIsSavePlaylistButtonActive(false);
    setSavePlaylistButtonText('Saving playlist...');

    if (!spotifyAccessToken) {
      console.log('Cannot save playlist - Spotify Access Token is missing');
      setIsSavePlaylistButtonActive(true);
      setSavePlaylistButtonText('Save to Spotify');

      return;
    }

    const spotifyUris = playlistTracks.map(track => track.uri);
    console.log('Saving playlist with URIs:', spotifyUris);

    try {
      const playlist = await createAndPopulatePlaylist(spotifyAccessToken, playlistName, spotifyUris);
      console.log(`Playlist saved: ${playlist}`);
    } catch (error) {
      console.log(`Error saving playlist: ${error.message}`);
    } finally {
      setIsSavePlaylistButtonActive(true);
      setSavePlaylistButtonText('Playlist saved!');
      setPlaylistTracks([]);
      setPlaylistName(defaultPlaylistName);

      setTimeout(() => {
        setSavePlaylistButtonText('Save to Spotify');
      }, 2000);
    }
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
