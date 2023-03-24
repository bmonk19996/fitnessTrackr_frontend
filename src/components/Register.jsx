import React, { useState } from "react";
import { register } from "./API-adapt";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const setToken = props.setToken;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitLogin = async (event) => {
    event.preventDefault();
    const result = await register(username, password);
    if (result.token) {
      setToken(result.token);
      localStorage.setItem("token", result.token);
      navigate("/");
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className ="container">
      <h2 className ="title">Register new account</h2>
      <form onSubmit={(event) => submitLogin(event)}>
        <label className = "label">
          username
          <input
          className="input"
            type="text"
            onInput={(event) => setUsername(event.target.value)}
          />
        </label>
        <label className="label">
          password
          <input
            className="input"
            type="text"
            onInput={(event) => setPassword(event.target.value)}
          />
        </label>
        <button className = "button">submit</button>
      </form>
      {message.length ? <h3 className="message">{message}</h3> : null}
    </div>
  );
};
export default Register;
