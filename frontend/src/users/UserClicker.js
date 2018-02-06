import React from "react";
import axios from "axios";

class UserClicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicks: 0
    };
  }

  componentDidMount() {
    console.log("user clicks mounted");
    axios
      .get(`/users/clicks`, {id: this.props.id})
      .then(res => {
        console.log("got clicks:", res);
        this.setState({
          clicks: res.data.clicks
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleClick = e => {
    let { clicks } = this.state || 0;
    clicks += 1;
    this.setState({
      clicks
    });
    axios
      .patch(`/users/clicks`, {
        id: this.props.id,
        clicks: this.state.clicks
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { clicks } = this.state;
    console.log("user clicks, ", this.state);
    return (
      <div>
        <h1> Click Counter: {clicks} </h1>
        <button type="button" onClick={this.handleClick}>
          {" "}
          + HERE{" "}
        </button>
      </div>
    );
  }
}

export default UserClicker;
