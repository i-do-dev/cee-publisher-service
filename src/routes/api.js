const express = require('express');
const router = express.Router();
const adminRouter = require('./admin');
const ceeRouter = require('./cee');
const pagesRouter = require('./pages');
const keyRouter = require('./key');
const storeServiceRouter = require('./store-service');
const ceeStoreRouter = require('./cee-store');

const setRouter = (app) => {

  // api routes
  app.use('/api/v1', router);
  router.use(`/admin`, adminRouter);
  
  router.use(`/c2e`, ceeRouter);
  router.use(`/c2e-stores`, ceeStoreRouter);
  
  router.use(`/keys`, keyRouter);
  router.use(`/store-services`, storeServiceRouter);

  // page routes
  app.use('/', router);
  router.use(`/`, pagesRouter);
};

module.exports = { setRouter };
