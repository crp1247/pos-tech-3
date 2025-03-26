"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
exports.default = {
    port: 3000,
    dbUri: `mongodb+srv://${dbUser}:${dbPassword}@blog.49aag.mongodb.net/`,
    env: "development",
};
