const { responseHandler } = require("../utils/response");
const { PersistCeeService } = require("../services/persist-cee");
const { ListCeeService } = require("../services/list-cee");
const { CeeManifestService } = require("../services/cee-manifest");

class CeeController {
    static async publish(req, res, next) {
        try {
          const ceeMaster = await PersistCeeService.save(req);
          await ListCeeService.post(req, ceeMaster);

          return responseHandler({
              response: res,
              result: "C2E published successfully!",
          });
        } catch (error) {
          // Send an error response
          next(error);
        }
    }

    static async createManifest(req, res, next) {
        try {
            await CeeManifestService.create(req);
            return responseHandler({
                response: res,
                result: "Cee manifest created successfully!",
            });
        } catch (error) {
            // Send an error response
            next(error);
        }
    }
}
module.exports = { CeeController }