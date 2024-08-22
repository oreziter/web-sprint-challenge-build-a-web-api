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

projects.get('/:id', async (req, res) => {
  try {
      const post = await Post.get(req.params.id)
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

projects.post('/', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      message: "Please provide name and description for the project",
    });
  }

  projects.insert({ name, description })
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

projects.put('/:id', (req, res) => {
  const { title, contents} = req.body
  if (!title || !contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post", 
    })
  } else {
    Post.findById(req.params.id)
    .then(stuff => {
      if(!stuff) {
        res.status(404).json({
          message : "The post with the specified ID does not exist",
        })
      } else {
        return Post.update(req.params.id, req.body)
      }
    })
    .then(data => {
      if(data) {
        return Post.findById(null)
      }
    })
    .then(post => {
      if(post) {
        res.json(post)
      }
    })
    .catch(err => {
    res.status(500).json({ 
        message: "The post information could not be retrieved", 
        err: err.message,
        stack: err.stack,
      })
    })
  }

})


projects.delete('/:id', async (req, res) => {
  try {
      const post = await Post.get(req.params.id)
      if (!post) {
        res.status(404).json({ 
          message: "The post with the specified ID does not exist" , 
        })
      } else {
        await Post.remove(req.params.id)
        res.json() 
      }
  } catch (err)  {
      res.status(500).json({
        message: "The post could not be removed" ,
        err: err.message,
        stack: err.stack,
      })
    
  }
  
  })

projects.get('/:id/actions', async (req, res) => {
  try {
      const post = await Post.get(req.params.id)
      if (!post) {
        res.status(404).json({
          message: "The post with the specified ID does not exist", 
        });
      } else {
        const comments = await Post.getProjectActions(req.params.id);
         res.status(200).json(comments);
      }
  } catch (err) {
    res.status(500).json({ 
      message: "The comments information could not be retrieved" , 
        err: err.message,
        stack: err.stack,
      });
    }
});


module.exports = projects

