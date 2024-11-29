const Header = () => {
  return (
    <header>
      <div
        className="p-4 has-background-info-15 has-text-info-85"
        data-testid="header-container"
      >
        <h1 className="has-text-centered has-text-warning is-size-1 has-text-weight-bold">
          Playlist & Chill
        </h1>
      </div>
    </header>
  );
};

export { Header };
