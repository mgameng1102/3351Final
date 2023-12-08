import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span>Pet Recommendations </span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/pets"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                All Pets
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/questionnaire"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Questionnaire
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/results"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Results
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/feedback"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Feedback
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ? (
              <span className="icon">
                <p className="icons">X</p>
              </span>
            ) : (
              <span className="icon">
                <p className="icons">X</p>
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;