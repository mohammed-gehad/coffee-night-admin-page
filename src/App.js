import React, { useState } from "react";
import "./App.css";
import Login from "./features/auth/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/auth/authSlice";
import Orders from "./features/orders/Orders";
import Items from "./features/menu/Items";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { IconContext } from "react-icons";
import { ReactComponent as Logo } from "./coffee-night.svg";
import Intro from "./components/Intro";

function App() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  return (
    <IconContext.Provider
      value={{ color: "white", className: "global-class-name" }}
    >
      <div className="App">
        <ToastContainer />

        <div className="flex">
          <div className="navigation">
            <Logo fill="#251002" />

            {!token ? (
              <div as="li">
                <a href="/login">Login</a>
              </div>
            ) : (
              <>
                <div as="li">
                  <a href="/orders">Orders</a>
                </div>
                <div as="li">
                  <a href="/menu">Menu</a>
                </div>
                <div as="li">
                  <a onClick={() => dispatch(logout())}>Logout</a>
                </div>
              </>
            )}
          </div>
          <Router>
            <div className="content">
              {token ? (
                <Switch>
                  <Route path="/orders">
                    <Orders />
                  </Route>
                  <Route path="/menu">
                    <Items />
                  </Route>
                  <Route path="/">
                    <Intro />
                  </Route>
                </Switch>
              ) : (
                <Switch>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/">
                    <Intro />
                  </Route>
                </Switch>
              )}
            </div>
          </Router>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default App;
