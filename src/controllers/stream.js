const { responseHandler } = require("../utils/response");
const {CeeToken} = require('../../models');

class StreamController {

    // Generates a streaming session token for a specific c2e
  static async getToken(req, res, next) {
    // TODO: find c2eid and verify validity, check store association
    const ceeId = req.query.c2eId; // Assuming it exists for now, waiting on listing implementation
    const ceeToken = await CeeToken.create({ceeId});
    return responseHandler({
        response: res,
        result: {
            ceeId,
            token: ceeToken.token,
            expiresAt: ceeToken.expiresAt
        }
      });
  }

  // Checks wether a streaming session token is valid
  // Meant to be called by the publisherTool/Media library to check
  // if streaming is authorized
  static async verifyToken(req, res, next) {
    // TODO: Check relations between media resource <-> publishertool <-> token <-> c2e
    return responseHandler({
        response: res,
        result: {
            valid:true
        }
      });
  }
}


module.exports = { StreamController };
