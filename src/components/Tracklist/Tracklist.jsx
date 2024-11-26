import { Track } from "components/Track/Track";

const Tracklist = ({ songs = [] }) => {
  return (
    <div>
      {songs.length > 0 ? (
        <ul>
          {songs.map((song, index) => (
            <li key={index}>
              <Track title={song.title} artist={song.artist} />
            </li>
          ))}
        </ul>
       ) : (
        <p>No songs</p>
       )}
    </div>
  );
};

export { Tracklist };
