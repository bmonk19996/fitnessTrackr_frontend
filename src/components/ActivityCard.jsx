import { Link } from "react-router-dom";
import React from "react";

function isLoggedIn() {
  if (localStorage.getItem("token")) return true;

  return false;
}

const ActivityCard = (props) => {
  const activity = props.activity;
  const showEdit = props.showEdit;
  return (
    <div className="ActivityCard">
      <div>Name:{activity.name}</div>
      <div>Description: {activity.description}</div>
      {activity.count ? <div>Count: {activity.count}</div> : null}
      {activity.duration ? <div>Duration: {activity.duration}</div> : null}
      {isLoggedIn() && showEdit ? (
        <Link to={`/activities/edit/${activity.id}`}>
          <button>edit Activity</button>
        </Link>
      ) : null}
    </div>
  );
};

export default ActivityCard;
