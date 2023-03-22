import React, { useState, useEffect } from "react";
import { getMyUser, getAllActivities, addActivityToRoutine, deleteRoutine } from "./API-adapt/index";
import { Link} from "react-router-dom";
import { ActivityCard } from "./";


const Routine = (props) => {
  const {routine,routines, setRoutines, idx} = props
  const editRoutineActivity= props.editRoutineActivity;
  const [isOwner, setIsOwner] = useState(false);
  const [addActivityInput, setAddActivityInput] = useState("");
  const [activities, setActivities] = useState(routine.activities)

  async function checkIsOwner(creatorId) {
    const user = await getMyUser(localStorage.getItem("token"));
    setIsOwner(user.id === creatorId);
  }
  useEffect(() => {
    checkIsOwner(routine.creatorId);
  });

  const showAddActivityList = async (activityName)=>
  {
    const activityList = document.getElementById("addActivity"+idx);
    if(activityList.classList.contains("hidden"))
    {
      activityList.classList.remove("hidden");
      console.log(activityList.classList)
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
    }else
    {
      const allActivities = await getAllActivities();
      console.log("here")
      for(let i = 0; i < allActivities.length; i++)
      {
        console.log(activityName)
        if(allActivities[i].name === activityName)
        {
          console.log("hello")
          const result = await addActivityToRoutine(localStorage.getItem("token"), {routineId:routine.id, activityId:allActivities[i].id});
          if(result.id)
          {
            window.location.reload();
          }
        }
      }
    }
  }  

const deleteMyRoutine = async()=>{

  const result = await deleteRoutine(localStorage.getItem("token"), routine.id)
  if(!result.message){
    console.log('hit',routines)
    const newRoutines = [...routines]
    newRoutines.splice(idx,1);
    setRoutines(newRoutines)
  }else{

  }

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
          <button onClick={()=>{deleteMyRoutine()}}>delete routine</button>
          <button onClick={()=>showAddActivityList(addActivityInput)}>Add Activity</button>
          <input id={`${"addActivity"+idx}`} className="hidden" type="text" name="activity" list={`activityList${idx}`} onChange={(event)=>
          {
            setAddActivityInput(event.target.value);
          }}/>
            <datalist id={`${"activityList"+idx}`}></datalist>
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
