const Button = ({
  innerText,
  addedClasses,
  handleClick,
}) => {
  return (
    <button
      className={`button is-medium${addedClasses && ` ${addedClasses}`}`}
      onClick={handleClick}
      >
      {innerText}
    </button>
  );
};

export { Button };
