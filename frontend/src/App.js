import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";

import NewUser from "./users/NewUser";
import LoginUser from "./users/LoginUser";
import UserClicker from "./users/UserClicker";
import LogOut from "./users/LogOut"

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    // try to get user
  }
  setUser = user => {
    this.setState({ user: user });
  };
  logOutUser = () => {
    this.setState({ user: null });
  };

  renderLogin = () => {
    return <LoginUser setUser={this.setUser} />;
  };

  renderUserClicker = props => {
    const { user } = this.state;
    if (!user) {
      return <LoginUser setUser={this.setUser} />;
    }
    return <UserClicker id={user.username} />;
  };

  renderLogOut = () => {
    return <LogOut logOutUser={this.logOutUser} />;
  };

  render() {
    return (
      <div className="App">
        <h1> CLICKER GAME </h1>

        <Route exact path="/" component={LoginUser} />
        <Route path="/users/new" component={NewUser} />
        <Route path="/users/clicks" component={UserClicker} />
        <Route exact path="/users/login" render={this.renderLogin} />
        <Route path="/users/logout" render={this.renderLogOut} />
      </div>
    );
  }
}

export default App;
