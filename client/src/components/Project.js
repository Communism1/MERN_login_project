import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class Project extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      errors: {}
    }
    this.handleCreateProject = this.handleCreateProject.bind(this)
    this.handleUpdateProject = this.handleUpdateProject.bind(this)
    this.handleAssignProject = this.handleAssignProject.bind(this)
    this.handleShowProject = this.handleShowProject.bind(this)
  }

  handleCreateProject(e) {
    this.props.history.push(`/createProject`)
  }

  handleUpdateProject(e) {
    this.props.history.push(`/updateProject`)
  }
  
  handleAssignProject(e) {
    this.props.history.push(`/assignProject`)
  }
  
  handleShowProject(e) {
    this.props.history.push(`/showProject`)
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      username: decoded.username
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <div className="col-sm-8 mx-auto">
              <h1 className="text-center">{this.state.username}</h1>
            </div>
	      <button
                onClick={this.handleCreateProject}
                className="btn btn-lg btn-primary btn-block"
              >
                Create Project
              </button>
	      <button
                onClick={this.handleUpdateProject}
                className="btn btn-lg btn-primary btn-block"
              >
                Update Project
              </button>
	      <button
                onClick={this.handleAssignProject}
                className="btn btn-lg btn-primary btn-block"
              >
                Assign Member
              </button>
	      <button
                onClick={this.handleShowProject}
                className="btn btn-lg btn-primary btn-block"
              >
                Show Project
              </button>	    	    	    
          </div>
        </div>
      </div>
    )
  }
}
export default Project
