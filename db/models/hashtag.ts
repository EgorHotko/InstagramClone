import { DataTypes } from 'sequelize';
import { database } from '../database';

const Hashtag = database.define("hashtag", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
{timestamps: false});

module.exports = Hashtag;
