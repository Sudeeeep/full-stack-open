const PersonsForm = ({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  addNewContact,
}) => {
  return (
    <form onSubmit={addNewContact}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonsForm;
