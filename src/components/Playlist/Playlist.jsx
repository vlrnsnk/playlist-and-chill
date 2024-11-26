import { Button } from "components/Button/Button";
import { Tracklist } from "components/Tracklist/Tracklist";

const Playlist = ({ songs }) => {
  return (
    <>
      <h2>Playlist</h2>
      <Tracklist songs={songs} />
      <Button innerText="Save to Spotify" />
    </>
  );
};

export { Playlist };
