import { Track } from "components/Track/Track";

const Tracklist = ({
  tracks = [],
  action,
  handleActionButtonClick,
}) => {
  return (
    <div>
      {tracks.length > 0 ? (
        <ul className="no-bullets">
          {tracks.map((track, index) => (
            <li key={index}>
              <Track
                track={track}
                action={action}
                handleActionButtonClick={handleActionButtonClick}
              />
              <hr className="has-background-info-85" />
            </li>
          ))}
        </ul>
       ) : (
        <p>No tracks</p>
       )}
    </div>
  );
};

export { Tracklist };
