import React, { useState } from 'react';
import './LoginPage.styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { AppPath } from '../../common/app/AppPath';
import { serverApi } from '../../common/app/ApiPath';
import axios from 'axios';
import { useUser } from '../../contexts/UserProvider';
import { GoogleCredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

type GoogleCredentials = {
  email: string;
  family_name: string;
  given_name: string
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');
      const response = await axios.post(`${serverApi}/auth/login`, { email, password });
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
      const data: GoogleCredentials = jwtDecode(credentials.credential);
      const userData = {
        email: data.email,
        firstName: data.given_name,
        lastName: data.family_name
      }
      const response = await axios.post(`${serverApi}/login-google`, userData);
      if (response.status <= 400) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate(AppPath.Root);
      } else {
          setError(response.data.error.message);
      }
      console.log(data)
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">Login</h2>

        {error && <p className="login-error">{error}</p>}


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
        <Link to={AppPath.Register}>Don't have an account?</Link>      
      </form>
    </div>
  );
};

export { LoginPage };
