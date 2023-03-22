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
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route
            path="/routines"
            element={<PublicRoutines></PublicRoutines>}
          ></Route>
          <Route path="/activities" element={<Activities></Activities>}></Route>
          <Route path="/login" element={<Login setToken={setToken}></Login>} />
          <Route path="/register" element={<Register setToken={setToken}></Register>} />
          <Route
            path="routines/createRoutine"
            element={<CreateRoutine></CreateRoutine>}
          />
          <Route
            path="activities/createActivity"
            element={<CreateActivity></CreateActivity>}
          />
          <Route path="/ProfilePage" element={<ProfilePage></ProfilePage>} />
          <Route
            path="/routines/edit/:routineId"
            element={<EditRoutine></EditRoutine>}
          />
          <Route
            path="/activities/edit/:activityId"
            element={<EditActivity></EditActivity>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
