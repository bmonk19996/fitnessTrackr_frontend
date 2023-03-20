import React, { useState, useEffect } from "react";
import { Navbar } from "./";
import { Routes, Route } from "react-router-dom";

import Login from "./Login";
import PublicRoutines from "./PublicRoutines";
import Register from "./Register";
import CreateRoutine  from "./CreateRoutine";
import ProfilePage from "./ProfilePage";

const Main = () => {
  return (
    <div id="main">
      <Navbar />
      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={<PublicRoutines></PublicRoutines>}
          ></Route>

          <Route path="/login" element={<Login></Login>} />
          <Route path="/register" element={<Register></Register>} />
          <Route
            path="/createRoutine"
            element={<CreateRoutine></CreateRoutine>}
          />
          <Route
            path="/ProfilePage"
            element={<ProfilePage></ProfilePage>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
