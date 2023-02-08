import { Dialect, Sequelize } from 'sequelize';
require('dotenv').config();

const options = {
    host: process.env.PG_HOST,
    dialect: process.env.PG_DIALECT as Dialect,
    port: Number(process.env.PG_PORT)
}

const createConnection = (dbName: string): Sequelize => {
    return new Sequelize(dbName, process.env.PG_USERNAME, process.env.PG_PASSWORD, options)
};

export default {
    userDb: createConnection(process.env.PG_USER_GROUP_DATABASE),
    groupDb: createConnection(process.env.PG_USER_GROUP_DATABASE),
    userGroupDb: createConnection(process.env.PG_USER_GROUP_DATABASE)
}
