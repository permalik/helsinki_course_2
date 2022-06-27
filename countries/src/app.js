import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchParams, setSearchParams] = useState('');

  useEffect(() => {
    console.log('effect');
    axios.get('https://restcountries.com/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);
  return (
    <div>
      <div>
        Search:{' '}
        <input onChange={(e) => setSearchParams(e.target.value)} type='text' />
      </div>
      <ul>
        {countries &&
          countries.map((country, index) =>
            country.name.includes(searchParams) ? (
              <li key={index} style={{ listStyle: 'none' }}>
                {country.name}
              </li>
            ) : null
          )}
      </ul>
    </div>
  );
};

export default App;
