import { DataTypes } from 'sequelize';
import { database } from '../database';

const Comment = database.define("comment", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
{timestamps: false});

module.exports = Comment;