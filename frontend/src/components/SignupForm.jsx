// RegistrationForm.js
import React, { useState } from 'react';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_Confirmation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { username, email, password, password_confirmation: password_confirmation } }),
    });

    if (response.ok) {
      // Handle successful registration, e.g., redirect to login page
    } else {
      // Handle registration error
      const errorData = await response.json();
      console.error('Signup error:', errorData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password_confirmation" placeholder="Password Confirmation" value={password_confirmation} onChange={(e) => setPassword_Confirmation(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
}

export default SignupForm;
