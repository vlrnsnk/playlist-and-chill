import { Track } from "components/Track/Track";

const Tracklist = ({
  songs = [],
  action,
  handleActionButtonClick,
}) => {
  return (
    <div>
      {songs.length > 0 ? (
        <ul className="no-bullets">
          {songs.map((song, index) => (
            <li key={index}>
              <Track
                track={song}
                action={action}
                handleActionButtonClick={handleActionButtonClick}
              />
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
