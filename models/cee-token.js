const { v4: uuidv4 } = require('uuid');
const { randomBytes } = require('crypto');
const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../src/utils/database");

function generateKey(size = 32, format = 'base64') {
    const buffer = randomBytes(size);
    return buffer.toString(format);
}

module.exports = (sequelize, DataTypes) => {
    class CeeToken extends Model {
        static associate(models) {
            CeeToken.belongsTo(models.Cee, { foreignKey: 'ceeId', targetKey: 'id', references: { model: 'Cee', key: 'id' } });
        }
    }
    
    CeeToken.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
            allowNull: false,
            primaryKey: true,
        },
        ceeId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        token: {
            type: DataTypes.UUID,
            defaultValue: () => generateKey(),
            allowNull: false,
            unique: true,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP + INTERVAL '1 HOUR'"),
        },
    },
    {
        sequelize
    });
    return CeeToken;
}