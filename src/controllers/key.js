const { responseHandler } = require("../utils/response");
const models = require("../../models");

class KeyController {
    static async list(req, res, next) {
        try {
          // Get all records from ApiKey model including the associated Client and ClientRole
          const keys = await models.ApiKey.findAll({
            include: [
              {
                model: models.Client,
                include: [models.ClientRole],
              },
            ],
          });
          const keysData = keys.map((key) => {
            return {
              id: key.id,
              key: key.key,
              clientRole: key.Client.ClientRole.name,
              clientEmail: key.Client.email,
              clientId: key.Client.id,
            };
          });

          // Send a response
          responseHandler({
            response: res, 
            result: keysData
          });
        } catch (error) {
          // Send an error response
          next(error);
        }
    }
}
module.exports = { KeyController }