import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateRoutineActivities } from "./API-adapt";
const EditRoutineActivity = (props) => {
  const { routineActivityId } = useParams();
  const [duration, setDuration] = useState(0);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const updateMyRoutineActivity = async (event, fields) => {
    event.preventDefault();
    console.log("updating routineActivity");
    const result = updateRoutineActivities(
      localStorage.getItem("token"),
      routineActivityId,
      fields
    );
    console.log(result)
    if (!result.message) {
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div>
      <h2>Update Routine Activity</h2>
      <form
        onSubmit={(event) => updateMyRoutineActivity(event, { duration, count })}
      >
        <label>
          Duration:
          <input
            type="number"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
          />
        </label>
        <label>
          Count:
          <input
            type="number"
            value={count}
            onChange={(event) => setCount(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {message.length ? <h3>{message}</h3> : null}
    </div>
  );
};

export default EditRoutineActivity;
