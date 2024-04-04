const mongoose = require('mongoose');
require('dotenv').config();

// **Credenciales y configuración de la base de datos**
const username = process.env.MONGO_DB_USER;
const password = process.env.MONGO_DB_PASSWORD;
const databaseName = process.env.MONGO_DB_NAME;
const mongoURI = `mongodb+srv://${username}:${password}@ambar-api.jlklmmn.mongodb.net/${databaseName}`;

module.exports = {
  url: mongoURI,
};
