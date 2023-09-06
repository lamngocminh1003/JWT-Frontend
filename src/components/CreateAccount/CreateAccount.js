import React from "react";
import "../CreateAccount/CreateAccount.scss";
import { Link } from "react-router-dom";

const CreateAccount = (props) => {
  return (
    <div className="create-account-container ">
      <div className="container">
        <div className="row">
          <div className="content-left col-sm-12 col-lg-6 ">
            <div className="brand mt-4">JWT App</div>
          </div>
          <div className="content-right mt-4 col-12 col-lg-6">
            <div className="create-account-form">
              <div className="mb-3">
                <div className="title">Create a new account</div>
                <div className="detail">It's quick and easy.</div>
              </div>
              <hr />
              <div className="mb-3 row">
                <div className="col-6">
                  <input
                    type="userName"
                    className="form-control"
                    id="userName"
                    placeholder="User name"
                  />
                </div>
                <div className="col-6">
                  <input
                    type="phone"
                    className="form-control"
                    id="phone"
                    placeholder="Phone number"
                  />
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email address"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Re-enter password"
                />
              </div>
              <div className="create">
                <button type="submit" className="btn btn-success">
                  Sign Up{" "}
                </button>
                <div className="forgotten mt-3">
                  <Link className="forgotten-password " to="/login">
                    Already have an account?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
