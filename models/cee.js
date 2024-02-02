const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../database');

module.exports = (sequelize, DataTypes) => {
    class Cee extends Model {
        static associate(models) {
            Cee.hasMany(models.CeeWorkflow, { foreignKey: 'ceeId', sourceKey: 'id' });
        }
    }
    
    Cee.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        manifest: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Cee',
        freezeTableName: true,
    });
};

