const express = require("express");
const ceeRouter = express.Router();
const { responseHandler } = require("../utils/response");

const authenticate = require('../middleware/api/key-authenticate');
const authorize = require('../middleware/api/key-authorize');

ceeRouter.post('/publish', authenticate, authorize(['cee-publisher-tool']), (req, res) => {
    return responseHandler({
        response: res,
        result: req.body,
    });
});

module.exports = ceeRouter;