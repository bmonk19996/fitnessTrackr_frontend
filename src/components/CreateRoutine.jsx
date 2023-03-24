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
    <div className="createPage">
      <h2>Create new Routine</h2>
      <form
        className="createForm"
        onSubmit={(event) => submitRoutine(event, { isPublic, name, goal })}
      ><div className="createInfo">
        <label className="createLabel">
          <div className="createTitle">Routine Name:</div>
          <input
            className="createInput"
            type="text"
            onChange={(event) => setRoutineName(event.target.value)}
          />
        </label>
        <label className="createLabel">
          <div className="createTitle">Routine Goal:</div>
          <input
            className="createInput"
            type="text"
            onChange={(event) => setRoutineGoal(event.target.value)}
          />
        </label>
        <label className="createLabel">
          <div className="createTitle">Public:</div>
          <input
            className="createInput createCheckBox"
            type="checkbox"
            onChange={(event) => setIsPublic(event.target.value)}
          />
        </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {message.length ? <h3>{message}</h3> : null}
    </div>
  );
};

export default CreateRoutine;
