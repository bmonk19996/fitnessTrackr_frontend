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
      setToken(result.token)
      localStorage.setItem("token", result.token);
      navigate("/");
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div>
      <h2>Login To existing account</h2>
      <form onSubmit={(event) => submitLogin(event)}>
        <label>
          username
          <input
            type="text"
            onInput={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          password
          <input
            type="text"
            onInput={(event) => setPassword(event.target.value)}
          />
        </label>
        <button>submit</button>
      </form>
      {message.length ? <h3>{message}</h3> : null}
    </div>
  );
};

export default Login;


