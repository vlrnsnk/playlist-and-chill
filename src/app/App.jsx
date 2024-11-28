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

  return (
    <PageWrapper>
      <Header />
        <SearchBar />
        <div className="columns">
          <SearchResults songs={searchResultsSongs} />
          <Playlist songs={playlistSongs} />
        </div>
        <Footer />
    </PageWrapper>
  );
}

export default App;
