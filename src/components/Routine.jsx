import React, { useState, useEffect } from "react";
import { getMyUser } from "./API-adapt/index";
import { Link } from "react-router-dom";
import { ActivityCard } from "./";
const Routine = (props) => {
  const [isOwner, setIsOwner] = useState(false);

  const routine = props.routine;
  async function checkIsOwner(creatorId) {
    const user = await getMyUser(localStorage.getItem("token"));
    setIsOwner(user.id === creatorId);
  }
  useEffect(() => {
    checkIsOwner(routine.creatorId);
  });
  return (
    <div className="RoutineCard">
      <h1>Routine</h1>
      <div>Id: {routine.id}</div>
      <div>Creator: {routine.creatorName}</div>
      <div>Name: {routine.name}</div>
      <div>Goal: {routine.goal}</div>
      {isOwner ? (
        <Link to={`/routines/edit/${routine.id}`}>
          <button>edit routine</button>
        </Link>
      ) : null}
      <div>
        <h2>Activities: </h2>
      </div>
      <div>
        {routine.activities.map((activity, idx) => {
          return (
            <ActivityCard
              key={"routine activity idx: " + idx}
              activity={activity}
            ></ActivityCard>
          );
        })}
      </div>
    </div>
  );
};

export default Routine;
