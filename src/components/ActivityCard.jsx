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
    console.log(token)
    if (!result.message) {
      const newActivities = [...activities];
      newActivities.splice(idx, 1);
      setActivities(newActivities);
    } else {
    }
  };
  return (
    <div className="ActivityCard">
      <div className="activityCardInfo">
        <h3>{activity.name}</h3>
        <h4>{activity.description}</h4>
        {activity.count ? <div>Count: {activity.count}</div> : null}
        {activity.duration ? <div>Duration: {activity.duration}</div> : null}
      </div>
      {token && showEdit ? (
        <>
          <Link className="link" to={`/activities/edit/${activity.id}`}>
            <button>edit Activity</button>
          </Link>
        </>
      ) : null}
      {editRoutineActivity ? (
        <div className="activityCardButtons">
          <Link
            className="link"
            to={`/routineActivities/edit/${activity.routineActivityId}`}
          >
            <button>edit activity</button>
          </Link>
          <button onClick={() => deleteMyRoutineActivity()}>
            remove activity
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ActivityCard;
