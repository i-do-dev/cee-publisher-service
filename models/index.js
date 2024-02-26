const StoreService = require('./store-service');
const CeeMaster = require('./cee-master');
const CeeCreator = require('./cee-creator');
const CeeWorkflow = require('./cee-workflow');
const Cee = require('./cee');
const CeeMedia = require('./cee-media');
const Media = require('./media');
const MediaOwner = require('./media-owner');
const MediaRoyalty = require('./media-royalty');
const Service = require('./service');
const Client = require('./client');
const ClientRole = require('./client-role');
const ApiKey = require('./api-key');
const CeeToken = require('./cee-token');
const Admins = require('./admins');

// CeeMaster has one CeeCreator
/*
CeeMaster.hasOne(CeeCreator, { 
  foreignKey: 'ceeMasterId', 
  sourceKey: 'id',
  references: { model: 'CeeCreator', key: 'id' }
});
*/


CeeMaster.hasMany(CeeWorkflow, { foreignKey: 'ceeMasterId', sourceKey: 'id' });
CeeMaster.hasMany(Cee, { foreignKey: 'ceeMasterId', sourceKey: 'id' });

// CeeCreator has Many Cee
CeeCreator.hasMany(CeeMaster, { foreignKey: 'ceeCreatorId', sourceKey: 'id' });

// CeeMaster blongs to CeeCreator
CeeMaster.belongsTo(CeeCreator, { foreignKey: 'ceeCreatorId', targetKey: 'id', references: { model: 'CeeCreator', key: 'id' } });

/*
CeeCreator.belongsTo(CeeMaster, { 
  foreignKey: 'ceeMasterId', 
  targetKey: 'id',
  references: { model: 'Cee', key: 'id' }
});
*/


CeeWorkflow.belongsTo(CeeMaster, { foreignKey: 'ceeMasterId', targetKey: 'id', references: { model: 'Cee', key: 'id' } });
CeeWorkflow.hasMany(CeeMedia, { foreignKey: 'ceeWorkflowId', sourceKey: 'id', references: { model: 'CeeMedia', key: 'id' } });



Cee.belongsTo(CeeMaster, { foreignKey: 'ceeMasterId', targetKey: 'id', references: { model: 'Cee', key: 'id' } });
Cee.belongsTo(StoreService, { foreignKey: 'storeId', targetKey: 'id', references: { model: 'StoreService', key: 'id' } });



CeeMedia.belongsTo(CeeWorkflow, { foreignKey: 'ceeWorkflowId', targetKey: 'id', references: { model: 'CeeWorkflow', key: 'id' } });
CeeMedia.belongsTo(Media, { foreignKey: 'mediaId', targetKey: 'id', references: { model: 'Media', key: 'id' } });
 
Media.belongsTo(MediaOwner,{
  foreignKey: 'mediaOwnerId',
  targetKey: 'id',
  references: { model: 'MediaOwner', key: 'id' }
});

Media.hasOne(MediaRoyalty, {
  foreignKey: 'mediaId',
  targetKey: 'id',
  references: { model: 'MediaRoyalty', key: 'id' }
});

Media.hasMany(CeeMedia, {
  foreignKey: 'mediaId',
  sourceKey: 'id',
  references: { model: 'CeeMedia', key: 'id' }
});

MediaOwner.hasMany(Media,{
  foreignKey: 'mediaOwnerId',
  sourceKey: 'id',
  references: { model: 'Media', key: 'id' }
});

MediaRoyalty.belongsTo(Media, {
  foreignKey: 'mediaId',
  targetKey: 'id',
  references: { model: 'Media', key: 'id' }
});



Client.belongsTo(ClientRole, {
    foreignKey: 'clientRoleId',
    targetKey: 'id',
    references: { model: 'ClientRole', key: 'id' }
});

Client.hasMany(ApiKey, {
    foreignKey: 'clientId',
    sourceKey: 'id',
    references: { model: 'ApiKey', key: 'id' }
});


ClientRole.hasMany(Client, {
                foreignKey: 'clientRoleId',
                sourceKey: 'id',
                references: { model: 'Client', key: 'id' }
            });

ApiKey.belongsTo(Client, {
  foreignKey: 'clientId',
  targetKey: 'id',
  references: { model: 'Client', key: 'id' }
});

CeeToken.belongsTo(Cee, { foreignKey: 'ceeId', targetKey: 'id', references: { model: 'Cee', key: 'id' } });

module.exports = {
  StoreService,
  CeeMaster,
  CeeCreator,
  CeeWorkflow,
  Cee,
  CeeMedia,
  Media,
  MediaOwner,
  MediaRoyalty,
  Service,
  Client,
  ClientRole,
  ApiKey,
  CeeToken,
  Admins
};

/* 'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize.authenticate().then(()=>{
  console.log('Connection has been established successfully.');
}).catch (error =>{
  console.error('Unable to connect to the database');
})

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(tableName => {
  if (db[tableName].associate) {
    db[tableName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
 */