import React from "react"
import { Route, Link, Switch } from "react-router-dom"
import axios from "axios"
import './App.css'
import NewUser from "./users/NewUser"
import LoginUser from "./users/LoginUser"
<<<<<<< HEAD:frontend/src/components/App.js
import Game from "./game/Game"
=======
import ZombieTakeover from "./game/ZombieTakeover"
>>>>>>> 7fe182ec73bab28c84cfbf066506d2559ae9f5d6:frontend/src/App.js
import LogOut from "./users/LogOut"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null,
      newUser: true,
    }
  }

  componentDidMount() {
    // try to get user
  }

  setUser = user => {
    this.setState({ user: user })
  }

  logOutUser = () => {
    this.setState({ user: null })
  }

  renderLogin = () => {
    return <LoginUser setUser={this.setUser} />
  }

  renderUserClicker = props => {
    const { user } = this.state
    if (!user) {
      return <LoginUser setUser={this.setUser} />
    }
<<<<<<< HEAD:frontend/src/components/App.js
    return <Game id={user.username} />
=======
    return <ZombieTakeover id={user.username} />
>>>>>>> 7fe182ec73bab28c84cfbf066506d2559ae9f5d6:frontend/src/App.js
  }

  renderLogOut = () => {
    return <LogOut logOutUser={this.logOutUser} />
  }

  render() {
    const { user, newUser } = this.state
    return (
      <div className="App">
        <div>
          <h1>Zombie Takeover</h1>
        </div>

        <Route exact path="/" component={LoginUser} />
        <Route path="/users/new" component={NewUser} />
<<<<<<< HEAD:frontend/src/components/App.js
        <Route path="/users/AntTakeover" component={Game} />
=======
        <Route path="/users/ZombieTakeover" component={ZombieTakeover} />
>>>>>>> 7fe182ec73bab28c84cfbf066506d2559ae9f5d6:frontend/src/App.js
        <Route exact path="/users/login" render={this.renderLogin} />
        <Route path="/users/logout" render={this.renderLogOut} />
      </div>
    )
  }
}

export default App
