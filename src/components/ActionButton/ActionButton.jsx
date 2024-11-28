const ActionButton = ({
  action,
  handleActionButtonClick,
  songId,
}) => {
  return (
    <button
      className="button is-size-4 has-text-warning has-background-info-15"
      onClick={() => handleActionButtonClick(songId)}
    >
      <span className="is-size-4 is-bold">
        {action === "add" ? "+" : "-"}
      </span>
    </button>
  );
};

export { ActionButton };
