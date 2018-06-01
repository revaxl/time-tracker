import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Timer from './components/Timer';
import Task from './components/Task';

class App extends Component {
  
  render() {
    return (
      <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <Link className="navbar-brand" to="/"> Time Tracker </Link>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/"> home </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tasks"> tasks </Link>
            </li>
          </ul>
        </div>
      </nav>
    
      <Route path="/tasks" component={Task} />
      <Route path="/" exact component={Timer} />
      
      </div>
    )
  }
}

export default App;
