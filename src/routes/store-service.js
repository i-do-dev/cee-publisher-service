const express = require("express");
const storeServiceRouter = express.Router();
const {StoreServiceController} = require('../controllers/store-service');

storeServiceRouter.get("/", StoreServiceController.list);
storeServiceRouter.post("/", StoreServiceController.create);

module.exports = storeServiceRouter;