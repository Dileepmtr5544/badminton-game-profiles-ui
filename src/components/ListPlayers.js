import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListPlayers = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
   // const token = localStorage.getItem('token'); // Get token from storage

    axios.get('http://localhost:8080/players')
    .then(res => setPlayers(res.data))
    .catch(err => {
      console.error(err);
      alert('Failed to load players.');
    });
  }, []);

  return (
    <div>
      <h2>Players List</h2>
      <ul>
        {players.map(player => (
          <li key={player.id}>
            {player.name} ({player.gameType}) ({player.contactNo}) ({player.gender})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPlayers;

