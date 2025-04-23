// src/pages/Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { saveUserToLocalStorage } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../css-files/SignUpPage.css";
const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
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
        "http://localhost:5000/api/auth/signup",
        form
      );
      saveUserToLocalStorage(res.data.token, res.data.user);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image-section">
        <img
          src="/tarotsign.jpg"
          alt="Sign Up Visual"
          className="signup-image"
        />
      </div>
      <div className="signup-form-section">
        <form className="form-container" onSubmit={handleSubmit}>
          <h2 className="heading">Create Account</h2>
          {error && <p className="error-text">{error}</p>}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="input"
            required
          />
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
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={form.confirmpassword}
            onChange={handleChange}
            className="input"
            required
          />
          <button type="submit" className="sign-up-button">
            Sign Up
          </button>
          <p className="login-link">
            Already have an account?{" "}
            <a href="/login" className="text-link">
              Log In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
