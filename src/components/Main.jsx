import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Login,
  PublicRoutines,
  Register,
  CreateRoutine,
  ProfilePage,
  Navbar,
  EditRoutine,
  HomePage,
  Activities,
  EditActivity,
} from "./";
import CreateActivity from "./CreateActivity";
import EditRoutineActivity from "./EditRoutineActivity";

const Main = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"))
  return (
    <div id="main">
      <Navbar token={token} setToken={setToken} username={username} setUsername={setUsername} />
      <div>
        <Routes>
          <Route path="/" element={<HomePage token={token}></HomePage>}></Route>
          <Route
            path="/routines"
            element={<PublicRoutines token={token}></PublicRoutines>}
          ></Route>
          <Route
            path="/activities"
            element={<Activities token={token}></Activities>}
          ></Route>
          <Route path="/login" element={<Login setToken={setToken} setUsername={setUsername}></Login>} />
          <Route
            path="/register"
            element={<Register setToken={setToken} setUsername={setUsername}></Register>}
          />
          <Route
            path="routines/createRoutine"
            element={<CreateRoutine token={token}></CreateRoutine>}
          />
          <Route
            path="activities/createActivity"
            element={<CreateActivity token={token}></CreateActivity>}
          />
          <Route
            path="/ProfilePage"
            element={<ProfilePage token={token} username={username}></ProfilePage>}
          />
          <Route
            path="/routines/edit/:routineId"
            element={<EditRoutine token={token}></EditRoutine>}
          />
          <Route
            path="/activities/edit/:activityId"
            element={<EditActivity token={token}></EditActivity>}
          />
          <Route
            path="/routineActivities/edit/:routineActivityId"
            element={<EditRoutineActivity token={token}></EditRoutineActivity>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
