import "../Login/Login.scss";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

const Login = (props) => {
  let history = useHistory();
  const handleCreateNewAccount = () => {
    history.push("/create-account");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const inputRefs = useRef([]);
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex].focus();
      } else {
        inputRefs.current[0].focus(); // Focus on the first input field
      }
    }
  };
  const handleInputChange = (e, index) => {
    if (index === 0) {
      setEmail(e.target.value);
    }
    if (index === 1) {
      setPassword(e.target.value);
    }
  };
  const addInputRef = (ref, index) => {
    if (ref && !inputRefs.current.includes(ref)) {
      inputRefs.current.push(ref);
      if (index === inputRefs.current.length - 1) {
        ref.onkeydown = (e) => handleKeyDown(e, index);
      }
    }
  };
  const defaultValidInput = {
    isValidEmail: true,
    isValidPassword: true,
    isValidUserName: true,
    isValidPhone: true,
    isValidRePassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    if (!email) {
      toast.error("Your email is required");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    if (!password) {
      toast.error("Your password is required");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    let re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      toast.error("Your email isn't valid");
      return false;
    }
    return true;
  };
  const handlePressEnter = (event) => {
    if (event && event.keyCode === 13) {
      handleLogin();
    }
  };
  const handleLogin = () => {
    let data = { email, password };
    let check = isValidInputs();
    if (check === true) {
      toast.success("Register successfully");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="login-container ">
      <form>
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
                    className={
                      objCheckInput.isValidEmail
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    placeholder="Email address"
                    required
                    value={email}
                    ref={(ref) => addInputRef(ref, 0)}
                    onChange={(e) => handleInputChange(e, 0)}
                  />
                </div>
                <div className="mb-3 input-password">
                  <input
                    type={isShowPassword === true ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={password}
                    ref={(ref) => addInputRef(ref, 1)}
                    onChange={(e) => handleInputChange(e, 1)}
                    onKeyDown={(event) => handlePressEnter(event)}
                    className={
                      objCheckInput.isValidPassword
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                  />
                  <i
                    className={
                      isShowPassword === true
                        ? "fa-regular fa-eye "
                        : "fa-regular fa-eye-slash"
                    }
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  ></i>
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => {
                      handleLogin();
                    }}
                  >
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
      </form>
    </div>
  );
};

export default Login;
