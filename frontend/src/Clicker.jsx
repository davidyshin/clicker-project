import React, { Component } from "react";

class Clicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        count: 0
    };
  }
  handleClick = (e) => {
      let {count} = this.state
      count +=1
    this.setState({
        count
    })
  }
  render() {
      return (
            <div> 
              <h1> Click Counter: {this.state.count} </h1>
                <button type="button" onClick={this.handleClick}> + HERE </button>
            </div>
      )
  }

}

export default Clicker