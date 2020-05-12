import React, { Component } from 'react'
import { assignProject } from './UserFunctions'
import jwt_decode from 'jwt-decode'

class AssignProject extends Component {
  constructor() {
    super()
    this.state = {
      userName: '',
      memberName: '',
      projectName: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    const assignData = {
      userName: this.state.userName,
      memberName: this.state.memberName,
      projectName: this.state.projectName
    }
        
    assignProject(assignData).then(res => {
      this.props.history.push(`/project`)
    })
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
	userName: decoded.userName,
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Input your  info</h1>
	      <form role="form" data-toggle="validator">	      
	      <div className="form-group">
                <label htmlFor="projectName">Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="projectName"
                  placeholder="Enter your project name"
                  value={this.state.projectName}
                  onChange={this.onChange}
		  required
                />
              </div>
	      <div className="form-group">
                <label htmlFor="memberName">Member assign</label>
                <input
                  type="text"
                  className="form-control"
                  name="memberName"
                  placeholder="Enter member name"
                  value={this.state.memberName}
                  onChange={this.onChange}
		  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Submit
              </button>
            </form>
	    </form>
          </div>
        </div>
      </div>
    )
  }
}

export default AssignProject
