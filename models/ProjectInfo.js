const mongoose = require('mongoose')
const Schema = mongoose.Schema

var subSchema = mongoose.Schema({
    name: String
},{ _id : false });


const ProjectSchema = new Schema({
  projectName: {
    type: String,
    required: true
  },
  memberName: {
    type: [subSchema]
  },
  discription: {
    type: String,
    required: true
  },
})

module.exports = Project = mongoose.model('projects', ProjectSchema)
