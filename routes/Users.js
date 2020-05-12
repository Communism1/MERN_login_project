const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Update = require('../models/Update')
const ProjectInfo = require('../models/ProjectInfo')
users.use(cors())

var mongoClient = require('mongodb').MongoClient;

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const userData = {
    name: req.body.name,
    phone: req.body.phone,
    password: req.body.password,
    username: req.body.username,
    birthday: req.body.birthday,
  }

  User.findOne({
    username: req.body.username
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.username + 'Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/update', (req, res) => {
  const userData = {
    name: req.body.name,
    phone: req.body.phone,
    username: req.body.username,
    birthday: req.body.birthday,
  }

  mongoClient.connect('mongodb://127.0.0.1:27017', function (err, db) {
    if (err) throw err;
    var userdb = db.db('mernloginreg');
    userdb.collection('users').updateOne(
	{username: userData.username}, 
	{$set: userData}, function (err,res) {
        if (err) throw err;
        console.log('update success: ' + res.result.nModified + ' record');
    });
    db.close();
  });
  res.send("Updated")
})


users.post('/createProject', (req, res) => {
  const userData = {
    name: req.body.name,
    member: req.body.username,
    discription: req.body.discription
  }

  mongoClient.connect('mongodb://127.0.0.1:27017', function (err, db) {
    if (err) throw err;
    var userdb = db.db('mernloginreg');
    userdb.collection('project').insertOne(
	{projectName: userData.name, discription: userData.discription, member:[]}, 
	function (err,res) {
        if (err) throw err;
        console.log('update success: ' + res.result.nModified + ' record');
    });
    userdb.collection('project').update(
	{projectName: userData.name}, 
	{$push: {member: userData.member}}, 
	function (err,res) {
        if (err) throw err;
        console.log('update success: ' + res.result.nModified + ' record')
    });
    db.close();
  });
  res.send("Updated")
})

users.post('/updateProject', (req, res) => {
  const userData = {
    username: req.body.username,
    projectName: req.body.projectName,
    nameUpdate: req.body.nameUpdate,
    discription: req.body.discription
  }

  mongoClient.connect('mongodb://127.0.0.1:27017', function (err, db) {
    if (err) throw err;
    var userdb = db.db('mernloginreg');
    if ( userdb.collection('project').findOne({projectName: userData.projectName, member: userData.username})) {
    	userdb.collection('project').update(
	  {projectName: userData.projectName},
	  {$set: {projectName: userData.nameUpdate, discription: userData.discription}},
	  function (err,res) {
          if (err) throw err;
          console.log('update success: ' + res.result.nModified + ' record');
        });
    }
    db.close();
  });
  res.send("Updated")
})

users.post('/assignProject', (req, res) => {
  const userData = {
    username: req.body.username,
    projectName: req.body.projectName,
    memberName: req.body.memberName
  }

  mongoClient.connect('mongodb://127.0.0.1:27017', function (err, db) {
    if (err) throw err;
    var userdb = db.db('mernloginreg');
    if ( userdb.collection('project').findOne({projectName: userData.projectName, member: userData.username})) {
    	userdb.collection('project').update(
	  {projectName: userData.projectName},
	  {$addToSet: {member: userData.memberName}},
	  function (err,res) {
          if (err) throw err;
          console.log('update success: ' + res.result.nModified + ' record');
        });
    }
    db.close();
  });
  res.send("Updated")
})

users.post('/login', (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            _id: user._id,
            username: user.username
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        } else {
          // Passwords don't match
          res.json({ error: 'User does not exist' })
        }
      } else {
        res.json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = users
