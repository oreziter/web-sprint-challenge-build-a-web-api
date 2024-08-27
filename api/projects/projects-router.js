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
      message: "Is been long over due",
    });
  }
  Post.insert(req.body) 
    .then(newProject => {
      res.status(201).json(newProject); 
    })
    .catch(err => {
      res.status(500).json({
        message: "Hello",
        error: err.message,
        stack: err.stack,
      });
    });
});

projects.put('/:id', (req, res) => {
  const { name, description, completed } = req.body;

  if (name === undefined || description === undefined || completed === undefined) {
    return res.status(400).json({
      message: "Please provide name, description, and completed status for the project",
    });
  }

  Post.update(req.params.id, { name, description, completed })
    .then(updatedProject => {
      if (!updatedProject) {
        return res.status(404).json({
          message: "The project with the specified ID does not exist",
        });
      }
      return res.status(200).json(updatedProject);
    })
    .catch(err => {
      res.status(500).json({
        message: "The project information could not be retrieved",
        error: err.message,
        stack: err.stack,
      });
    });
});


// projects.put('/:id', (req, res) => {
  
//   // console.log(description)
//   // console.log(name)

//   try {
//     const user = Post.update(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "null" });
//     }

//     const updatedUser = Post.update(req.params.id);
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.status(500).json({
//       message: "The user information could not be modified",
//       err: err.message,
//       stack: err.stack,
//     });
//   }
// });

 

projects.delete('/:id', async (req, res) => {
  try {
      const post = await Post.get(req.params.id)
      if (!post) {
        res.status(404).json({ 
          message: "The post with the specified ID does not exist" , 
        })
      } else {
        await Post.remove(req.params.id)
        res.status().json()  
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

