import './App.css';

import { PageWrapper } from 'layout/PageWrapper/PageWrapper';
import { Header } from 'components/Header/Header';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { SearchResults } from 'components/SearchResults/SearchResults';
import { Playlist } from 'components/Playlist/Playlist';
import { Footer } from 'components/Footer/Footer';

import { searchResultsSongsMock } from 'mocks/searchResultsSongs';
import { playlistSongsMock } from 'mocks/playlistSongs';
import { useState } from 'react';

function App() {
  const [searchResultsSongs, setSearchResultsSongs] = useState(searchResultsSongsMock);
  const [playlistSongs, setPlaylistSongs] = useState(playlistSongsMock);

  const handleSearchButtonClick = (e) => {
    e.preventDefault();
    console.log('fetching songs');
  };

  const handleAddSong = () => {
    console.log('adding song');
  };

  const handleRemoveSong = () => {
    console.log('removing song');
  };

  const handleSavePlaylist = () => {
    console.log('saving playlist');
  };

  return (
    <PageWrapper>
      <Header />
        <SearchBar handleSearchButtonClick={handleSearchButtonClick} />
        <div className="columns">
          <SearchResults
            songs={searchResultsSongs}
            handleAddSong={handleAddSong}
          />
          <Playlist
            songs={playlistSongs}
            handleRemoveSong={handleRemoveSong}
            handleSavePlaylist={handleSavePlaylist}
          />
        </div>
        <Footer />
    </PageWrapper>
  );
}

export default App;
