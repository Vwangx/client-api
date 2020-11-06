import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loadIndustries } from "../redux/actions";
import { useDispatch } from "react-redux";

const IndustriesPage = ({ app }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIndustries());
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h1>Industries</h1>
            <NavLink className="btn btn-success" to="/industrycreate">
              Create Industry
            </NavLink>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Slug</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {app.industries.map(({ id, name, slug, description }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{slug}</td>
                  <td>{description}</td>
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
  loadIndustries,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndustriesPage);
