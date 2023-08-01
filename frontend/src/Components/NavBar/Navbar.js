import React from "react";
import { Link } from "react-router-dom";
import Toggler from "../Toggler/Toggler";
import { selectTheme } from "../../Redux/features/Slices/Toggler/Toggler";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  logOutUser,
} from "../../Redux/features/Slices/Auth/Auth";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const mode = useSelector(selectTheme);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOutUser());
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg " id={`nav-bg-${mode}`}>
        <div className="container-fluid" style={{ justifyContent: "center" }}>
          <Link className="navbar-brand logo" id={`logo-${mode}`} to="/">
            Get Kanabised
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            style={{ flexGrow: "0" }}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isLoggedIn ? (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    id={`nav-link-about-${mode}`}
                    to="/login"
                    onClick={() => handleLogOut()}
                  >
                    Log Out
                  </Link>
                </li>
              ) : (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      id={`nav-link-login-${mode}`}
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      id={`nav-link-login-${mode}`}
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <div className="toggler nav-link">
                  <Toggler />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
