import React, { useState, useEffect } from "react";
import { getRoutines } from "./API-adapt/index";

import { Routine } from "./";

const PublicRoutines = (props) => {
  const token = props.token;
  const [routines, setRoutines] = useState([]);

  const pullRoutines = async () => {
    try {
      let result = await getRoutines();
      setRoutines(result);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    pullRoutines();
  }, []);

  return (
    <div id="publicRoutinePage" >
      <h1>Routines</h1>
      <div className="PageDisplay">
        {routines.map((routine, idx) => {
          return (
            <Routine
              key={"routine idx: " + idx}
              token={token}
              routine={routine}
              edit={false}
              idx={idx}
            ></Routine>
          );
        })}
      </div>
    </div>
  );
};

export default PublicRoutines;
