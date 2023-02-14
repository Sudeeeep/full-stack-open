const Persons = ({ persons, newFilter, handleClick }) => {
  return (
    <div>
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(newFilter.toLowerCase())) {
          return (
            <div key={person.name}>
              {person.name} {person.number}{" "}
              <button onClick={() => handleClick(person.id, person.name)}>
                DELETE
              </button>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Persons;
