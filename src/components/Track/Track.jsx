import { ActionButton } from "components/ActionButton/ActionButton";

const Track = ({ title, artist, action }) => {
  return (
    <div className="columns is-vcentered">
      <div className="column is-10">
        <h3>{title}</h3>
        <p>{artist}</p>
      </div>
        <div className="column">
          <ActionButton action={action} />
        </div>
    </div>
  );
};

export { Track };
