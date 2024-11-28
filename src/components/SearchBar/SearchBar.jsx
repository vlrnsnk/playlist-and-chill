import { Button } from "components/Button/Button";

const SearchBar = ({ handleSearchButtonClick }) => {
  return (
    <form
      className="section has-text-centered"
    >
      <div className="field columns">
        <div className="column is-half is-offset-one-quarter">
          <input
            className="input is-medium has-background-info-85 has-text-info-15 search"
            type="text"
            name="search"
            placeholder="Enter a title, album, or artist"
          />
        </div>
      </div>
      <Button
        innerText="Search"
        addedClasses="has-background-info-15 has-text-warning"
        handleClick={(e) => handleSearchButtonClick(e)}
      />
    </form>
  );
};

export { SearchBar };
