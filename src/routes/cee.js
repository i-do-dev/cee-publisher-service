const express = require("express");
const ceeRouter = express.Router();
const {CeeController} = require('../controllers/cee');

const authenticate = require('../middleware/api/key-authenticate');
const authorize = require('../middleware/api/key-authorize');

ceeRouter.post('/publish', 
    authenticate, 
    authorize(['cee-publisher-tool']),
    CeeController.publish
);

ceeRouter.post('/manifest',
    authenticate,
    authorize(['cee-store-service']),
    CeeController.createManifest
);

module.exports = ceeRouter;