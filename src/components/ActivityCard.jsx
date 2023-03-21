import react, { useState, useEffect } from "react";
import { getMyUser } from "./API-adapt/index";
import { Link } from "react-router-dom";
const ActivityCard = (props) => {
  const activity = props.activity;
  return (
    <div className="ActivityCard">
      <h1>Activity</h1>
      <div>{activity.name}</div>
      <div>{activity.description}</div>
      {activity.count ? <div>{activity.count}</div> : null}
      {activity.duration ? <div>{activity.duration}</div> : null}
    </div>
  );
};

export default ActivityCard;
