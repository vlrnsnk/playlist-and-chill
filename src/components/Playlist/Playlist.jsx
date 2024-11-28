import { Button } from "components/Button/Button";
import { Tracklist } from "components/Tracklist/Tracklist";

const Playlist = ({
  playlistName,
  setPlaylistName,
  tracks,
  handleRemoveTrack,
  handleSavePlaylist,
}) => {
  return (
    <section className="section column">
      <div className="content has-text-info-85 has-background-info-15 box is-rounded p-5">
        <input
          className="input is-medium has-background-info-15 has-text-info-85 playlist-name pt-0"
          type="text"
          name="playlist-name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        <hr className="has-background-info-25" />
        <Tracklist
          tracks={tracks}
          action="remove"
          handleActionButtonClick={handleRemoveTrack}
        />
        <div className="has-text-centered">
          <Button
            innerText="Save to Spotify"
            addedClasses="has-background-warning has-text-info-15"
            handleSavePlaylist={handleSavePlaylist}
          />
        </div>
      </div>
    </section>
  );
};

export { Playlist };
