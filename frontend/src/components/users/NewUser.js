import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

class NewUser extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      userAvailable: "",
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
    if (username && password) {
      if (password.length < 5){
        return this.setState({
          message: "Password must be at least 5 characters"
        })
      }
      axios.get("/users/new").then(response => {
        console.log("RESPONSE FOR GET REQUEST", response.data.data);
        if (!response.data.data.find(n => n.username === username)) {
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
        } else {
          this.setState({
            message: "Username already exists"
          });
        }
      });
    } else {
      this.setState({
        message: "Please fill out both forms"
      })
    }
  };

  render() {
    const { username, password, message } = this.state;
    console.log(this.state);

    return (
      <div>
      <Link to ="/users/login">Login</Link>
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