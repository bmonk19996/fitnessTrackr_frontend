import React, { useState } from "react";
import { login } from "./API-adapt";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const setToken = props.setToken;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitLogin = async (event) => {
    event.preventDefault();
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token);
      localStorage.setItem("token", result.token);
      navigate("/");
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login To existing account</h2>
      <form className="login-form"onSubmit={(event) => submitLogin(event)}>
        <label className = "login-label">
          username
          <input
          className="login-input"
            type="text"
            onInput={(event) => setUsername(event.target.value)}
          />
        </label>
        <label className = "login-label">
          password
          <input
          className="login-input"
            type="password"
            onInput={(event) => setPassword(event.target.value)}
          />
        </label>
        <button className="login-button">submit</button>
      </form>
      {message.length ? <h3>{message}</h3> : null}
    </div>
  );
};

export default Login;
