class ManifestJsonldService {
  static async get(cee, c2eSubscription) {
    console.log("******* GET MANIFEST JSONLD *******");
    //console.log(await cee.CeeWorkflows);
    // console.log(await cee.CeeWorkflows[0].CeeMedia);
    //console.log(await cee.CeeWorkflows[0].CeeMedia[0].Medium);
    //console.log(await cee.CeeWorkflows[0].CeeMedia[0].Medium.MediaRoyalty);

    const c2eLicense = {
        "@id": "c2ens:c2eid-xxx/c2e-license",
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
            "creditText": c2eSubscription.license,
        },
    };
    
    const c2eWorkflow = cee.CeeWorkflows.map(workflowItem => {
        return {
            "@id": "c2ens:c2eid-12345/content/id/" + workflowItem.id,
            "@type": "sdons:CreativeWork",
            "learningResourceType": "Activity",
            "name": workflowItem.name,
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
                        "creditText": mediaItem.Medium.MediaRoyalty.license,
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
          "c2eTerm": "c2ens:terms/",
          "@language": "en"
        },
        "@id": "c2ens:c2eid-xxx",
        "@type": "sdons:CreativeWork",
        "creativeWorkStatus": "licensed",
        "schemaVersion": "0.2.0",
        "name": cee.name,
        "description": cee.description,
        "keywords": '',
        "c2eCreator": {
          "@id": "c2ens:c2eid-xxx/c2e-creator/id/xxx",
          "@type": "sdons:Person",
          "name": "C2E Creator",
          "email": "c2e-creator@curriki.org",
          "url": "https://curriki.org/author/profile"
        },
        "c2ePublisher": {
          "@id": "c2ens:c2eid-xxx/c2e-publisher/id/xxx",
          "@type": "sdons:Organization",
          "name": "Curriki/CurrikiStudio/Framework",
          "email": "info@curriki.org",
          "url": "https://curriki.org",
          "brand": {
            "@type": "sdons:WebAPI",
            "name": "C2E Publisher Service"
          }
        },
        "c2eLicense": c2eLicense,
        "c2eWorkflow": c2eWorkflow,
        "c2eAction": [
          {
            "@type": "C2EPlayerExtension",
            "target": {
              "@type": "sdons:EntryPoint",
              "actionApplication": {
                "@type": "sdons:WebApplication",
                "name": "C2E Player Extension",
                "url": ""
              }
            }
          },
          {
            "@type": "C2EStoreService",
            "target": {
              "@type": "sdons:EntryPoint",
              "actionApplication": {
                "@type": "sdons:WebApplication",
                "name": "C2E Store Service",
                "url": "https://c2e-sotre-service.curriki.org"
              }
            }
          }
        ]
    };

    // log formatted JSON-LD
    console.log(JSON.stringify(ceeJsonld, null, 2));
  }
}

module.exports = { ManifestJsonldService }