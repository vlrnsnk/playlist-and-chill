import { Button } from "components/Button/Button";

const SearchBar = () => {
  return (
    <form className="section has-text-centered">
      <div className="field columns">
        <div className="column is-half is-offset-one-quarter">
          <input className="input is-medium has-background-info-85 has-text-info-15" type="text" name="search" placeholder="search term" />
        </div>
      </div>
      <Button innerText="Search" addedClasses="has-background-info-15 has-text-info-85" />
    </form>
  );
};

export { SearchBar };
