import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { showProject } from './UserFunctions'
import {Table} from 'react-bootstrap'
import axios from 'axios'

export default class users extends Component {
    constructor(props) {
        super(props);
        this.state = {
	    projectName:{},
            Users: []
        };
    }
    getUsersData() {
        axios
            .get(`/hello`, {
	        projectName: "123"
	    })
            .then(res => {
            })
            .catch((error) => {
                console.log(error)
            })

    }
    componentDidMount(){
        this.getUsersData()
    }
    render() {

        return (
            <div>
                {this.state.users}
            </div>
        )
    }
}