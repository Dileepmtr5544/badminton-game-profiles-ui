import React, { useState } from 'react';
import axios from 'axios';

const AddPlayer = () => {
  const [id, setId] = useState('');          // Store the player ID
  const [name, setName] = useState('');      // Store the player name
  const [gameType, setGameType] = useState('');  // Store the game type
  const [gender, setGender] = useState('');  // Store the gender
  const [contactNo, setContactNo] = useState(''); // Store the contact number

  const token = localStorage.getItem('token');  // Retrieve the token from localStorage

  console.log('Token from localStorage', token);

  const handleAddPlayer = async () => {
    // Basic validation for required fields
    if (!id || !name || !gameType || !gender || !contactNo) {
      alert('All fields are required!');
      return;
    }

    try {
      console.log(token);

      // Make API call to add player with all the collected data
      await axios.post('http://localhost:8080/addPlayer',
        { id, name, gameType, gender, contactNo },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      alert('Player added successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to add player...');
    }
  };

  return (
    <div>
      <h2>Add Player</h2>

      {/* ID input */}
      <input
        type="text"
        placeholder="Id"
        value={id}
        onChange={e => setId(e.target.value)}
      /><br />

      {/* Name input */}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      /><br />

      {/* Game Type input */}
      <input
        type="text"
        placeholder="Game Type"
        value={gameType}
        onChange={e => setGameType(e.target.value)}
      /><br />

      {/* Gender input */}
      <input
        type="text"
        placeholder="Gender"
        value={gender}
        onChange={e => setGender(e.target.value)}
      /><br />

      {/* Contact No input */}
      <input
        type="text"
        placeholder="Contact No"
        value={contactNo}
        onChange={e => setContactNo(e.target.value)}
      /><br />

      {/* Add button */}
      <button onClick={handleAddPlayer}>Add</button>
    </div>
  );
};

export default AddPlayer;
