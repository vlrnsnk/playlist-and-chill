import './App.css';

import { Header } from 'components/Header/Header';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { SearchResults } from 'components/SearchResults/SearchResults';
import { Playlist } from 'components/Playlist/Playlist';
import { Footer } from 'components/Footer/Footer';

import { searchResultsSongs } from 'mocks/searchResultsSongs';
import { playlistSongs } from 'mocks/playlistSongs';

function App() {
  return (
    <>
      <Header />
      <SearchBar />
      <SearchResults songs={searchResultsSongs} />
      <Playlist songs={playlistSongs} />
      <Footer />
    </>
  );
}

export default App;
