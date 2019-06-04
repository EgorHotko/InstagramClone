import { Sequelize } from 'sequelize';
import { Config } from '../config';

export const database = new Sequelize(
    Config.DB.DB_NAME,
    Config.DB.DB_USER,
    Config.DB.DB_PASSWORD, 
    { 
        host: Config.DB.DB_HOST,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);
