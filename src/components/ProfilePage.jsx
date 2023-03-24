import React, { useEffect, useState } from "react";
import { getMyUser, getUserPublicRoutines } from "./API-adapt/index";
import { Routine } from "./";
import { Link } from "react-router-dom";
const ProfilePage = (props) => {
  const token = props.token;
  const username = props.username;
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    setUserInfo();
  }, []);

  const setUserInfo = async () => {
    const myRoutines = await getUserPublicRoutines(token, username);
    setRoutines(myRoutines);
  };
  return (
    <div >
      <h1>{username}'s Page</h1>
      <Link className="link create" to="/routines/createRoutine">
        Create New Routine
      </Link>
      <div className="PageDisplay">
        {routines.map((routine, idx) => {
          return (
            <Routine
              key={"ProfilePage Routines" + idx}
              token={token}
              routine={routine}
              idx={idx}
              routines={routines}
              setRoutines={setRoutines}
              edit={true}
            ></Routine>
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePage;
