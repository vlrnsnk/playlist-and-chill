import { Button } from "components/Button/Button";

const SearchBar = () => {
  return (
    <form>
      <input type="text" name="search" placeholder="search term" />
      <Button innerText="Search" />
    </form>
  );
};

export { SearchBar };
