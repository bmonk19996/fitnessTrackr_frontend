import React, { useState, useEffect } from "react";
import { Navbar } from "./";
import { Routes, Route } from "react-router-dom";
import {Login, PublicRoutines, Register, CreateRoutine, ProfilePage} from "./"


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
