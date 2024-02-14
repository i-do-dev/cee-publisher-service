const {CeeManifest} = require("../../models");
const {Cee} = require("../../models");
const {CeeWorkflow} = require("../../models");
const {CeeCreator} = require("../../models");
const {CeeMedia} = require("../../models");
const {Media} = require("../../models");
const {MediaRoyalty} = require("../../models");
const {ManifestJsonldService} = require("./manifest-jsonld");

class CeeManifestService {
    static async create(req) {
        try {
            const payload = req.body;
            const ceeId = payload.ceeId;
            const previewCeeSubscription = payload.previewCeeSubscription;
            const licensedCeeSubscription = payload.licensedCeeSubscription;
            const client = req.Client;
            /*
            console.log('ceeId +++++++ ', ceeId);
            console.log('previewCeeSubscription +++++++ ', previewCeeSubscription);
            console.log('licensedCeeSubscription +++++++ ', licensedCeeSubscription);
            console.log('client +++++++ ', {email: client.email, role: client.ClientRole});
            */
            // get Cee by ceeId along with its associated models like CeeWorkflow, CeeCreator and CeeMedia

            const cee = await Cee.findByPk(ceeId, {
                include: [
                    {
                        model: CeeCreator
                    },
                    {
                        model: CeeWorkflow,
                        include: [
                            {
                                model: CeeMedia,
                                include: [
                                    {
                                        model: Media,
                                        include: [
                                            {
                                                model: MediaRoyalty
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
            ManifestJsonldService.get(cee, previewCeeSubscription);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { CeeManifestService }