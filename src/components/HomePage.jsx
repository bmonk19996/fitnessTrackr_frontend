import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyUser } from "./API-adapt";

function isLoggedIn() {
  if (localStorage.getItem("token")) return true;

  return false;
}

const HomePage = () => {
  const [homeMessage, setHomeMessage] = useState("Welcome to Fitness Tracker");
  useEffect(() => {
    checkLogIn();
  }, []);
  const checkLogIn = async () => {
    if (isLoggedIn()) {
      const myUser = await getMyUser(localStorage.getItem("token"));
      setHomeMessage(`welcome ${myUser.username} to fitness tracker`);
    }
  };

  return (
    <div id="homePage">
      <h2>{homeMessage}</h2>
      <div>
        <Link to="/routines">Routines</Link>
        <Link to="/routines">Activities</Link>
      </div>
      {isLoggedIn() ? (
        <>
          <div>
          <Link to="/createRoutine">Add Routine</Link>
        <Link to="/profilePage">ProfilePage</Link>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default HomePage;
