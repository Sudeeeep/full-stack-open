const Filter = ({ setNewFilter }) => {
  return (
    <div>
      Filter shown with
      <input onChange={(e) => setNewFilter(e.target.value)} />
    </div>
  );
};

export default Filter;
