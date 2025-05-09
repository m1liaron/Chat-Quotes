import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppPath } from '../../common/app/AppPath';
import axios from 'axios';
import { serverApi } from '../../common/app/ApiPath';
import { useUser } from '../../contexts/UserProvider';
import { GoogleCredentialResponse, GoogleLogin } from '@react-oauth/google';

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');
      const response = await axios.post(`${serverApi}/auth/register`, { firstName, lastName, email, password });
    if (response.status <= 400) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate(AppPath.Root);
      } else {
          setError(response.data.error.message);
      }
  };

  const handleGoogleLogin = async (credentials: GoogleCredentialResponse) => {
    if(credentials?.credential) {
      const response = await axios.post(`${serverApi}/auth/google-login`, { credential: credentials.credential});
      if (response.status <= 400) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate(AppPath.Root);
      } else {
          setError(response.data.error.message);
      }
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">Login</h2>

        {error && <p className="login-error">{error}</p>}

        <div>
          <label className="login-label">Firstname</label>
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="login-input"
            placeholder="Alex"
          />
              </div>
        <div>
                  
        <label className="login-label">Lastname</label>
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className="login-input"
            placeholder="Konopla"
          />
        </div>


        <div>
          <label className="login-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="login-input"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="login-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="login-input"
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
         <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.log("Login failed")}/>
        <Link to={AppPath.Login}>Already have an account?</Link>      
      </form>
    </div>
  );
};

export { RegisterPage };
