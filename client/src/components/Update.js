import React, { Component } from 'react'
import { update } from './UserFunctions'
import jwt_decode from 'jwt-decode'

class Update extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      name: '',
      phone: '',
      birthday: '',
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
    const updateUser = {
      username: this.state.username,
      name: this.state.name,
      phone: this.state.phone,
      birthday: this.state.birthday
    }

    update(updateUser).then(res => {
      this.props.history.push(`/profile`)
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
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter your name"
                  value={this.state.name}
                  onChange={this.onChange}
		  required
                />
              </div>         
              <div className="form-group">
                <label htmlFor="birthday">Birthday</label>
                <input
                  type="tel"
                  className="form-control"
                  name="birthday"
                  placeholder="Format: YYYY-MM-DD"
		  pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"
                  value={this.state.birthday}
                  onChange={this.onChange}
		  required
                />
              </div>
	      <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  placeholder="Format: 0123-456-789"
		  pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}"
                  value={this.state.phone}
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

export default Update
