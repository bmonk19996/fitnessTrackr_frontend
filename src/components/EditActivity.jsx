import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateActivity, getAllActivities } from "./API-adapt/index";

//creatorid, isPublic, name, goal

const EditActivity = (props) => {
  const token = props.token;
  const { activityId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const submitActivity = async (event, fields) => {
    try {
      event.preventDefault();

      const result = await updateActivity(token, activityId, {
        ...fields,
      });
      if (!result.message) {
        navigate("/activities");
      } else {
        setMessage(result.message);
      }
    } catch (e) {
      throw e;
    }
  };

  const setActivity = async () => {
    try {
      const myActivities = await getAllActivities();

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
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label className="label">Activity description:
            <input
              className="input"
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
        <button className="button">Submit</button>
      </form>
      {message.length ? <h3 className="message">{message}</h3> : null}
    </div>
  );

};

export default EditActivity;

{/* <div>
<form onSubmit={(event) => submitActivity(event, { name, description })}>
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
); */}
