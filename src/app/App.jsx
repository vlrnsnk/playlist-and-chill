import './App.css';

import { PageWrapper } from 'layout/PageWrapper/PageWrapper';
import { Header } from 'components/Header/Header';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { SearchResults } from 'components/SearchResults/SearchResults';
import { Playlist } from 'components/Playlist/Playlist';
import { Footer } from 'components/Footer/Footer';

import { searchResultsSongs } from 'mocks/searchResultsSongs';
import { playlistSongs } from 'mocks/playlistSongs';

function App() {
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
