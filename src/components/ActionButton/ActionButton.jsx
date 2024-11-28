const ActionButton = ({ action }) => {
  return (
    <button className="button is-size-4 has-text-warning has-background-info-15">
      <span className="is-size-4 is-bold">
        {action === "add" ? "+" : "-"}
      </span>
    </button>
  );
};

export { ActionButton };
