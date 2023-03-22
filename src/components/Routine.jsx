import React, { useState, useEffect } from "react";
import { getMyUser, getAllActivities } from "./API-adapt/index";
import { Link } from "react-router-dom";
import { ActivityCard } from "./";


const Routine = (props) => {
  const [isOwner, setIsOwner] = useState(false);

  const routine = props.routine;
  const idx = props.idx;
  
  

  async function checkIsOwner(creatorId) {
    const user = await getMyUser(localStorage.getItem("token"));
    setIsOwner(user.id === creatorId);
  }
  useEffect(() => {
    checkIsOwner(routine.creatorId);
  });

  const showAddActivityList = async ()=>
  {
    const activityList = document.getElementById("addActivity"+idx);
    activityList.classList.remove("hidden");

    const allActivities = await getAllActivities();
    const dataList = document.getElementById("activityList"+idx);
    console.log(dataList)
    allActivities.map((activity, idx)=>
    {
      let newOption = document.createElement("option");
      console.log(activity.name);
      newOption.value = activity.name;
      dataList.appendChild(newOption);
    })

    console.log("hi")
  }

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
          <button onClick={showAddActivityList}>Add Activity</button>
          <input id={`${"addActivity"+idx}`} className="hidden" type="text" name="activity" list={`activityList${idx}`}/>
            <datalist id={`${"activityList"+idx}`}>
              <option value="activity1"/>
              <option value="activity2"/>
            </datalist>
        </>
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
              showEdit={false}
            ></ActivityCard>
          );
        })}
      </div>
    </div>
  );
};

export default Routine;
