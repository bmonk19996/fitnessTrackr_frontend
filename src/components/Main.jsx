import React from "react";
import { Navbar } from "./";

const Main = () => {
  return (
    <div id="main">
      <Navbar />
      <div>
        <Routes>


            
            <Route path='/login' element=
            {<Login>

            </Login>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Main;
