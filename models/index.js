const StoreService = require('./store-service');
const Cee = require('./cee');
const CeeCreator = require('./cee-creator');
const CeeWorkflow = require('./cee-workflow');
const CeeManifest = require('./cee-manifest');
const CeeMedia = require('./cee-media');
const Media = require('./media');
const MediaOwner = require('./media-owner');
const MediaRoyalty = require('./media-royalty');

// Cee has one CeeCreator
Cee.hasOne(CeeCreator, { 
  foreignKey: 'ceeId', 
  sourceKey: 'id',
  references: { model: 'CeeCreator', key: 'id' }
});


Cee.hasMany(CeeWorkflow, { foreignKey: 'ceeId', sourceKey: 'id' });
Cee.hasMany(CeeManifest, { foreignKey: 'ceeId', sourceKey: 'id' });


CeeCreator.belongsTo(Cee, { 
  foreignKey: 'ceeId', 
  targetKey: 'id',
  references: { model: 'Cee', key: 'id' }
});



CeeWorkflow.belongsTo(Cee, { foreignKey: 'ceeId', targetKey: 'id', references: { model: 'Cee', key: 'id' } });
CeeWorkflow.hasMany(CeeMedia, { foreignKey: 'ceeWorkflowId', sourceKey: 'id', references: { model: 'CeeMedia', key: 'id' } });



CeeManifest.belongsTo(Cee, { foreignKey: 'ceeId', targetKey: 'id', references: { model: 'Cee', key: 'id' } });
CeeManifest.belongsTo(StoreService, { foreignKey: 'storeId', targetKey: 'id', references: { model: 'StoreService', key: 'id' } });



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

module.exports = {
  StoreService
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

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
 */