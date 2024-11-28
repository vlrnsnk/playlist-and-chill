import { Track } from "components/Track/Track";

const Tracklist = ({ songs = [], action }) => {
  return (
    <div>
      {songs.length > 0 ? (
        <ul className="no-bullets">
          {songs.map((song, index) => (
            <li key={index}>
              <Track title={song.title} artist={song.artist} album={song.album} action={action} />
              <hr className="has-background-info-85" />
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
