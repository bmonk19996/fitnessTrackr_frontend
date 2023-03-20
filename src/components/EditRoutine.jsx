import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditRoutine = (props) => {
  const { routineId } = useParams();
  const [name, setRoutineName] = useState('');
  const [goal, setRoutineGoal] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const setRoutine = async () => {
    //use routineId to fill in name and goal and isPublic6
  };

  useEffect(() => {
    setRoutine();
  }, []);

  return (
    <div>
      <h2>Update Routine</h2>
      <form
        onSubmit={(event) => UpdateRoutine(event, { isPublic, name, goal })}
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
            onChange={(event) => setIsPublic(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditRoutine;
