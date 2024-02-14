// require uuidv4
const { v4: uuidv4 } = require('uuid');
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CeeManifest extends Model {
        static associate(models) {
            CeeManifest.belongsTo(models.Cee, { foreignKey: 'ceeId', targetKey: 'id', references: { model: 'Cee', key: 'id' } });
            CeeManifest.belongsTo(models.StoreService, { foreignKey: 'storeId', targetKey: 'id', references: { model: 'StoreService', key: 'id' } });
        }
    }
    
    CeeManifest.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
            primaryKey: true,
        },
        ceeId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        manifest: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subscriptionId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        storeId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    },
    {
        sequelize
    });
    return CeeManifest;
};