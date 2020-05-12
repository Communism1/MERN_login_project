import React, { Component } from 'react'
import { updateProject } from './UserFunctions'
import jwt_decode from 'jwt-decode'

class UpdateProject extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      nameUpdate: '',
      discription: '',
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
    const updateData = {
      username: this.state.username,
      nameUpdate: this.state.nameUpdate,
      discription: this.state.discription,
      projectName: this.state.projectName
    }

    updateProject(updateData).then(res => {
      this.props.history.push(`/project`)
    })
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
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Input your new info</h1>
	      <form role="form" data-toggle="validator">
              <div className="form-group">
                <label htmlFor="projectName">Your project name</label>
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
                <label htmlFor="nameUpdate">Update name</label>
                <input
                  type="text"
                  className="form-control"
                  name="nameUpdate"
                  placeholder="Enter your update name"
                  value={this.state.nameUpdate}
                  onChange={this.onChange}
		  required
                />
              </div>
	      <div className="form-group">
                <label htmlFor="discription">Discription</label>
                <input
                  type="text"
                  className="form-control"
                  name="discription"
                  placeholder="Enter your discription"
                  value={this.state.discription}
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

export default UpdateProject
