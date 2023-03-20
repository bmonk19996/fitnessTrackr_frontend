import React from "react";
import { Navbar } from "./";
import {Routes, Route} from "react-router-dom";

import {Login} from "./Login";
import PublicRoutines from "./PublicRoutines";

const Main = () => {
  return (
    <div id="main">
      <Navbar />
      <div>
        <Routes>
            <Route exact path ="/" element={
              <PublicRoutines>

              </PublicRoutines>
            }></Route>
            {/* <Route path='/login' element=
            {<Login>
              
            </Login>}/> */}
            
        </Routes>
      </div>
    </div>
  );
};

export default Main;
