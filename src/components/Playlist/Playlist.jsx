import { Button } from "components/Button/Button";
import { Tracklist } from "components/Tracklist/Tracklist";

const Playlist = ({ songs }) => {
  return (
    <section className="section column">
      <div className="content has-text-info-85 has-background-info-15 box is-rounded p-5">
        <input className="input is-medium has-background-info-15 has-text-info-85 playlist-name pt-0" type="text" placeholder="Name Your Playlist" />
        <hr className="has-background-info-25 mt-" />
        <Tracklist songs={songs} />
        <div className="has-text-centered">
          <Button innerText="Save to Spotify" addedClasses="has-background-warning has-text-info-15" />
        </div>
      </div>
    </section>
  );
};

export { Playlist };
