import { ActionButton } from "components/ActionButton/ActionButton";

const Track = ({
  track,
  action,
  handleActionButtonClick,
}) => {
  const { title, artist, album } = track;

  return (
    <div className="columns is-mobile is-vcentered">
      <div className="column">
        <h3>{title}</h3>
        <p>{artist} | {album}</p>
      </div>
        <div className="column is-narrow">
          <ActionButton
            action={action}
            track={track}
            handleActionButtonClick={handleActionButtonClick}
          />
        </div>
    </div>
  );
};

export { Track };
