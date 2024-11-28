import { ActionButton } from "components/ActionButton/ActionButton";

const Track = ({
  song,
  action,
  handleActionButtonClick,
}) => {
  const { id, title, artist, album } = song;

  return (
    <div className="columns is-mobile is-vcentered">
      <div className="column">
        <h3>{title}</h3>
        <p>{artist} | {album}</p>
      </div>
        <div className="column is-narrow">
          <ActionButton
            action={action}
            songId={id}
            handleActionButtonClick={handleActionButtonClick}
          />
        </div>
    </div>
  );
};

export { Track };
