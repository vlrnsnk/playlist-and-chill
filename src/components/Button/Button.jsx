const Button = ({
  innerText,
  isActive,
  addedClasses,
  handleClick,
}) => {
  return (
    <button
      className={`button is-medium${addedClasses && ` ${addedClasses}`}`}
      onClick={handleClick}
      disabled={!isActive}
      >
      {innerText}
    </button>
  );
};

export { Button };
