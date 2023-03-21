import { Link } from "react-router-dom";
import React from "react";


function isLoggedIn() {
  if (localStorage.getItem("token")) return true;

  return false;
}

const ActivityCard = (props) => {
  const activity = props.activity;
  console.log(activity);
  return (
    <div className="ActivityCard">
      <div>Name:{activity.name}</div>
      <div>Description: {activity.description}</div>
      {activity.count ? <div>Count: {activity.count}</div> : null}
      {activity.duration ? <div>Duration: {activity.duration}</div> : null}
      {isLoggedIn() ? (
        <Link to={`/activities/edit/${activity.id}`}>
          <button>edit routine</button>
        </Link>
      ) : null}
    </div>
  );
};

export default ActivityCard;
