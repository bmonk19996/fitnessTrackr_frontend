import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMyUser, getUserPublicRoutines, updateRoutine } from "./API-adapt";
const EditRoutine = (props) => {
  const token = props.token;
  const { routineId } = useParams();
  const [name, setRoutineName] = useState("");
  const [goal, setRoutineGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [message, setMessage] = useState("");
  const [routineActivities, seRoutineActivities] = useState([]);

  const navigate = useNavigate();

  const setRoutine = async () => {
    try {
      const myUser = await getMyUser(token);
      const myRoutines = await getUserPublicRoutines(token, myUser.username);
      let myRoutine = null;
      for (let i = 0; i < myRoutines.length; i++) {
        if (myRoutines[i].id == routineId) {
          myRoutine = myRoutines[i];
        }
      }
      if (myRoutine === null) {
        setMessage(`Routine ${routineId} not found for current user`);
        navigate("/profilePage");
      }

      setIsPublic(myRoutine.isPublic);
      setRoutineName(myRoutine.name);
      setRoutineGoal(myRoutine.goal);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    setRoutine();
  }, []);

  const updateMyRoutine = async (event, fields) => {
    event.preventDefault();
    const result = await updateRoutine(token, routineId, fields);
    if (!result.message) {
      navigate("/profilePage");
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Create new Routine</h2>
      <form
        className="form"
        onSubmit={(event) => updateMyRoutine(event, { isPublic, name, goal })}
      >
        <label className="label">
          Routine Name:
          <input
            className="input"
            type="text"
            value={name}
            onChange={(event) => setRoutineName(event.target.value)}
          />
        </label>
        <label className="label">
          Routine Goal:
          <input
            className="input"
            type="text"
            value={goal}
            onChange={(event) => setRoutineGoal(event.target.value)}
          />
        </label>
        <label className="label">
          Public:
          <input
            className="createInput createCheckBox"
            type="checkbox"
            checked={isPublic}
            onChange={(event) => setIsPublic(!isPublic)}
          />
        </label>
        <button className="button">Submit</button>
      </form>
      {message.length ? <h3 className="message">{message}</h3> : null}
    </div>
  );
};

export default EditRoutine;

{
  /* <div>
<h2>Update Routine</h2>
<form
  onSubmit={(event) => updateMyRoutine(event, { isPublic, name, goal })}
>
  <label>
    Routine Name:
    <input
      type="text"
      value={name}
      onChange={(event) => setRoutineName(event.target.value)}
    />
  </label>
  <label>
    Routine Goal:
    <input
      type="text"
      value={goal}
      onChange={(event) => setRoutineGoal(event.target.value)}
    />
  </label>
  <label>
    Public:
    <input
      type="checkbox"
      checked={isPublic}
      onChange={(event) => setIsPublic(!isPublic)}
    />
  </label>
  <button type="submit">Submit</button>
</form>
{message.length ? <h3>{message}</h3> : null}
</div> */
}
