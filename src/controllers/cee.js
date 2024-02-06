const { responseHandler } = require("../utils/response");
const models = require("../../models");
const {transaction} = require('sequelize');

class CeeController {
    static async publish(req, res, next) {
        
        const {Cee, CeeWorkflow, CeeCreator, Media, MediaOwner} = models;
        try {
            // Extract payload from request
            const payload = req.body;
        
            // Create a Cee instance
            const cee = await Cee.create({
              name: payload.name,
              description: payload.description,
            });

            const creator =  payload.creator;
            // Find CeeCreator model instance by email. If it does not exist, create a new one
            await CeeCreator.findOrCreate({
                where: { email: creator.email },
                defaults: {
                    name: creator.name,
                    email: creator.email,
                    ceeId: cee.id
                }
            });


            // const storeId =  payload.storeId;
        
            // Create CeeWorkflow instances
            for (const item of payload.workflowItems) {
              const workflowItem = await CeeWorkflow.create({
                name: item.name,
                description: item.description,
                type: item.type,
                subject: item.subject.join(','), // Convert the array to a comma-separated string
                educationLevel: item.educationLevel.join(','), // Convert the array to a comma-separated string
                keywords: item.keywords.join(','), // Convert the array to a comma-separated string
                url: item.url,
                thumbnailUrl: item.thumbnailUrl,
                ceeId: cee.id
              });
        
              
              // Create C2EMedia instances
              for (const mediaItem of item.media) {

                // Find MediaOwner model instance by email. If it does not exist, create a new one.
                const [mediaOwner] = await MediaOwner.findOrCreate({
                    where: { email: mediaItem.owner.email },
                    defaults: {
                        name: mediaItem.owner.name,
                        email: mediaItem.owner.email
                    }
                });
                    

                const media = await Media.create({
                  name: mediaItem.name,
                  description: mediaItem.description,
                  encodingFormat: mediaItem.encodingFormat,
                  reource: mediaItem.resource,
                  identifier: mediaItem.identifier,
                  identifierType: mediaItem.identifierType,
                  parentId: null,
                  mediaOwnerId: mediaOwner.id
                }, { transaction });

                /* 
                const mediaOwner = MediaOwner.create({
                  name: payload.owner.name,
                  email: payload.owner.email,
                }, { transaction });
                // Associate the media with the owner
                await media.addMediaOwner(mediaOwner, { transaction });
                
                // create MediaRoyalty and associate with media
                const mediaRoyalty = await MediaRoyalty.create({
                    type: mediaItem.royalty.type,
                    terms: mediaItem.royalty.terms,
                    amount: mediaItem.royalty.amount,
                    currency: mediaItem.royalty.currency,
                    copyrightNotice: mediaItem.royalty.copyrightNotice,
                    license: mediaItem.royalty.license
                }, { transaction });
                // Associate the media with the royalty
                await media.addMediaRoyalty(mediaRoyalty, { transaction }); */

                // Associate the media with the workflow item
                //await workflowItem.addC2EMedia(media, { transaction });
              }
            }
        
            // Commit the transaction
            //await transaction.commit();
        
            // Send a success response
            return responseHandler({
                response: res,
                result: true,
            });
        } catch (error) {
            // Rollback the transaction if any errors occur
            if (transaction) await transaction.rollback();
        
            // Send an error response
            next(error);
        }
    }
}
module.exports = { CeeController }