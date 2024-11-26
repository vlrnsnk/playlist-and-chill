import { Tracklist } from "components/Tracklist/Tracklist";

const SearchResults = ({ songs }) => {
  return (
    <>
      <h2>Search Results</h2>
      <Tracklist songs={songs} />
    </>
  );
};

export { SearchResults };
