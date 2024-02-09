const { responseHandler } = require("../utils/response");
const models = require("../../models");

class StoreServiceController {
    static async list(req, res, next) {
        try {
          // Get all records from StoreService model
          const storeServices = await models.StoreService.findAll();
          const storeServicesData = storeServices.map((storeService) => {
            return {
              id: storeService.id,
              name: storeService.name,
              host: storeService.host,
              key: storeService.key,
            };
          });

          // Send a response
          responseHandler({
            response: res, 
            result: storeServicesData
          });
        } catch (error) {
          // Send an error response
          next(error);
        }
    }

    static async create(req, res, next) {
        try {
          // Create a new record in StoreService model
          const storeService = await models.StoreService.create({
            name: req.body.name,
            host: req.body.host,
            key: req.body.key,
          });

          // Send a response
          responseHandler({
            response: res, 
            result: storeService
          });
        } catch (error) {
          // Send an error response
          next(error);
        }
    }
}
module.exports = { StoreServiceController }