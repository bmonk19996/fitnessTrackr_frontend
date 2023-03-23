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
    <div>
      <form
        onSubmit={(event) => submitRoutine(event, { isPublic, name, goal })}
      >
        <label>
          Routine Name:
          <input
            type="text"
            onChange={(event) => setRoutineName(event.target.value)}
          />
        </label>
        <label>
          Routine Goal:
          <input
            type="text"
            onChange={(event) => setRoutineGoal(event.target.value)}
          />
        </label>
        <label>
          Public:
          <input
            type="checkbox"
            onChange={(event) => setIsPublic(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {message.length ? <h3>{message}</h3> : null}
    </div>
  );
};

export default CreateRoutine;
