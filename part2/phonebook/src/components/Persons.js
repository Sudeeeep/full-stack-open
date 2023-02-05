const Persons = ({ persons, newFilter }) => {
  return (
    <div>
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(newFilter.toLowerCase())) {
          return (
            <div key={person.name}>
              {person.name} {person.number}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Persons;
