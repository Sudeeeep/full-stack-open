import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService.getAllPersons().then((returnedPersons) => {
      setPersons(returnedPersons);
    });
  }, []);

  const addNewContact = (e) => {
    e.preventDefault();
    const newObj = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newName)) {
      const requiredPerson = persons.find((person) => person.name === newName);

      if (
        window.confirm(
          `${newName} id already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .updatePerson(requiredPerson.id, newObj)
          .then((returnedPerson) => {
            persons.splice(requiredPerson.id - 1, 1, returnedPerson);
            setPersons([...persons]);
            setNotification(`Updated ${newName}`);
            resetNotification();
          })
          .catch((err) => {
            setNotification(
              `Information of ${newName} has already been removed from the server`
            );
            resetNotification();
          });
      }
    } else {
      personsService.addPerson(newObj).then((returnedPersons) => {
        setPersons(persons.concat(returnedPersons));
        setNotification(`Added ${newName}`);
        resetNotification();
      });
    }

    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name} ?`)) {
      personsService
        .deletePerson(id)
        .then(() => {
          persons.splice(id - 1, 1);
          setPersons([...persons]);
          setNotification(`Deleted ${name}`);
          resetNotification();
        })
        .catch((err) => {
          setNotification(
            `Information of ${name} has already been removed from the server`
          );
          resetNotification();
        });
    }
  };

  const resetNotification = () => {
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={notification} />

      <Filter setNewFilter={setNewFilter} />

      <h2>Add a New</h2>
      <PersonsForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        addNewContact={addNewContact}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        newFilter={newFilter}
        handleClick={deletePerson}
      />
    </div>
  );
};

export default App;
