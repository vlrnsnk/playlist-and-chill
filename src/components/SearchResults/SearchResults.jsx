import { Tracklist } from "components/Tracklist/Tracklist";

const SearchResults = ({
  tracks,
  handleAddTrack,
}) => {
  return (
    <section className="section column">
      <div className="content has-text-info-85 has-background-info-15 p-5 box is-rounded">
        <h2 className="pt-3 pb-5 has-text-warning">
          Search Results
        </h2>
        <hr className="has-background-info-25" />
        <Tracklist
          action="add"
          tracks={tracks}
          handleActionButtonClick={handleAddTrack}
        />
      </div>
    </section>
  );
};

export { SearchResults };
