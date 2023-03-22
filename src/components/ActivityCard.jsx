import { Link } from "react-router-dom";
import React from "react";

const ActivityCard = (props) => {
  const { token, activity, showEdit } = props;
  return (
    <div className="ActivityCard">
      <div>Name:{activity.name}</div>
      <div>Description: {activity.description}</div>
      {activity.count ? <div>Count: {activity.count}</div> : null}
      {activity.duration ? <div>Duration: {activity.duration}</div> : null}
      {token && showEdit ? (
        <Link to={`/activities/edit/${activity.id}`}>
          <button>edit Activity</button>
        </Link>
      ) : null}
    </div>
  );
};

export default ActivityCard;
