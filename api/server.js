const express = require('express');
// const Projects = require("./projects/model");
// const actions = require("./actions/model");

const projectsRouter = require('./projects/projects-router.js')
const actionsRouter = require('./actions/actions-router.js')

const server = express(); 
server.use(express.json());

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

  server.use('/api/projects', projectsRouter)
  server.use('/api/actions', actionsRouter)

  
  module.exports = server

