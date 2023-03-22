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

const Main = () => {
const [token, setToken] = useState(localStorage.getItem("token"))


  return (
    <div id="main">
      <Navbar token={token} />
      <div>
        <Routes>
          <Route path="/" element={<HomePage token={token}></HomePage>}></Route>
          <Route
            path="/routines"
            element={<PublicRoutines token={token}></PublicRoutines>}
          ></Route>
          <Route path="/activities" element={<Activities token={token}></Activities>}></Route>
          <Route path="/login" element={<Login setToken={setToken}></Login>} />
          <Route path="/register" element={<Register setToken={setToken}></Register>} />
          <Route
            path="routines/createRoutine"
            element={<CreateRoutine token={token}></CreateRoutine>}
          />
          <Route
            path="activities/createActivity"
            element={<CreateActivity token={token}></CreateActivity>}
          />
          <Route path="/ProfilePage" element={<ProfilePage token={token}></ProfilePage>} />
          <Route
            path="/routines/edit/:routineId"
            element={<EditRoutine token={token}></EditRoutine>}
          />
          <Route
            path="/activities/edit/:activityId"
            element={<EditActivity token={token}></EditActivity>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
