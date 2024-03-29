import React, { useEffect, useState } from "react";

import { register } from "../axios";
import useCatcoContext from "../CatcoContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const { currentUser, setCurrentUser } = useCatcoContext();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (currentUser) navigate("/");
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    const user = await register(email, password);

    if (user.token) {
      localStorage.setItem("token", user.token);
      setCurrentUser(user);
    }
  }

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="email">e-mail</label>
        <input type="email" placeholder="youremail@gmail.com" name="email" />
        <label htmlFor="password">password</label>
        <input type="password" placeholder="*******" name="password" />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
