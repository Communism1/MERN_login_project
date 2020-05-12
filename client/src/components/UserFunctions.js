import axios from 'axios'

export const register = newUser => {
  return axios
    .post('users/register', {
      name: newUser.name,
      username: newUser.username, 
      phone: newUser.phone,
      birthday: newUser.birthday,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}

export const update = updateUser => {
  return axios
    .post('users/update', {
      username: updateUser.username,
      name: updateUser.name,
      phone: updateUser.phone,
      birthday: updateUser.birthday,
    })
    .then(response => {
      console.log('Updated')
    })
}

export const updateProject = updateProject => {
  return axios
    .post('users/updateProject', {
	username: updateProject.username,
        nameUpdate: updateProject.nameUpdate,
	discription: updateProject.discription,
	projectName: updateProject.projectName
    })
    .then(response => {
      console.log('Project')
    })
}

export const assignProject = assignData => {
  return axios
    .post('users/assignProject', {
	projectName: assignData.projectName,
	memberName: assignData.memberName,
    })
    .then(response => {
	console.log('Project')
    })
}

export const showProject = showData => {
  return axios
    .post('users/showProject', {
	userName: showData.userName,
	projectName: showData.projectName,
	discription: showData.discription,
	memberName: showData.memberName
    })
    .then(response => response.data)
}

export const projectCreate = createProject => {
  return axios
    .post('users/createProject', {
	username: createProject.username,
        name: createProject.name,
	discription: createProject.discription
    })
    .then(response => {
      console.log('Project')
    })
}

export const login = user => {
  return axios
    .post('users/login', {
      username: user.username,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getProfile = user => {
  return axios
    .get('users/profile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
