import './App.css';

import { PageWrapper } from 'layout/PageWrapper/PageWrapper';
import { Header } from 'components/Header/Header';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { SearchResults } from 'components/SearchResults/SearchResults';
import { Playlist } from 'components/Playlist/Playlist';
import { Footer } from 'components/Footer/Footer';

import { searchResultsTracksMock } from 'mocks/searchResultsTracks';
import { playlistTracksMock } from 'mocks/playlistTracks';
import { useState } from 'react';

function App() {
  const [searchResultsTracks, setSearchResultsTracks] = useState(searchResultsTracksMock);
  const [playlistTracks, setPlaylistTracks] = useState(playlistTracksMock);

  const handleSearchButtonClick = (e) => {
    e.preventDefault();

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
