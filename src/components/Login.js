import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../axiosConfig';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post('/auth/login', credentials);
        
        if (response.data.token && response.data.role) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role); // Save role
            navigate('/');
            window.location.reload();
        } else {
            throw new Error("Invalid login response");
        }
    } catch (error) {
        setError(error.response?.data || 'An error occurred during login');
        console.error('Login error:', error.response?.data);
    }
};


  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="text-center mt-3">
                <small>
                  Don't have an account? <a href="/register" className="text-primary">Register</a>
                </small>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;