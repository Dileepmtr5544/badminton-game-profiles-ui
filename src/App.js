import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AddPlayer from './components/AddPlayer';
import ListPlayers from './components/ListPlayers';
import Home from './components/Home';
import Main from './components/MainPage';

function App() {
  const location = useLocation();

  const linkStyle = (path) => ({
    marginRight: 10,
    fontWeight: location.pathname === path ? 'bold' : 'normal',
  });

  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/login" style={linkStyle('/login')}>Login</Link>
        <Link to="/register" style={linkStyle('/register')}>Register</Link>
        <Link to="/add-player" style={linkStyle('/add-player')}>Add Player</Link>
        <Link to="/list-players" style={linkStyle('/list-players')}>List Players</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} /> {/* This will render the Home component */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-player" element={<AddPlayer />} />
        <Route path="/list-players" element={<ListPlayers />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
