import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Main = () => {
  const [sport, setSport] = useState('');
  const [time, setTime] = useState('');
  const [numPlayers, setNumPlayers] = useState(0);
  const [games, setGames] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [token, setToken] = useState('');
  const [isPlayerListOpen, setIsPlayerListOpen] = useState(true);
  const [selectionFinalized, setSelectionFinalized] = useState(false);
  const [isPlayerSelectionVisible, setIsPlayerSelectionVisible] = useState(true);

  //Game details
const [game, setGame] = useState(null); // holds the current game
const [isGameFormVisible, setIsGameFormVisible] = useState(false);
const [gameName, setGameName] = useState('');
const [teamA, setTeamA] = useState([]);
const [teamB, setTeamB] = useState([]);
const [winner, setWinner] = useState('');
const [score, setScore] = useState('');

  // Fetch players on page load
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/players', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setPlayers(response.data); // Assuming the response contains the players list
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    fetchPlayers();
  }, [token]);

  const handleSportChange = (event) => {
    setSport(event.target.value);
    setTime('');
    setSelectedPlayers([]);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleNumPlayersChange = (event) => {
      setNumPlayers(event.target.value);
      // Clear selected players if the number of players is changed
      setSelectedPlayers([]);
    };

  const handleAddPlayer = async (id, name, gameType, gender, contactNo) => {
    try {
      await axios.post(
        'http://localhost:8080/addPlayer',
        { id, name, gameType, gender, contactNo },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      alert('Player added successfully!');
      // Fetch players again after adding a new one
      const response = await axios.get('http://localhost:8080/players', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setPlayers(response.data); // Update the players list
    } catch (error) {
      console.error('Error adding player:', error);
      alert('Error adding player!');
    }
  };

const handleAddGame = (newGame) => {
  const exists = games.some((g) => g.gameName === newGame.gameName);
  if (exists) {
    alert('Game with this name already exists!');
    return;
  }
  setGames([...games, newGame]);
};


const handleSelectPlayer = (player) => {
  if (selectionFinalized) return; // prevent changes after finalization

  const isSelected = selectedPlayers.find((p) => p.id === player.id);

  if (isSelected) {
    setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
  } else {
    if (selectedPlayers.length < parseInt(numPlayers)) {
      setSelectedPlayers([...selectedPlayers, player]);
    } else {
      alert(`Only ${numPlayers} players can be selected for a game!`);
    }
  }
};


const handleAddOrUpdateGame = () => {
  const newGame = {
    gameName,
    teamA,
    teamB,
    winner,
    score,
  };

  setGame(newGame);
  setIsGameFormVisible(false); // hide form after submission
};

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Select your game!</h2>

      <div style={styles.formContainer}>
        <div style={styles.formGroup}>
          <label htmlFor="sport" style={styles.label}>Select Sport: </label>
          <select
            id="sport"
            value={sport}
            onChange={handleSportChange}
            style={styles.select}
          >
            <option value="">--Select Sport--</option>
            <option value="cricket">Cricket</option>
            <option value="badminton">Badminton</option>
            <option value="swimming">Swimming</option>
          </select>
        </div>

{sport && (
  <div style={styles.formGroup}>
    <label htmlFor="fromTime" style={styles.label}>Game start time: </label>
    <select
      id="fromTime"
      value={time.from}
      onChange={(e) => setTime({ ...time, from: e.target.value })}
      style={styles.select}
    >
      <option value="">--From--</option>
      {[...Array(24).keys()].map(hour => (
        <option key={hour} value={`${hour}:00`}>
          {`${hour.toString().padStart(2, '0')}:00`}
        </option>
      ))}
    </select>

    <label htmlFor="toTime" style={{ ...styles.label, marginLeft: '0rem' }}>Game end time: </label>
    <select
      id="toTime"
      value={time.to}
      onChange={(e) => setTime({ ...time, to: e.target.value })}
      style={styles.select}
    >
      <option value="">--To--</option>
      {[...Array(24).keys()].map(hour => (
        <option key={hour} value={`${hour + 1}:00`}>
          {`${(hour + 1).toString().padStart(2, '0')}:00`}
        </option>
      ))}
    </select>
  </div>
)}

        {time && (
          <div style={styles.formGroup}>
            <label htmlFor="numPlayers" style={styles.label}>Select Number of Players: </label>
            <input
              type="number"
              id="numPlayers"
              value={numPlayers}
              onChange={handleNumPlayersChange}
              style={styles.input}
            />
          </div>
        )}


{numPlayers > 0 && isPlayerSelectionVisible && (
  <div style={styles.playersContainer}>
    <h4>Select Players (Max: {numPlayers})</h4>

    <div>
      <button
        style={styles.button}
        onClick={() => {
          const id = prompt('Enter player id:');
          const name = prompt('Enter player name:');
          const gender = prompt('Enter player gender:');
          const contactNo = prompt('Enter player contactNo:');
          const gameType = prompt('Enter player gameLevel:');
          if (name && gameType) {
            handleAddPlayer(id, name, gameType, gender, contactNo);
          } else {
            alert('Invalid input!');
          }
        }}
      >
        Add Player
      </button>
    </div>

    <ul style={styles.playerList}>
      {players.map((player) => {
        const isSelected = selectedPlayers.some((p) => p.id === player.id);
        return (
          <li key={player.id} style={styles.playerListItem}>
            <span>{player.name}</span>
            <button
              style={{
                ...styles.selectButton,
                backgroundColor: isSelected ? '#dc3545' : '#28a745', // red for deselect
              }}
              onClick={() => handleSelectPlayer(player)}
            >
              {isSelected ? 'Deselect' : 'Select'}
            </button>
          </li>
        );
      })}
    </ul>
  </div>
)}


{selectedPlayers.length > 0 && (
  <div style={styles.gamesContainer}>
    <button
      style={styles.button}
      onClick={() => setIsGameFormVisible(!isGameFormVisible)}
    >
      {isGameFormVisible ? 'Cancel' : 'Add Game'}
    </button>

    {isGameFormVisible && (
      <div style={styles.gameForm}>
        <label>Game Name: </label>
        <select
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Game</option>
          {['Game1', 'Game2', 'Game3', 'Game4', 'Game5', 'Game6'].map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <label>Team A: </label>
        <select
          multiple
          value={teamA}
          onChange={(e) => setTeamA([...e.target.selectedOptions].map(o => o.value))}
          style={styles.input}
        >
          {selectedPlayers.map(player => (
            <option key={player.id} value={player.name}>{player.name}</option>
          ))}
        </select>

        <label>Team B: </label>
        <select
          multiple
          value={teamB}
          onChange={(e) => setTeamB([...e.target.selectedOptions].map(o => o.value))}
          style={styles.input}
        >
          {selectedPlayers.map(player => (
            <option key={player.id} value={player.name}>{player.name}</option>
          ))}
        </select>

        <label>Winner: </label>
        <select
          value={winner}
          onChange={(e) => setWinner(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Winner</option>
          <option value="Team A">Team A</option>
          <option value="Team B">Team B</option>
        </select>

        <label>Score: </label>
        <input
          type="text"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="Score"
          style={styles.input}
        />

        <button
          style={styles.button}
          onClick={() => handleAddGame({
            gameName,
            teamA,
            teamB,
            winner,
            score,
          })}
        >
          Submit Game
        </button>
      </div>
    )}

<h4>Game List:</h4>
<table style={{ width: '100%', borderCollapse: 'collapse' }}>
  <thead>
    <tr>
      <th style={styles.th}>Game Name</th>
      <th style={styles.th}>Team A</th>
      <th style={styles.th}>Team B</th>
      <th style={styles.th}>Winner</th>
      <th style={styles.th}>Score</th>
    </tr>
  </thead>
  <tbody>
    {games.map((game, index) => (
      <tr key={index} style={styles.tr}>
        <td style={styles.td}>{game.gameName}</td>
        <td style={styles.td}>{game.teamA.join(', ')}</td>
        <td style={styles.td}>{game.teamB.join(', ')}</td>
        <td style={styles.td}>{game.winner}</td>
        <td style={styles.td}>{game.score}</td>
      </tr>
    ))}
  </tbody>
</table>

  </div>
)}

      </div>

<div style={styles.playerListContainer(isPlayerListOpen)}>
  <button
    onClick={() => setIsPlayerListOpen(!isPlayerListOpen)}
    style={styles.toggleButton}
  >
    {isPlayerListOpen ? '➖' : '➕'}
  </button>
      {isPlayerListOpen && (
        <>
          <h3>Players List</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Gender</th>
                <th style={styles.th}>Contact No</th>
              </tr>
            </thead>
            <tbody>
              {selectedPlayers.map((player) => (
                <tr key={player.id}>
                  <td style={styles.td}>{player.id}</td>
                  <td style={styles.td}>{player.name}</td>
                  <td style={styles.td}>{player.gender}</td>
                  <td style={styles.td}>{player.contactNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {selectedPlayers.length === parseInt(numPlayers) && !selectionFinalized && (
        <button
          style={{
            ...styles.button,
            backgroundColor: '#ffc107',
            marginTop: '10px'
          }}
          onClick={() => {
            setSelectionFinalized(true);
            setIsPlayerSelectionVisible(false); // minimize list
          }}
        >
          Finalize Selection
        </button>
      )}

      {selectionFinalized && (
        <button
          style={{
            ...styles.button,
            backgroundColor: '#17a2b8',
            marginTop: '10px',
            marginLeft: '10px'
          }}
        onClick={() => {
          setSelectionFinalized(false);
          setIsPlayerSelectionVisible(true); // open list
        }}
        >
          Update Selection
        </button>
      )}

      <h4>Game List:</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={styles.th}>Game Name</th>
            <th style={styles.th}>Team A</th>
            <th style={styles.th}>Team B</th>
            <th style={styles.th}>Winner</th>
            <th style={styles.th}>Score</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <tr key={index} style={styles.tr}>
              <td style={styles.td}>{game.gameName}</td>
              <td style={styles.td}>{game.teamA.join(', ')}</td>
              <td style={styles.td}>{game.teamB.join(', ')}</td>
              <td style={styles.td}>{game.winner}</td>
              <td style={styles.td}>{game.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

            {selectionFinalized && (
              <button
                style={{
                  ...styles.button,
                  backgroundColor: '#17a2b8',
                  marginTop: '10px',
                  marginLeft: '10px'
                }}
              onClick={() => {
                setSelectionFinalized(false);
                setIsPlayerSelectionVisible(true); // open list
              }}
              >
                Update Games
              </button>
            )}


    </div>




    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '36px',
    marginBottom: '20px',
    color: '#333',
  },
  subheader: {
    fontSize: '20px',
    color: '#555',
    marginBottom: '40px',
  },
  links: {
    marginTop: '20px',
    marginBottom: '30px',
  },
  link: {
    margin: '0 15px',
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '18px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '30px',
  },
  formGroup: {
    marginBottom: '20px',
    textAlign: 'left',
    width: '300px',
  },
  label: {
    fontSize: '18px',
    marginBottom: '5px',
  },
  select: {
    fontSize: '16px',
    padding: '10px',
    width: '100%',
    marginTop: '5px',
  },
  input: {
    fontSize: '16px',
    padding: '10px',
    width: '100%',
    marginTop: '5px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '12px 18px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
  },
  playersContainer: {
    marginTop: '20px',
    width: '80%',
    maxWidth: '600px',
  },
  playerItem: {
    padding: '8px',
    margin: '5px 0',
    backgroundColor: '#e8f4fd',
    borderRadius: '5px',
  },
  gamesContainer: {
    marginTop: '30px',
    width: '80%',
    maxWidth: '600px',
  },
  gameForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  gameItem: {
    padding: '12px',
    backgroundColor: '#e8f4fd',
    marginTop: '10px',
    borderRadius: '5px',
  },
playerListContainer: (isOpen) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  height: '100vh',
  width: isOpen ? '550px' : '160px',
  overflowY: 'auto',
  backgroundColor: '#ffffff',
  borderLeft: '1px solid #ddd',
  padding: '10px',
  boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
  zIndex: 1000,
  transition: 'width 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: isOpen ? 'flex-start' : 'center',
}),

toggleButton: {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  padding: '6px 10px',
  cursor: 'pointer',
  fontSize: '16px',
  alignSelf: 'flex-end',
  marginBottom: '10px',
},
playerList: {
  listStyleType: 'none',
  padding: 0,
  width: '100%',
},

playerListItem: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #ccc',
  backgroundColor: '#fff',
  borderRadius: '5px',
  marginBottom: '10px',
},

selectButton: {
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
},
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '5px',
    border: '5px solid #ddd',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'left',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  tr: {
    borderBottom: '1px solid #ddd',
  },
};

export default Main;
