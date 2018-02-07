import React from "react";
import axios from "axios";
import { Route, Link, Switch } from "react-router-dom";


class UserClicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicks: 0,
      initializedMultiplier: false,
      inc: .01,
      upgradeMultiplier: ''
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

  multiply = (e) => {
    let { clicks } = this.state
    clicks -= 10
    if (clicks === 0) {
      clicks = .05
    }
    this.setState({
      initializedMultiplier: true,
      clicks
    })
    setInterval(() => {
      let { clicks, inc } = this.state;
      clicks += (clicks * inc)
      console.log(typeof (clicks))
      console.log(this.state)
      this.setState({
        clicks
      })
    }, 1000);
  }


  upgradeMultiplier = e => {
    let { clicks, inc } = this.state;
    inc += .005
    this.setState({
      inc
    })
    console.log(inc)
  }


  render() {
    const { clicks, initializedMultiplier } = this.state;
    return (
      <div>
        <Link to="/users/logout">Log Out</Link>
        <h1> Click Counter: {clicks} </h1>
        <p>
          <button name='physicalClick' onClick={this.handleClick}>
            {" "}
            + HERE{" "}
          </button>

        </p>

        //here we are going to do a timer by second and how much we want to do ants by that second
        // so by clicking this button we are growing the ants by .2 ants per second 
        // so we are doing this.state += .2


        <p> to initialize multiplier pay 10 clicks  {''}
          {clicks >= 10 ?
            <button name='auto multiple' onClick={this.multiply}> {" "}
              +  Initialize Multiplier{" "}
            </button>: 
            <button name='auto multiple' onClick={this.multiply} disabled>{" "}
              +  Initialize Multiplier{" "}
            </button>}
        </p>

        {clicks >= 50 && initializedMultiplier ?
          <button name='auto multiple' onClick={this.upgradeMultiplier}>{" "}
            + UpGradeMultiplier{" "}
          </button> :
          <button name='auto multiple' onClick={this.upgradeMultiplier} disabled>{" "}
            + UpGradeMultiplier{" "}
          </button>}
      </div>
    );
  }
}

export default UserClicker;
