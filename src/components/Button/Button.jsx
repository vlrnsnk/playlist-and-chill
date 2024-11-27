const Button = ({ innerText, addedClasses }) => {
  return (
    <button className={`button${addedClasses && ` ${addedClasses}`}`}>
      {innerText}
    </button>
  );
};

export { Button };
