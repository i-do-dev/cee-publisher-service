class ManifestJsonldService {
  static async get(cee, ceeManifestId, c2eSubscription, store, publisher) {
    
    const c2eCreator = {
        "@id": "c2ens:c2e-" + ceeManifestId +"/c2e-creator/id/" + cee.CeeCreator.email,
        "@type": "sdons:Person",
        "name": cee.CeeCreator.name,
        "email": cee.CeeCreator.email
    }

    const c2eLicense = {
        "@id": "c2ens:c2e-" + ceeManifestId +"/c2e-license",
        "@type": "sdons:WebContent",
        "additionalType": c2eSubscription.licenseType,
        "identifier": {
          "@type": "sdons:PropertyValue",
          "propertyID": "c2eSubscriptionId",
          "value": c2eSubscription.id
        },
        "usageInfo": {
          "@type": "sdons:DefinedTermSet",
          "name": "LicenseTerms",
          "hasDefinedTerm": {
            "@type": "sdons:DefinedTerm",
            "name": c2eSubscription.licenseTerms,
            "termCode": c2eSubscription.licenseTerms.split(' ').join('-').toLowerCase()
          }
        },
        "offers": {
          "@type": "sdons:Offer",
          "price": c2eSubscription.amount,
          "priceCurrency": c2eSubscription.currency
        },
        "copyrightNotice": c2eSubscription.copyrightNotice,
        "license": {
            "@type": "sdons:NoteDigitalDocument",
            "text": c2eSubscription.license,
        },
    };
    
    const c2eWorkflow = cee.CeeWorkflows.map(workflowItem => {
        return {
            "@id": "c2ens:c2e-" + ceeManifestId + "/content/id/" + workflowItem.id,
            "@type": "sdons:CreativeWork",
            "learningResourceType": workflowItem.learningResourceType,
            "name": workflowItem.name,
            "url": workflowItem.url,
            "thumbnailUrl": workflowItem.thumbnailUrl,
            "description": workflowItem.description,
            "keywords": workflowItem.keywords,
            "about": workflowItem.subject.split(',').map(subject => {
                return {
                    "@type": "sdons:Thing",
                    "name": subject,
                }
            }),
            "educationalLevel": workflowItem.educationalLevel.split(',').map(level => {
                return {
                    "@type": "sdons:DefinedTermSet",
                    "name": "EducationalLevel",
                    "hasDefinedTerm": {
                      "@type": "sdons:DefinedTerm",
                      "name": level,
                      "termCode": level.split(' ').join('-').toLowerCase()
                    }
                }
            }),
            "c2eMedia": workflowItem.CeeMedia.map(mediaItem => {
                return {
                    "@type": "sdons:MediaObject",
                    "name": mediaItem.Medium.name,
                    "description": mediaItem.Medium.description,
                    "encodingFormat": mediaItem.Medium.encodingFormat,
                    "url": mediaItem.Medium.resource,
                    "identifier": {
                        "@type": "sdons:PropertyValue",
                        "value": mediaItem.Medium.identifier,
                        "propertyID": mediaItem.Medium.identifierType
                    },
                    "copyrightNotice": mediaItem.Medium.MediaRoyalty.copyrightNotice,
                    "license": {
                        "@type": "sdons:NoteDigitalDocument",
                        "text": mediaItem.Medium.MediaRoyalty.license,
                        "url": mediaItem.Medium.MediaRoyalty.licenseUrl,
                        "version": mediaItem.Medium.MediaRoyalty.licenseVersion,
                        "additionalType": mediaItem.Medium.MediaRoyalty.licenseType,
                        "copyrightYear": {
                            "@type": "sdons:QuantitativeValue",
                            "minValue": mediaItem.Medium.MediaRoyalty.yearFrom,
                            "maxValue": mediaItem.Medium.MediaRoyalty.yearTo
                        }
                    },
                    "additionalType":  mediaItem.Medium.MediaRoyalty.type,
                    "usageInfo": {
                        "@type": "sdons:DefinedTermSet",
                        "name": "LicenseTerms",
                        "hasDefinedTerm": {
                          "@type": "sdons:DefinedTerm",
                          "name": mediaItem.Medium.MediaRoyalty.terms,
                          "termCode": mediaItem.Medium.MediaRoyalty.terms.split(' ').join('-').toLowerCase()
                        }
                    },
                    "offers": {
                        "@type": "sdons:Offer",
                        "price": mediaItem.Medium.MediaRoyalty.amount,
                        "priceCurrency": mediaItem.Medium.MediaRoyalty.currency
                    }
                }
            }),
          }
    });

    const ceeJsonld = {
        "@context": {
          "c2ens": "https://c2e.curriki.org/",
          "sdons": "https://schema.org/",
          "c2eCreator": "sdons:creator",
          "c2ePublisher": "sdons:publisher",
          "c2eLicense": "sdons:license",
          "c2eWorkflow": "sdons:hasPart",
          "c2eMedia": "sdons:associatedMedia",
          "c2eAction": "sdons:potentialAction",
          "C2EPlayerExtension": "sdons:PlayAction",
          "C2EStoreService": "sdons:TradeAction",
          "c2eTerm": "c2ens:c2e-terms/",
          "@language": "en"
        },
        "@id": "c2ens:c2e-" + ceeManifestId +"",
        "@type": "sdons:CreativeWork",
        "creativeWorkStatus": c2eSubscription.type,
        "schemaVersion": "1.0",
        "name": cee.name,
        "description": cee.description,
        "c2eCreator": c2eCreator,
        "c2ePublisher": {
          "@id": "c2ens:c2e-" + ceeManifestId +"/c2e-publisher/id/" + publisher.id,
          "@type": "sdons:Organization",
          "name": publisher.name,
          "brand": {
            "@type": "sdons:WebAPI",
            "name": "C2E Publisher Service"
          }
        },
        "c2eLicense": c2eLicense,
        "c2eWorkflow": c2eWorkflow,
        "c2eAction": [
            {
                "@type": "C2EStoreService",
                "target": {
                    "@type": "sdons:EntryPoint",
                        "actionApplication": {
                        "@type": "sdons:WebApplication",
                        "name": store.name,
                        "url": "https://cee-sotre-service.curriki.org",
                        "brand": {
                            "@type": "sdons:WebAPI",
                            "name": "C2E Store Service"
                        }
                    }
                }
            }
        ]
    };

    // log formatted JSON-LD
    //return JSON.stringify(ceeJsonld, null, 2);
    return ceeJsonld;
  }
}

module.exports = { ManifestJsonldService }