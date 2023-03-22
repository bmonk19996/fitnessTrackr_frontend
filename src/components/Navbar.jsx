import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const token = props.token

  function logOut() {
    localStorage.removeItem("token");
  }

  return (
    <div id="navbar">
      <Link to="/">
        <h2> Fitness Tracker</h2>
      </Link>
      {token ? (
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
