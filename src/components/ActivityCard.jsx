import react, { useState, useEffect } from "react";
import { getMyUser } from "./API-adapt/index";
import { Link } from "react-router-dom";
const Activity = (props) => {
  const activity = props.activity;
  console.log(activity);
  return (
    <div className="ActivityCard">
      <h1>Activity</h1>
      <div>{activity.name}</div>
      <div>{activity.description}</div>
    </div>
  );
};

export default Activity;
