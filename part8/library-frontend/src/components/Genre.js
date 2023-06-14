const Genre = ({ setGenre }) => {
  return (
    <>
      <h2>Filter by genre: </h2>
      <div>
        <button onClick={() => setGenre("fiction")}>fiction</button>
        <button onClick={() => setGenre("non-fiction")}>non-fiction</button>
        <button onClick={() => setGenre("novel")}>novel</button>
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </>
  );
};

export default Genre;
