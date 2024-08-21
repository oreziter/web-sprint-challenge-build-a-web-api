// Write your "projects" router here!

const express = require('express');
const Post = require('./projects-model');


const projects = express.Router()

projects.get('/', (req, res) => {
  Post.get()
  .then(found => {
    res.json(found)
    // res.send('welcome')
  })
  .catch(err => {
    res.status(200).json({ 
      message: "The posts information could not be retrieved",
      err: err.message,
      stack: err.stack,
    })
  })

})

module.exports = projects

