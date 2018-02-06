import React, { Component } from "react";
import axios from "axios";

class NewUser extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      message: ""
    };
  }

  // Track username and password input inside state
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // When user submits form
  handleFormSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;

    axios
      .post("/users/new", {
        username: username,
        password: password
      })
      .then(res => {
        console.log(res);
        this.setState({
          username: "",
          password: "",
          message: "Registered user"
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          username: "",
          password: "",
          message: "Error registering user"
        });
      });
  };

  render() {
    const { username, password, message } = this.state;
    console.log(this.state);

    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={this.handleInput}
            value={username}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={this.handleInput}
            value={password}
          />
          <input type="submit" value="Register" />
        </form>
        <p>{message}</p>
      </div>
    );
  }
}

export default NewUser;
