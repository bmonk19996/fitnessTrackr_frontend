import React from "react";
import { Link, useNavigate } from "react-router-dom";

function isLoggedIn()
  {
    if(localStorage.getItem("token")) return true;
    
    return false;
  } 

const Navbar = () => {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    navigate('./')
  }

  return (
    <div id="navbar">
      <Link to="/">
        <h2> Fitness Tracker</h2>
      </Link>
      {isLoggedIn() ? (
        <>
        <button
          className="nav-items"
          onClick={() => {
            logOut();
            window.location.reload();
          }}
        >
          Logout
        </button>
        </>
      ) : (<>

        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;

//      <Link to="/login">Login</Link>
