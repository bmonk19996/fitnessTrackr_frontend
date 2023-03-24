import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { makeActivity } from "./API-adapt/index";

//creatorid, isPublic, name, goal

const CreateActivity = (props) => {
  const token = props.token;
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const submitActivity = async (event, fields) => {
    try {
      event.preventDefault();
      const result = await makeActivity(token, {
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
    <div id="createActivity" className="container">
            <h2 className="title">Create new Activity</h2>
      <form
        className="form"
        onSubmit={(event) => submitActivity(event, { name, description })}
      >
          <label className="label">Activity Name:
            <input
              className="input"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label className="label">Activity description:
            <input
              className="input"
              type="text"
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
        <button className="button">Submit</button>
      </form>
      {message.length ? <h3 className="message">{message}</h3> : null}
    </div>
  );
};

export default CreateActivity;
