import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions";

const AuthPage = (props) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginUser({ ...form }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row align-items-center justify-content-center vh-100">
          <div className="col-6">
            <h1>Welcome to Login page</h1>
            <form onSubmit={loginHandler} className="">
              <input
                onChange={changeHandler}
                placeholder="Email..."
                type="email"
                className="form-control mb-2"
                id="email"
                name="email"
                aria-describedby="emailHelp"
              />
              <input
                onChange={changeHandler}
                placeholder="Password"
                type="password"
                className="form-control mb-2"
                id="password"
                name="password"
              />
              <button type="submit" className="btn btn-dark">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  loginUser,
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
