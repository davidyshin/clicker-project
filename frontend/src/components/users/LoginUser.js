import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Route, Link, Switch } from "react-router-dom";

import NewUser from "./NewUser";

class LoginUser extends React.Component {
  state = {
    usernameInput: "",
    passwordInput: "",
    message: "",
    loggedIn: false
  };

  handleUsernameChange = e => {
    this.setState({
      usernameInput: e.target.value
    });
  };

  handlePasswordChange = e => {
    this.setState({
      passwordInput: e.target.value
    });
  };

  submitForm = e => {
    e.preventDefault();
    const { usernameInput, passwordInput } = this.state;

    if (usernameInput.length < 3) {
      this.setState({
        message: "Username length must be at least 3"
      });
      return;
    }
    axios
      .post("/users/login", {
        username: usernameInput,
        password: passwordInput
      })
      .then(res => {
        this.props.setUser(res.data);
        this.setState({
          loggedIn: true
        });
      })
      .catch(err => {
        this.setState({
          usernameInput: "",
          passwordInput: "",
          message: "username/password not found"
        });
      });
  };

  render() {
    const { usernameInput, passwordInput, message, loggedIn } = this.state;

    if (loggedIn) {
      return <Redirect to="/users/ZombieTakeover" />;
    }

    return (
      <div>
        <Link to="/users/new">New User</Link>
        <h1> Log In </h1>

        <form onSubmit={this.submitForm}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={usernameInput}
              onChange={this.handleUsernameChange}
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={passwordInput}
              onChange={this.handlePasswordChange}
            />
          </label>

          <input type="submit" value="Submit" />
        </form>
        <p>{message}</p>
      </div>
    );
  }
}

export default LoginUser;
