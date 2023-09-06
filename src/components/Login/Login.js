import React from "react";
import "../Login/Login.scss";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  let history = useHistory();
  const handleCreateNewAccount = () => {
    history.push("/create-account");
  };
  return (
    <div className="login-container ">
      <div className="container">
        <div className="row">
          <div className="content-left col-sm-12 col-lg-6 ">
            <div className="brand mt-4">JWT App</div>
            <div className="detail">JWT, Node.JS & React </div>
          </div>
          <div className="content-right mt-lg-5 mt-sm-3 col-12 col-lg-6">
            <div className="login-form">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Email address"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <div>
                <button type="submit" className="btn btn-primary">
                  Log in
                </button>
                <div className="forgotten mt-2">
                  <a className="forgotten-password ">Forgotten password?</a>
                </div>
              </div>
              <hr />
              <div className="create">
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={() => handleCreateNewAccount()}
                >
                  Create new account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
