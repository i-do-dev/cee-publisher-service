const express = require('express');
const router = express.Router();
const adminRouter = require('./admin');
const ceeRouter = require('./cee');

const setRouter = (app) => {
  app.use('/api/v1', router);
  router.use(`/admin`, adminRouter);
  router.use(`/c2e`, ceeRouter);
};

module.exports = { setRouter };
