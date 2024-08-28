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
  const {project_id,description , notes} = req.body;

  if (!description || !project_id || !notes) {
    return res.status(400).json({
      message: "Please provide name, description, project_id, notes, and completed status for the action",
    });
  }

  Actions.insert({ description, project_id, notes })
    .then(newAction => {
      res.status(201).json(newAction); 
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error while saving the action to the database",
        error: err.message,
        stack: err.stack,
      });
    });
});



router.put('/:id', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description ) {
   return res.status(400).json({
      message: "Please provide title and contents for the post", 
    })
  } else {
    Actions.insert(req.params.id)
    .then(action => {
      if(!action) {
        res.status(404).json({
          message : "The post with the specified ID does not exist",
        })
      } else {
        return Actions.update(req.params.id, { name, description });
      }
    })
    .then(updatedAction => {
      if(updatedAction) {
        return Actions.put(req.params.id);
      }
    })
    .then(action => {
      if(!action) {
        res.json(action);
      }
    })
    .catch(err => {
    res.status(500).json({ 
        message: "The post information could not be retrieved", 
        err: err.message,
        stack: err.stack,
      });
    });
  }
});


router.delete('/:id', async (req, res) => {
  try {
      const post = await Actions.get(req.params.id)
      if (!post) {
        res.status(404).json({ 
          message: "The post with the specified ID does not exist" , 
        })
      } else {
        await Actions.remove(req.params.id)
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

module.exports = router;
