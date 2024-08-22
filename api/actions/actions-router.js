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







module.exports = router