// Make CeeCreator model with id, name and email attributes and associate it with Cee model
const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../database');

module.exports = (sequelize, DataTypes) => {
    class CeeCreator extends Model {
        static associate(models) {
            // CeeCreator belongs to Cee
            CeeCreator.belongsTo(models.Cee, { 
                foreignKey: 'ceeId', 
                targetKey: 'id', 
                as: 'Cee',
                references: { model: 'Cee', key: 'id' }
            });
        }
    }
    
    CeeCreator.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ceeId: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'CeeCreator',
        freezeTableName: true,
    });
}