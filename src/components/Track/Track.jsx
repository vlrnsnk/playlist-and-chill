import { ActionButton } from "components/ActionButton/ActionButton";

const Track = ({ title, artist, album, action }) => {
  return (
    <div className="columns is-vcentered">
      <div className="column is-10">
        <h3>{title}</h3>
        <p>{artist} | {album}</p>
      </div>
        <div className="column">
          <ActionButton action={action} />
        </div>
    </div>
  );
};

export { Track };
