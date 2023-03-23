import React, { useEffect, useState } from "react";
import { getMyUser, getUserPublicRoutines } from "./API-adapt/index";
import { Routine } from "./";
import { Link } from "react-router-dom";
const ProfilePage = (props) => {
  const token = props.token;
  const [user, setUser] = useState({});
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    setUserInfo();
  }, []);

  const setUserInfo = async () => {
    const myUser = await getMyUser(token);
    const myRoutines = await getUserPublicRoutines(token, myUser.username);

    setUser(myUser);
    setRoutines(myRoutines);
  };
  return (
    <div>
      <h1>{user.username}</h1>
      <Link className="link create" to="/routines/createRoutine">Create New Routine</Link>
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
  );
};

export default ProfilePage;
