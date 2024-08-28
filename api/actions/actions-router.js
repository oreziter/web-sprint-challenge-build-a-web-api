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
  const {project_id, description, notes} = req.body;

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

router.put('/:id', async (req, res) => {
  const { project_id, description, notes, completed } = req.body;
 
  if (!project_id || !description || !notes) {
    return res.status(400).json({
      message: "Please provide project_id, description, and notes for the action",
    });
  }
  if (description.length > 128) {
    return res.status(400).json({
      message: "Description must be up to 128 characters long",
    });
  }
  try {
    const action = await Actions.get(req.params.id);
    if (!action) {
      return res.status(404).json({
        message: "The action with the specified ID does not exist",
      });
    }
    const updatedAction = await Actions.update(req.params.id, {
      project_id,
      description,
      notes,
      completed: completed !== undefined ? completed : action.completed 
    });

    if (updatedAction) {
      return res.status(200).json(updatedAction);
    }
  } catch (err) {
    return res.status(500).json({
      message: "The action information could not be retrieved",
      error: err.message,
      stack: err.stack,
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
