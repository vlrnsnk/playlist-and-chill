import './App.css';

import { Header } from 'components/Header/Header';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { SearchResults } from 'components/SearchResults/SearchResults';
import { Playlist } from 'components/Playlist/Playlist';
import { Footer } from 'components/Footer/Footer';

function App() {
  return (
    <>
      <Header />
      <SearchBar />
      <SearchResults />
      <Playlist />
      <Footer />
    </>
  );
}

export default App;
