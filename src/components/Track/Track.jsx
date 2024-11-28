import { ActionButton } from "components/ActionButton/ActionButton";

const Track = ({ title, artist, album, action }) => {
  return (
    <div className="columns is-mobile is-vcentered">
      <div className="column">
        <h3>{title}</h3>
        <p>{artist} | {album}</p>
      </div>
        <div className="column is-narrow">
          <ActionButton action={action} />
        </div>
    </div>
  );
};

export { Track };
