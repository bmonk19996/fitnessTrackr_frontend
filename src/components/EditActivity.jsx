import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import{ updateActivity, getAllActivities } from "./API-adapt/index";

//creatorid, isPublic, name, goal

const EditActivity = (props) => {
  const { activityId } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const submitActivity = async (event, fields) => {
    try {
      event.preventDefault();
      const result = await updateActivity(localStorage.getItem("token"), activityId,{
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

  const setActivity = async () => {
    try {

      const myActivities = await getAllActivities()

      let myActivity = null;
      for (let i = 0; i < myActivities.length; i++) {
        if (myActivities[i].id == activityId) {
          myActivity = myActivities[i];
        }
      }
      if (myActivity === null) {
        setMessage(`Activity ${activityId} not found`);
        navigate("/");
      }

      setName(myActivity.name);
      setDescription(myActivity.description);
    } catch (e) {

      throw e;

    }
  };

  useEffect(() => {
    setActivity();
  }, []);


console.log(name)

  return (
    <div>
      <form
        onSubmit={(event) => submitActivity(event, { name, description })}
      >
        <label>
          Activity Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Activity description:
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {message.length ? <h3>{message}</h3> : null}
    </div>
  );
};

export default EditActivity;
