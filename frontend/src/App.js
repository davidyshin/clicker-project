import React, { Component } from 'react';
import logo from './logo.svg';
import Clicker from './Clicker'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Clicker</h1>
        </header>
        <Clicker />
      </div>
    );
  }
}

export default App;
