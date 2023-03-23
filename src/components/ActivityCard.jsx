import { Link } from "react-router-dom";
import React from "react";
import { deleteRoutineActivity } from "./API-adapt";

const ActivityCard = (props) => {
  const {
    token,
    editRoutineActivity,
    activity,
    showEdit,
    idx,
    activities,
    setActivities,
  } = props;

  const deleteMyRoutineActivity = async () => {
    const result = await deleteRoutineActivity(
      token,
      activity.routineActivityId
    );
    if (!result.message) {
      const newActivities = [...activities];
      newActivities.splice(idx, 1);
      setActivities(newActivities);
    } else {
    }
  };
  return (
    <div className="ActivityCard">
      <div>Name:{activity.name}</div>
      <div>Description: {activity.description}</div>
      {activity.count ? <div>Count: {activity.count}</div> : null}
      {activity.duration ? <div>Duration: {activity.duration}</div> : null}

      {token && showEdit ? (
        <>
          <Link to={`/activities/edit/${activity.id}`}>
            <button>edit Activity</button>
          </Link>
        </>
      ) : null}
      {editRoutineActivity ? (
        <>
          <Link to={`/routineActivities/edit/${activity.routineActivityId}`}>
            <button>edit activity time and count</button>
          </Link>
          <button onClick={() => deleteMyRoutineActivity()}>
            remove activity
          </button>
        </>
      ) : null}
    </div>
  );
};

export default ActivityCard;
