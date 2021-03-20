import React, { Component, useCallback, useEffect } from 'react';
import { BrowserRouter, Route, Link, HashRouter } from 'react-router-dom';
import { Detector } from "react-detect-offline";

import './App.css';
import axios from 'axios';

async function getTodos(isOnline) {
  try {
    if (!isOnline) {
      const data = localStorage.getItem("users");
      return JSON.parse(data);
    }

    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    localStorage.setItem("users", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
  }

}

const NavBar = () => (
  <div className="navbar">
    <h3>Listing users</h3>
    <Link to="/">Current</Link>
    <Link to="/completed">Completed</Link>
  </div>
);

class Template extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  async componentDidMount() {
    const users = await getTodos(navigator.onLine);
    this.setState({ users })
  }

  render(props) {



    return (<div>
      <NavBar />
      <Detector
      render={({ online }) => (
        <div className={online ? "online" : "offline"}>
          You are currently {online ? "online" : "offline"}
        </div>
      )}
/>

      <p className="page-info">
        {this.props.title}:
      </p>
      <ul className={this.props.status}>
        { this.state.users.map(item => {
          return (<li key={item.id}>{item.id} | {item.name} | {item.email} </li>)
        }) }
      </ul>
    </div>
    );
  }

}

const CurrentTasks = () => (
  <div>
    <Template title="Current Tasks" status="Current" />
  </div>
);

const CompletedTasks = () => (
  <Template title="Completed Tasks" status="Completed" />
);

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path="/" component={CurrentTasks} />
          <Route path="/completed" component={CompletedTasks} />
        </div>
      </HashRouter>
    );
  }
}

export default App;