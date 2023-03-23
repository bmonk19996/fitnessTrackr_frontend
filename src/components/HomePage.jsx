import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyUser } from "./API-adapt";

const HomePage = (props) => {
  const token = props.token;
  const [homeMessage, setHomeMessage] = useState("Welcome to Fitness Tracker");
  useEffect(() => {
    checkLogIn();
  }, [token]);
  const checkLogIn = async () => {
    if (token) {
      const myUser = await getMyUser(token);
      setHomeMessage(`welcome ${myUser.username} to fitness tracker`);
    }
  };

  return (
    <div id="homePage">
      <h2>{homeMessage}</h2>
      <div>
        <Link to="/routines">Routines</Link>
        <Link to="/activities">Activities</Link>
      </div>
      {token ? (
        <>
          <div>
            <Link to="/routines/createRoutine">Create Routine</Link>
            <Link to="/activities/createActivity">Create Activity</Link>
            <Link to="/profilePage">ProfilePage</Link>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default HomePage;
