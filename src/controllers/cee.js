const { responseHandler } = require("../utils/response");
const models = require("../../models");
const { PersistCeeService } = require("../services/persist-cee");

class CeeController {
    static async publish(req, res, next) {
        try {
          const cee = PersistCeeService.save(req, models);
          return responseHandler({
              response: res,
              result: "C2E published successfully!",
          });
        } catch (error) {
          // Send an error response
          next(error);
        }
    }
}
module.exports = { CeeController }