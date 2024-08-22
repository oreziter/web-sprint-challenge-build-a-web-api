// Write your "actions" router here!

const express = require('express');
const Actions = require('./actions-model');
const router = express.Router()

router.get('/', (req, res) => {
  Actions.get()
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

router.get('/:id', async (req, res) => {
  try {
      const post = await Actions.get(req.params.id)
      if (!post) {
        res.status(404).json({
          message: "The post with the specified ID does not exist", 
        })
      } else {
        res.json(post)
      }
   } catch(err) {
      res.status(500).json({ 
        message: "The post information could not be retrieved" ,
        err: err.message,
        stack: err.stack,
      })
  }

})

router.post('/', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      message: "Please provide name and description for the project",
    });
  }

  router.insert({ name, description })
    .then(newProject => {
      res.status(201).json(newProject); 
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error while saving the project to the database",
        error: err.message,
        stack: err.stack,
      });
    });
});






module.exports = router