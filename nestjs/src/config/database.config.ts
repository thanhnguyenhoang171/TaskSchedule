import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}));
