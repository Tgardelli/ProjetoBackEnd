// database.js
const { MongoClient } = require('mongodb');
const Logger = require('./logger');

class Database {
  constructor(connectionString, dbName) {
    this.connectionString = connectionString;
    this.dbName = dbName;
    this.client = null;
    this.db = null;
  }

  async connect() {
    try {
      this.client = new MongoClient(this.connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      console.log('Conectado ao MongoDB');
    } catch (error) {
      Logger.logError(error);
      throw new Error('Falha na conexão com o banco de dados');
    }
  }

  async disconnect() {
    try {
      await this.client.close();
      console.log('Conexão com MongoDB fechada');
    } catch (error) {
      Logger.logError(error);
      throw new Error('Erro ao desconectar do banco de dados');
    }
  }

  getCollection(name) {
    return this.db.collection(name);
  }
}

module.exports = Database;