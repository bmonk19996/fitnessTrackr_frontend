import React, { useState, useEffect } from "react";
import { getAllActivities } from "./API-adapt/index";

import { ActivityCard } from "./";

const Activities = (props) => {
  const token = props.token;
  const [activities, setActivities] = useState([]);

  const pullActivities = async () => {
    try {
      let result = await getAllActivities();
      setActivities(result);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    pullActivities();
  }, []);
  return (
    <div id="ActivitiesPage">
      <h1>Activities</h1>
      {activities.map((activity, idx) => {
        return (
          <ActivityCard
            token={token}
            key={"activity idx: " + idx}
            activity={activity}
            showEdit={true}
          ></ActivityCard>
        );
      })}
    </div>
  );
};

export default Activities;
