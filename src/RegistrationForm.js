import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a user object with username, email, and password
    const newUser = {
      username,
      email,
      password,
    };

    // Make a POST request to the backend to register a new user
    try {
      const response = await fetch('http://localhost:8081/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        // If the registration is successful, update the status and clear the form
        setRegistrationStatus('Registration successful!');
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        // Handle error if the registration fails
        console.error('Error registering user:', response.statusText);
        setRegistrationStatus('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setRegistrationStatus('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
      {registrationStatus && <p>{registrationStatus}</p>}
    </form>
  );
};

export default RegistrationForm;
