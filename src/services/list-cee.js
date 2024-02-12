const models = require("../../models");

class ListCeeService {
    static async post(req, cee) {
        // make HTTP Client to POST /api/v1/c2e-listings
        try {
            // Extract payload from request
            const payload = req.body;
            const storeId =  payload.storeId;
            // get StoreService by storeId
            const storeService = await models.StoreService.findByPk(storeId);
            const axios = require('axios');
            const apiKey = storeService.key; // Replace with your actual API key
            const postData = {
                ceeId: cee.id,
                name: cee.name,
                creator: {...payload.creator}
            };
            const response = await axios.post(storeService.host + '/api/v1/c2e-listings', postData, {
                headers: {
                    'x-api-key': apiKey
                }
            });

            console.log("Response =====>>>>> ", response.data);
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { ListCeeService }