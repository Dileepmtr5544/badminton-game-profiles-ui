import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    password: '',
    age: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Registered successfully!');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>ID:</label>
        <input
          name="id"
          type="number"
          placeholder="Enter ID"
          onChange={handleChange}
          style={styles.input}
        />

        <label style={styles.label}>Username:</label>
        <input
          name="username"
          placeholder="Enter username"
          onChange={handleChange}
          style={styles.input}
        />

        <label style={styles.label}>Password:</label>
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          onChange={handleChange}
          style={styles.input}
        />

        <label style={styles.label}>Age:</label>
        <input
          name="age"
          type="number"
          placeholder="Enter age"
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Register;
