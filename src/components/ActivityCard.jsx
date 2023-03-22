import { Link } from "react-router-dom";
import React from "react";
import { deleteRoutineActivity } from "./API-adapt";

function isLoggedIn() {
  if (localStorage.getItem("token")) return true;

  return false;
}

const ActivityCard = (props) => {

  const {editRoutineActivity,activity, showEdit, routineActivityId,idx, activities, setActivities} = props

const deleteMyRoutineActivity = async()=>{
  console.log(activity.routineActivityId)
  const result = await deleteRoutineActivity(
    localStorage.getItem("token"),
    activity.routineActivityId
  );
  if (!result.message) {
    console.log(activities)
     const newActivities = [...activities];
     newActivities.splice(idx, 1);
     setActivities(newActivities);
  } else {
  }
}
  return (
    <div className="ActivityCard">
      <div>Name:{activity.name}</div>
      <div>Description: {activity.description}</div>
      {activity.count ? <div>Count: {activity.count}</div> : null}
      {activity.duration ? <div>Duration: {activity.duration}</div> : null}
      {isLoggedIn() && showEdit ? (
        <>
          <Link to={`/activities/edit/${activity.id}`}>
            <button>edit Activity</button>
          </Link>
        </>
      ) : null}
      {editRoutineActivity ? (
        <>
        <Link to={`/routineActivities/edit/${activity.routineActivityId}`}>
          <button>edit RoutineActivity</button>
        </Link>
        <button onClick={()=>deleteMyRoutineActivity()}>delete RoutineActivity</button>
        </>
      ) : null}
    </div>
  );
};

export default ActivityCard;
