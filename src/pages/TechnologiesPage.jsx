import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loadTechnologies } from "../redux/actions";
import { useDispatch } from "react-redux";

const TechnologiesPage = ({ app }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTechnologies());
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h1>Technologies</h1>
            <NavLink className="btn btn-success" to="/technologycreate">
              Create Technology
            </NavLink>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Slug</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
            {app.technologies.map(({ id, name, slug }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{slug}</td>
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
  loadTechnologies,
};

export default connect(mapStateToProps, mapDispatchToProps)(TechnologiesPage);
