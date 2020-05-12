import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { withRouter } from 'react-router-dom';

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      errors: {}
    }
    this.handleProject = this.handleProject.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleProject(x) {
     x.preventDefault()    
     this.props.history.push('/project')
  }

  handleUpdate(e) {
    e.preventDefault()
    this.props.history.push('/update')
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
                onClick={this.handleUpdate}
                className="btn btn-lg btn-primary btn-block"
              >
                Update Info
              </button>
	      <button
                onClick={this.handleProject}
                className="btn btn-lg btn-primary btn-block"
              >
                Project Info 
              </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile