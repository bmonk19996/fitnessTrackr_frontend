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
    <div className="container">
      <h2 className="title">Login To existing account</h2>
      <form className="form"onSubmit={(event) => submitLogin(event)}>
        <label className = "label">
          username
          <input
          className="input"
            type="text"
            onInput={(event) => setUsername(event.target.value)}
          />
        </label>
        <label className = "label">
          password
          <input
          className="input"
            type="password"
            onInput={(event) => setPassword(event.target.value)}
          />
        </label>
        <button className="button">submit</button>
      </form>
      {message.length ? <h3 className="message">{message}</h3> : null}
    </div>
  );
};

export default Login;
