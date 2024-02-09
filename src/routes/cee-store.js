const express = require("express");
const ceeStoreRouter = express.Router();
const {CeeStoreController} = require('../controllers/cee-store');
const authenticate = require('../middleware/api/key-authenticate');
const authorize = require('../middleware/api/key-authorize');


ceeStoreRouter.get("/", authenticate, authorize(['cee-publisher-tool']), CeeStoreController.list);

module.exports = ceeStoreRouter;