import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loadUsers } from "../redux/actions";
import { useDispatch } from "react-redux";
import avatar from "../static/images/noavatar.png";

const UsersPage = ({ app }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h1>Users</h1>
            <NavLink className="btn btn-success" to="/usercreate">
              Create User
            </NavLink>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody >
            {app.users.map(({ id, name, email, position, avatarURL }) => (
                <tr key={id}>
                  <td>
                    {avatarURL ? (
                      <span>{avatarURL}</span>
                    ) : (
                      <div className="d-flex justify-content-center no-avatar-user rounded">
                        <img className="mr-0" src={avatar} alt="no-avatar" />
                      </div>
                    )}
                  </td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{position}</td>
                  <td>Actions here</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  loadUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
