// website.js
const Database = require('./database');
const Logger = require('./logger');
const { ObjectId } = require('mongodb');

class Website {
  constructor() {
    if (this.constructor === Website) {
      throw new Error('Classe abstrata não pode ser instanciada');
    }
  }

  static async create(db, data) {
    try {
      if (!data.url || !data.title) {
        throw new Error('URL e título são obrigatórios');
      }
      
      const collection = db.getCollection('websites');
      const result = await collection.insertOne(data);
      return result.insertedId;
    } catch (error) {
      Logger.logError(error);
      throw new Error('Falha ao criar website');
    }
  }

  static async findByKeyword(db, keyword) {
    try {
      if (!keyword) {
        throw new Error('Palavra-chave é obrigatória');
      }
      
      const collection = db.getCollection('websites');
      return await collection.find({ keywords: keyword }).toArray();
    } catch (error) {
      Logger.logError(error);
      throw new Error('Falha na busca por palavra-chave');
    }
  }

    static async delete(db, url) {
    try {
      // Verificação de campo obrigatório (mantida)
      if (!url || typeof url !== 'string' || url.trim() === '') {
        throw new Error('URL é obrigatória para deleção');
      }
      
      // Validação adicional de formato de URL (sugestão implementada)
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        throw new Error('URL inválida - deve começar com http:// ou https://');
      }
      
      const collection = db.getCollection('websites');
      const result = await collection.deleteOne({ url: url });
      
      if (result.deletedCount === 0) {
        throw new Error('Website não encontrado com a URL fornecida');
      }
      
      return true;
    } catch (error) {
      Logger.logError(error);
      throw new Error('Falha ao deletar website');
    }
  }
}

module.exports = Website;