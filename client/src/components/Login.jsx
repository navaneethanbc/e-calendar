import React from "react";
import blogo from "../assets/icon.png";
import clogo from "../assets/background.jpg";
const Login = () => {
  return (
    <div className="loginMain">
      <div className="header">
        <img className="boclogo" src={blogo} alt="boc logo" />
        <h1>calendar</h1>
      </div>
      <hr />
      <div className="container">
        <div className="imgcontainer">
          <img className="callogo" src={clogo} alt="calendar logo" />
        </div>
        <div className="logincontainer">
          <h1>Login</h1>
          <form action="">
            <input
              type="email"
              id="email"
              placeholder="Email address"
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
            />
            <button>Login</button>

            <div>
              <a className="fp" href="#">
                Forgot Password
              </a>
              <hr />
            </div>

            <div className="para">
              <p>
                New to Calendar? <a href="/register">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
