import React from "react"
import axios from "axios"
import { Route, Link, Switch } from "react-router-dom"
import UserInfo from "./UserInfo";
import BrainCount from "./BrainCount";

class ZombieTakeover extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      clicks: 0
    }
  }

  componentDidMount() {
    axios
      .get(`/users/clicks`, { username: this.props.username })
      .then(res => {
        console.log("got clicks:", res)
        this.setState({
          clicks: res.data.clicks || 0
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleClick = e => {
    let { clicks } = this.state
    clicks += 1
    this.setState({
      clicks
    })
    axios
      .patch(`/users/clicks`, {
        username: this.props.username,
        clicks: clicks
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    const { clicks } = this.state
    const { username } = this.props
    return (
      <div className="gameContainer" onClick={this.handleClick}>
        <BrainCount clicks={clicks} />
        <UserInfo username={username} />
        <div id="zombieSprite" />
      </div>
    )
  }
}

export default ZombieTakeover
