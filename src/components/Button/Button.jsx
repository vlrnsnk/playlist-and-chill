const Button = ({ innerText, addedClasses }) => {
  return (
    <button className={`button is-medium${addedClasses && ` ${addedClasses}`}`}>
      {innerText}
    </button>
  );
};

export { Button };
