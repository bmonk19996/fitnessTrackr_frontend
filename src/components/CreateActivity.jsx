import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { makeActivity } from "./API-adapt/index";

//creatorid, isPublic, name, goal

const CreateActivity = (props) => {
  const token = props.token
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
      console.log(result);
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
        onSubmit={(event) => submitActivity(event, { name, description })}
      >
        <label>
          Activity Name:
          <input
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Activity description:
          <input
            type="text"
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {message.length ? <h3>{message}</h3> : null}
    </div>
  );
};

export default CreateActivity;
