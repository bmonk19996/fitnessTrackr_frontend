import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMyUser, getUserPublicRoutines, updateRoutine } from "./API-adapt";
import { useNavigate } from "react-router-dom";
const EditRoutine = (props) => {
  const { routineId } = useParams();
  const [name, setRoutineName] = useState("");
  const [goal, setRoutineGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const setRoutine = async () => {
    try {
      const myUser = await getMyUser(localStorage.getItem("token"));
      const myRoutines = await getUserPublicRoutines(
        localStorage.getItem("token"),
        myUser.username
      );
      let myRoutine = null;
      for (let i = 0; i < myRoutines.length; i++) {
        if (myRoutines[i].id == routineId) {
          myRoutine = myRoutines[i];
        }
      }
      if (myRoutine === null) {
        setMessage(`Routine ${routineId} not found for current user`);
        navigate("/");
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
    console.log("updating routine");
    const result = updateRoutine(
      localStorage.getItem("token"),
      routineId,
      fields
    );
    if (!result.message) {
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default EditRoutine;
