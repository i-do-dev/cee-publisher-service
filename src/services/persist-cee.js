const models = require("../../models");
class PersistCeeService {
  static async save(req) {
    // try catch with throw error
    try {
        // Extract payload from request
        const payload = req.body;
        const {Cee, CeeWorkflow, CeeCreator, Media, MediaOwner, MediaRoyalty, CeeMedia} = models;
        // Create a Cee instance
        const cee = await Cee.create({
            name: payload.name,
            description: payload.description,
        });

        const creator =  payload.creator;
        // Find CeeCreator model instance by email. If it does not exist, create a new one
        await CeeCreator.findOrCreate({
            where: { email: creator.email, ceeId: cee.id},
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
                educationalLevel: item.educationLevel.join(','), // Convert the array to a comma-separated string
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
                });
                
                // create MediaRoyalty and associate with media
                await MediaRoyalty.create({
                    type: mediaItem.royalty.type,
                    terms: mediaItem.royalty.terms,
                    amount: parseFloat(mediaItem.royalty.amount),
                    currency: mediaItem.royalty.currency,
                    copyrightNotice: mediaItem.royalty.copyrightNotice,
                    license: mediaItem.royalty.license,
                    mediaId: media.id
                });

                // create CeeMedia and associate with media
                await CeeMedia.create({
                    mediaId: media.id,
                    ceeWorkflowId: workflowItem.id
                });
            }
        }

        return cee;
    } catch (error) {
        throw error;
    }
  }
}

module.exports = { PersistCeeService };