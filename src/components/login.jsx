import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ redirectTo }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleValidation = () => {
    let errors = {};
    let isValid = true;

    if (!username) {
      errors.username = "Username is required";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const authenticate = async (username, password) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyABCE05u-QC9JErTA0Ing46YpgBXDinDG4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const token = data.idToken;
      // You can store the token in local storage or a cookie for future authenticated requests
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const isAuthenticated = await authenticate(username, password);
      if (isAuthenticated) {
        navigate(redirectTo);
      } else {
        setErrors({ authentication: "Invalid username or password" });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <span>{errors.username}</span>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <button type="submit">Login</button>
      {errors.authentication && <div>{errors.authentication}</div>}
    </form>
  );
};

export default LoginPage;
