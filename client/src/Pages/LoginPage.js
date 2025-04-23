// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { saveUserToLocalStorage } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../css-files/LoginPage.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      saveUserToLocalStorage(res.data.token, res.data.user);
      navigate("/recommendations");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-image-section">
        <img src="/taro.jpg" alt="Login Visual" className="login-image" />
      </div>
      <div className="login-form-section">
        <form className="form-container" onSubmit={handleSubmit}>
          <h2 className="heading">Welcome Back</h2>
          {error && <p className="error-text">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input"
            required
          />
          <button type="submit" className="button">
            Log In
          </button>
          <p className="have-account">
            Don't have an account?{" "}
            <a href="/signup" className="signup-link">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
