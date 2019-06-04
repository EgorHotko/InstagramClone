import { Sequelize } from 'sequelize';

export const database = new Sequelize("instagram", "admin", "admin", { 
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
