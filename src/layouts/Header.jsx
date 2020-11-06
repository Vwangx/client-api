import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { refreshUser, logoutUser } from "../redux/actions";
import noavatar from '../static/images/noavatar.png';

const Header = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <NavLink className="navbar-brand" to="/">
          WConsole
        </NavLink>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0 list-unstyled">
          <li className="nav-item">
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/cases">
              Cases
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/technologies">
              Technologies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/industries">
              Industries
            </NavLink>
          </li>
        </ul>

        <ul className="navbar-nav mt-2 mt-lg-0 list-unstyled navbar-right">
          <li className="nav-item">
            <div className="">
              <button
                type="button"
                className="btn btn-light d-flex"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img className="header-avatar rounded-circle" src={props.app.user.avatarURL ? props.app.user.avatarURL : noavatar} alt="avatar-header"/>
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <button className="dropdown-item" type="button">
                  <NavLink to="/profile">Profile</NavLink>
                </button>
                <button className="dropdown-item" type="button">
                  <NavLink to="/updateuser">Edit Profile</NavLink>
                </button>
                <button
                  onClick={logoutHandler}
                  className="dropdown-item"
                  type="button"
                >
                  Logout
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapDispatchToProps = {
  refreshUser,
  logoutUser,
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
