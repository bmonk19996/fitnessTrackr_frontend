import React, { useState, useEffect } from "react";
import {
  getMyUser,
  getAllActivities,
  addActivityToRoutine,
  deleteRoutine,
  getUserPublicRoutines
} from "./API-adapt/index";
import { Link } from "react-router-dom";
import { ActivityCard } from "./";

const Routine = (props) => {
  const { routine, routines, setRoutines, idx } = props;
  const editRoutineActivity = props.editRoutineActivity;
  const [isOwner, setIsOwner] = useState(false);
  const [username,setUsername] = useState('')
  const [addActivityInput, setAddActivityInput] = useState("");
  const [activities, setActivities] = useState(routine.activities);

  async function checkIsOwner(creatorId) {
    const user = await getMyUser(localStorage.getItem("token"));
    if(user.id === creatorId){
      setIsOwner(true)
      setUsername(user.username)
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
          const result = await addActivityToRoutine(
            localStorage.getItem("token"),
            { routineId: routine.id, activityId: allActivities[i].id }
          );
          if (!result.message) {
            console.log('hiting')
            const myRoutines = await getUserPublicRoutines(localStorage.getItem("token"), username)
            // const newActivities = [...activities];
            // newActivities.push(allActivities[i]);
            console.log(myRoutines)
            setActivities(myRoutines[idx].activities);
          }
        }
      }
    }
  };

  const deleteMyRoutine = async () => {
    const result = await deleteRoutine(
      localStorage.getItem("token"),
      routine.id
    );
    if (!result.message) {
      const newRoutines = [...routines];
      newRoutines.splice(idx, 1);
      setRoutines(newRoutines);
    } else {
    }
  };

  return (
    <div className="RoutineCard">
      <h1>Routine</h1>
      <div>Id: {routine.id}</div>
      <div>Creator: {routine.creatorName}</div>
      <div>Name: {routine.name}</div>
      <div>Goal: {routine.goal}</div>
      {isOwner ? (
        <>
          <Link to={`/routines/edit/${routine.id}`}>
            <button>edit routine</button>
          </Link>
          <button
            onClick={() => {
              deleteMyRoutine();
            }}
          >
            delete routine
          </button>
          <button onClick={() => showAddActivityList(addActivityInput)}>
            Add Activity
          </button>

          <select id={`${"activityList" + idx}`} className="hidden"
          onChange={()=>{setAddActivityInput(event.target.value)}}>
            
          </select>
        </>
      ) : null}
      <div>
        <h2>Activities: </h2>
      </div>
      <div>
        {activities.map((activity, idx) => {
          return (
            <ActivityCard
              key={"routine activity idx: " + idx}
              activity={activity}
              activities={activities}
              setActivities={setActivities}
              idx={idx}
              showEdit={false}
              editRoutineActivity={editRoutineActivity}
            ></ActivityCard>
          );
        })}
      </div>
    </div>
  );
};

export default Routine;



// <input
//               id={`${"addActivity" + idx}`}
//               type="text"
//               name="activity"
//               list={`activityList${idx}`}
//               onChange={(event) => {
//                 setAddActivityInput(event.target.value);
//               }}
//             />