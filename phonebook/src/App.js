import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 1112223333 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newPerson = {
      name: `${newName}`,
      number: newNumber
    };

    const isAvailable = (object) =>
      JSON.stringify(object) === JSON.stringify(newPerson);

    if (persons.some(isAvailable)) {
      alert(`${newName} is already in the phonebook.`);
    } else {
      setPersons((array) => [...array, newPerson]);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>
            {person.name}: {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
