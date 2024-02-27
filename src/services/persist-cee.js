const models = require("../../models");
class PersistCeeService {
  static async save(req) {
    // try catch with throw error
    try {
        const {CeeMaster, CeeWorkflow, CeeCreator, Media, MediaOwner, MediaRoyalty, CeeMedia} = models;
        // Extract payload from request
        const payload = req.body;

        const creator =  payload.creator;
        // Find CeeCreator model instance by email. If it does not exist, create a new one
        const ceeCreator = await CeeCreator.findOrCreate({
            where: { email: creator.email},
            defaults: {
                name: creator.name,
                email: creator.email,
            }
        });

        // Create a CeeMaster instance with the creator's id
        const ceeMaster = await CeeMaster.create({
            name: payload.name,
            description: payload.description,
            ceeCreatorId: ceeCreator.id
        });
        /*
        const ceeMaster = await CeeMaster.create({
            name: payload.name,
            description: payload.description,
            ceeCreatorId: ceeCreator.id
        });
        */
        console.log('ceeCreator.id>>>>>>>>>>>>>>>>>> ', ceeCreator.id);
        console.log('ceeMaster >>>>>>>>>>>>>>>>>> ', ceeMaster);

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
                ceeMasterId: ceeMaster.id
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
                    mediaId: media.id,
                    licenseUrl: mediaItem.royalty.licenseUrl,
                    licenseType: mediaItem.royalty.licenseType,
                    licenseVersion: mediaItem.royalty.licenseVersion,
                    yearFrom: mediaItem.royalty.yearFrom,
                    yearTo: mediaItem.royalty.yearTo
                });

                // create CeeMedia and associate with media
                await CeeMedia.create({
                    mediaId: media.id,
                    ceeWorkflowId: workflowItem.id
                });
            }
        }

        return ceeMaster;
    } catch (error) {
        throw error;
    }
  }
}

module.exports = { PersistCeeService };