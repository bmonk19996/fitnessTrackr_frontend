import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyUser, makeRoutine } from "./API-adapt/index";

//creatorid, isPublic, name, goal

const CreateRoutine = (props) => {
  const token = props.token;
  const [name, setRoutineName] = useState(null);
  const [goal, setRoutineGoal] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const submitRoutine = async (event, fields) => {
    try {
      event.preventDefault();
      const { id } = await getMyUser(token);
      const result = await makeRoutine(token, {
        id,
        ...fields,
      });
      if (!result.message) {
        navigate("/");
      } else {
        setMessage(result.message);
      }
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className="container">
      <h2 className="title">Create new Routine</h2>
      <form
        className="form"
        onSubmit={(event) => submitRoutine(event, { isPublic, name, goal })}
      >
        <label className="label">
          Routine Name:
          <input
            className="input"
            type="text"
            onChange={(event) => setRoutineName(event.target.value)}
          />
        </label>
        <label className="label">
          Routine Goal:
          <input
            className="input"
            type="text"
            onChange={(event) => setRoutineGoal(event.target.value)}
          />
        </label>
        <label className="label">
          Public:
          <input
            className="createInput createCheckBox"
            type="checkbox"
            onChange={(event) => setIsPublic(!isPublic)}
          />
        </label>
        <button className="button">Submit</button>
      </form>
      {message.length ? <h3 className="message">{message}</h3> : null}
    </div>
  );
};

export default CreateRoutine;
