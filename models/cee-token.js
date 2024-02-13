const { v4: uuidv4 } = require('uuid');
const { randomBytes } = require('crypto');
const { DataTypes } = require("sequelize");
const { sequelize } = require("../src/utils/database");

function generateKey(size = 32, format = 'base64') {
    const buffer = randomBytes(size);
    return buffer.toString(format);
}

const CeeToken = sequelize.define('CeeToken', {
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
});

module.exports = CeeToken;