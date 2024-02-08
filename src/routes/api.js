const express = require('express');
const router = express.Router();
const adminRouter = require('./admin');
const ceeRouter = require('./cee');
const path = require('path');

const setRouter = (app) => {

  // api routes
  app.use('/api/v1', router);
  router.use(`/admin`, adminRouter);
  router.use(`/c2e`, ceeRouter);

  // page routes
  app.use('/', router);
  router.get('/', (req, res) => {
    // render the index page from assets folder
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });
  router.get('/login', (req, res) => {
    // render the login page from assets folder
    res.sendFile(path.join(__dirname, '../../public/login.html'));
  });
  router.get('/register', (req, res) => {
    // render the register page from assets folder
    res.sendFile(path.join(__dirname, '../../public/register.html'));
  });
  
};

module.exports = { setRouter };
