import { Dialect, Sequelize } from 'sequelize';
require('dotenv').config();

export default new Sequelize(process.env.PG_USER_DATABASE, process.env.PG_USERNAME, process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        dialect: process.env.PG_DIALECT as Dialect,
        port: Number(process.env.PG_PORT)
    }
);
