import React from "react";
import axios from "axios";
import { Route, Link, Switch } from "react-router-dom";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicks: 0
    };
  }

  componentDidMount() {
    axios
      .get(`/users/clicks`, { username: this.props.username })
      .then(res => {
        console.log("got clicks:", res);
        this.setState({
          clicks: res.data.clicks || 0
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleClick = e => {
    let { clicks } = this.state;
    clicks += 1;
    this.setState({
      clicks
    });
    axios
      .patch(`/users/clicks`, {
        username: this.props.username,
        clicks: clicks
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { clicks } = this.state;
    return (
      <div className="gameContainer">
        <div className="gameHeader">
          <Link to="/users/logout">Log Out</Link>
          <h1> Click Counter: {clicks} </h1>
        </div>
        <div id="p5Game" onClick={this.handleClick}>
        </div>
      </div>
    );
  }
}

export default Game;