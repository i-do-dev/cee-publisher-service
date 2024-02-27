const { responseHandler } = require("../utils/response");
const CustomError = require("../utils/error");
const {CeeToken, CeeManifest, StoreService, ApiKey} = require('../../models');

class StreamController {

    // Generates a streaming session token for a specific c2e
  static async getToken(req, res, next) {
    // TODO: find c2eid and verify validity, check store association
    const manifest = await CeeManifest.findOne({ 
      where: { subscriptionId: req.query.subid },
      include: { model: StoreService }
    });

    if (!manifest) {
      const error = new CustomError({code: 401, message: 'cee-publisher-service: Manifest for provided token not found'});
      return next(error);
    }

    if (req.Client.id !== manifest.StoreService.publisherClientId) {
      const error = new CustomError({code: 401, message: 'cee-publisher-service: Manifest client mismatch for provided token'});
      return next(error);
    }

    const ceeToken = await CeeToken.create({ceeId: manifest.ceeId});
    return responseHandler({
        response: res,
        result: {
            ceeId: manifest.ceeId,
            token: ceeToken.token,
            expiresAt: ceeToken.expiresAt
        }
      });
  }

  // Checks wether a streaming session token is valid
  // Meant to be called by the publisherTool/Media library to check
  // if streaming is authorized
  static async verifyToken(req, res, next) {
    const token = await CeeToken.findOne({
      where: { ceeId: req.query.ceeId, token: req.query.token }
    });

    if (!token) {
      const error = new CustomError({code: 401, message: 'cee-publisher-service: Invalid token'});
      return next(error);
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (token.expiresAt < currentTime) {
      const error = new CustomError({code: 401, message: 'cee-publisher-service: Token has expired'});
      return next(error);
    }

    return responseHandler({
        response: res,
        result: {
            valid:true
        }
      });
  }

  static async getManifest(req, res, next) {
    const manifest = await CeeManifest.findOne({ 
      where: { subscriptionId: req.query.subid },
      include: { model: StoreService }
    });

    if (!manifest) {
      const error = new CustomError({code: 404, message: 'cee-publisher-service: Manifest not found'});
      return next(error);
    }

    if (req.Client.id !== manifest.StoreService.publisherClientId) {
      const error = new CustomError({code: 401, message: 'cee-publisher-service: Manifest client mismatch'});
      return next(error);
    }

    return responseHandler({
        response: res,
        result: {
            ceeId: manifest.ceeId,
            manifest: manifest.manifest
        }
      });
  }
}


module.exports = { StreamController };
