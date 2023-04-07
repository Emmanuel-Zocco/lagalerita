import React from "react";
import LoginPage from "./LoginPage";

const ParentComponent = () => {
  const authenticate = async (username, password) => {
    // implementation of authentication logic
    return true;
  };

  return (
    <div>
      <h1>Login Page</h1>
      <LoginPage authenticate={authenticate} redirectTo="/" />
    </div>
  );
};

export default ParentComponent;
