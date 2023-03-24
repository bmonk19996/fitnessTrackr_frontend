import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyUser } from "./API-adapt";
const Navbar = (props) => {
  const {token, setToken} = props
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  function logOut() {
    localStorage.removeItem("token");
    setToken('')
    navigate("./");
  }
  useEffect(() => {
    checkLogIn();
  }, [token]);
  const checkLogIn = async () => {
    if (token) {
      const myUser = await getMyUser(token);
      setUsername(`${myUser.username}`);
    }else{
      setUsername('')
    }
  };
  return (
    <div>
      <div id="navbar">
        <h2>{`Welcome ${userName} to Fitness Tracker`}</h2>
        {token ? (
          <>
            <button
              className="nav-items"
              onClick={() => {
                logOut();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="link" to="/login">
              Login
            </Link>
            <Link className="link" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
      <div className="tabs">
        <div>
          <Link className="link tab" to="/routines">
            Routines
          </Link>
          <Link className="link tab" to="/activities">
            Activities
          </Link>
        </div>
        {token ? (
          <>
            <div>
              <Link className="link tab" to="/profilePage">
                ProfilePage
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;

//      <Link to="/login">Login</Link>
