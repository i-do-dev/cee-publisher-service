const models = require("../../models");

class ListCeeService {
    static async post(req, cee) {
        // make HTTP Client to POST /api/v1/c2e-listings
        try {
            // Extract payload from request
            const payload = req.body;
            const storeId =  payload.storeId;

            // Extract all subject, educationLevel and keywords attrubutes under workflowItems attribute from payload
            const workflowItems = payload.workflowItems;
            let subject = [];
            let educationLevel = [];
            let keywords = [];
            workflowItems.forEach(workflowItem => {
                subject = [...subject, ...workflowItem.subject];
                educationLevel = [...educationLevel, ...workflowItem.educationLevel];
                keywords = [...keywords, ...workflowItem.keywords];
            });

            // get StoreService by storeId
            const storeService = await models.StoreService.findByPk(storeId);
            const axios = require('axios');
            const apiKey = storeService.key; // Replace with your actual API key
            const postData = {
                ceeId: cee.id,
                name: cee.name,
                subject,
                educationLevel,
                keywords,
                publisherClientId: storeService.publisherClientId
            };
            const response = await axios.post(storeService.host + '/api/v1/c2e-listings', postData, {
                headers: {
                    'x-api-key': apiKey
                }
            });

            console.log("******* LISTED CEE *******");
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { ListCeeService }