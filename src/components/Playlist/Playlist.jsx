import { Button } from "components/Button/Button";
import { Tracklist } from "components/Tracklist/Tracklist";

const Playlist = ({ songs }) => {
  return (
    <section className="section column">
      <div className="content has-text-info-85 has-background-info-15 box is-rounded p-5">
        <h2 className="has-text-centered">Playlist</h2>
        <hr className="has-background-info-25" />
        <Tracklist songs={songs} />
        <div className="has-text-centered">
          <Button innerText="Save to Spotify" addedClasses="has-background-info-85 has-text-info-15" />
        </div>
      </div>
    </section>
  );
};

export { Playlist };
