import React, { useState, useEffect } from "react";
import {
  getMyUser,
  getAllActivities,
  addActivityToRoutine,
  deleteRoutine,
  getUserPublicRoutines,
} from "./API-adapt/index";
import { Link } from "react-router-dom";
import { ActivityCard } from "./";

const Routine = (props) => {
  const { token, routine, routines, setRoutines, idx, edit } = props;
  const [isOwner, setIsOwner] = useState(false);
  const [username, setUsername] = useState("");
  const [addActivityInput, setAddActivityInput] = useState("");
  const [activities, setActivities] = useState(routine.activities);

  async function checkIsOwner(creatorId) {
    const user = await getMyUser(localStorage.getItem("token"));
    if (user.id === creatorId) {
      setIsOwner(true);
      setUsername(user.username);
    }
  }
  useEffect(() => {
    checkIsOwner(routine.creatorId);
  });

  const showAddActivityList = async (activityName) => {
    const activityList = document.getElementById("activityList" + idx);
    if (activityList.classList.contains("hidden")) {
      activityList.classList.remove("hidden");
      const allActivities = await getAllActivities();
      allActivities.map((activity, idx) => {
        let newOption = document.createElement("option");
        newOption.innerText = activity.name;
        newOption.value = activity.name;
        activityList.appendChild(newOption);
      });
    } else {
      const allActivities = await getAllActivities();
      for (let i = 0; i < allActivities.length; i++) {
        if (allActivities[i].name === activityName) {
          const result = await addActivityToRoutine(token, {
            routineId: routine.id,
            activityId: allActivities[i].id,
          });
          if (!result.message) {
            const myRoutines = await getUserPublicRoutines(token, username);
            setActivities(myRoutines[idx].activities);
          }
        }
      }
    }
  };

  const deleteMyRoutine = async () => {
    const result = await deleteRoutine(token, routine.id);
    if (!result.message) {
      const newRoutines = [...routines];
      newRoutines.splice(idx, 1);
      setRoutines(newRoutines);
    } else {
    }
  };

  return (
    <div className="RoutineCard">
      <div className="RoutinePart">
        <div className="RoutineCardInfo">
          <h1>{routine.name}</h1>
          <div>{routine.goal}</div>
          <div>Created by: {routine.creatorName}</div>
        </div>
        {isOwner && edit ? (
          <div className="RoutineCardButtons">
            <Link
              className="link"
              to={`/routines/edit/${routine.id}`}
            >
              <button className="RoutineButtons">edit routine</button>
            </Link>
            <button
              className="RoutineButtons"
              onClick={() => {
                deleteMyRoutine();
              }}
            >
              delete routine
            </button>
            <button
              className="RoutineButtons"
              onClick={() => showAddActivityList(addActivityInput)}
            >
              Add Activity
            </button>

            <select
              id={`${"activityList" + idx}`}
              className="hidden"
              onChange={() => {
                setAddActivityInput(event.target.value);
              }}
            ></select>
          </div>
        ) : null}
      </div>
      <div className="ActivityPart">
        <h2>Activities: </h2>

        <ol>
          {activities.map((activity, index) => {
            return (
              <li key={`routine:${routine.id}activity:${activity.id}`}>
                <ActivityCard
                  token={token}
                  activity={activity}
                  activities={activities}
                  setActivities={setActivities}
                  idx={index}
                  showEdit={false}
                  editRoutineActivity={isOwner}
                ></ActivityCard>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Routine;
