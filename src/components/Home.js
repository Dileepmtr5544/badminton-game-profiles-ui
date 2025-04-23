import React, { useState } from 'react';

import Login from './Login';
import Register from './Register';

function Home() {
  const [showLogin, setShowLogin] = useState(true); // State to toggle between Login and Register

  const handleRadioChange = (event) => {
    setShowLogin(event.target.value === 'login');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome to the Home Page</h2>

      <div style={styles.radioContainer}>
        <label style={styles.radioLabel}>
          <input
            type="radio"
            value="login"
            checked={showLogin === true}
            onChange={handleRadioChange}
            style={styles.radioButton}
          />
          <span style={styles.radioText}>Login</span>
        </label>
        <label style={styles.radioLabel}>
          <input
            type="radio"
            value="register"
            checked={showLogin === false}
            onChange={handleRadioChange}
            style={styles.radioButton}
          />
          <span style={styles.radioText}>Register</span>
        </label>
      </div>

      {/* Conditional rendering based on radio button selection */}
      {showLogin ? (
        <div style={styles.formContainer}>
          <h3 style={styles.subHeading}>Login</h3>
          <Login />
        </div>
      ) : (
        <div style={styles.formContainer}>
          <h3 style={styles.subHeading}>Register</h3>
          <Register />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '32px',
    fontWeight: 'bold',
  },
  radioContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  radioLabel: {
    marginRight: '20px',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
  },
  radioButton: {
    marginRight: '8px',
  },
  radioText: {
    fontSize: '16px',
    color: '#555',
  },
  formContainer: {
    marginBottom: '30px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  subHeading: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#333',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    marginTop: '30px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default Home;
