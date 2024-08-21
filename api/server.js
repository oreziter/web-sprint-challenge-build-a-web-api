const express = require('express');
const projectsRouter = require('./projects/projects-router.js')
// const actionsRouter = require('./actions/actions-router.js')

const server = express(); 
server.use(express.json());

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

  server.use('/api/projects', projectsRouter)


  module.exports = server

