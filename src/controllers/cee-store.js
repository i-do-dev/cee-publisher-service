const { responseHandler } = require("../utils/response");
const models = require("../../models");

class CeeStoreController {
    static async list(req, res, next) {
        try {
          // Get all records from StoreService model
          const storeServices = await models.StoreService.findAll();
          const storeServicesData = storeServices.map((storeService) => {
            return {
              id: storeService.id,
              name: storeService.name
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
}
module.exports = { CeeStoreController }