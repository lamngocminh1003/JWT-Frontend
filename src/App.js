import "./App.scss";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import React, { useEffect, useContext } from "react";
import Header from "./components/Nav/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Page404 from "./components/ErrorPage/Page404";
import Login from "./components/Login/Login";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          {/* <Header /> */}
          <Container></Container>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Switch>
          <Route path="/" exact>
            home{" "}
          </Route>
          <Route path="/about">about</Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/create-account">
            <CreateAccount />
          </Route>
          <Route path="*">
            <Page404 />{" "}
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
