import { Button } from "components/Button/Button";
import { Tracklist } from "components/Tracklist/Tracklist";

const Playlist = () => {
  return (
    <>
      <h2>Playlist</h2>
      <Tracklist />
      <Button innerText="Save to Spotify" />
    </>
  );
};

export { Playlist };
