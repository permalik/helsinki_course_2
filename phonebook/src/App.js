import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 1112223333 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState(0);
  const [searchParams, setSearchParams] = useState('');
  const [notes, setNotes] = useState({});

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

  useEffect(() => {
    axios.get('https://localhost:3001/persons').then((res) => {
      console.log(res.data);
      setNotes(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <div>{notes}</div>
      <h2>Filter</h2>
      <div>
        Search:{' '}
        <input onChange={(e) => setSearchParams(e.target.value)} type='text' />
      </div>
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name:{' '}
          <input onChange={(e) => setNewName(e.target.value)} type='text' />
        </div>
        <div>
          Number: <input onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) =>
          person.name.includes(searchParams) ? (
            <li key={index}>
              {person.name}: {person.number}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default App;
