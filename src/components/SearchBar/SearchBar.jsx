import { Button } from "components/Button/Button";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  handleSearchButtonClick,
  searchButtonText,
  isSearchButtonActive,
}) => {
  return (
    <form className="section has-text-centered" onSubmit={(e) => { e.preventDefault(); }} >
      <div className="field columns">
        <div className="column is-half is-offset-one-quarter">
          <input
            className="input is-medium has-background-info-85 has-text-info-15 search"
            type="text"
            name="search"
            placeholder="Enter a title, album, or artist"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <Button
        innerText={searchButtonText}
        isActive={isSearchButtonActive}
        addedClasses="has-background-info-15 has-text-warning"
        handleClick={(e) => handleSearchButtonClick(e)}
      />
    </form>
  );
};

export { SearchBar };
