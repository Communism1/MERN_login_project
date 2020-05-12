import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Update from './components/Update'
import Project from './components/Project'
import CreateProject from './components/CreateProject'
import UpdateProject from './components/UpdateProject'
import AssignProject from './components/AssignProject'
import ShowProject from './components/ShowProject'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
	    <Route exact path="/update" component={Update} />
	    <Route exact path="/project" component={Project} />
	    <Route exact path="/createProject" component={CreateProject} />
            <Route exact path="/updateProject" component={UpdateProject} />
	    <Route exact path="/showProject" component={ShowProject} />
	    <Route exact path="/assignProject" component={AssignProject} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
