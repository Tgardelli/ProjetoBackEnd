// website.js
const Database = require('./database');
const Logger = require('./logger');
const Keyword = require('./keyword');
const User = require('./user');
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
        throw new Error('URL and title are required');
      }
      
      // Processa as keywords
      const keywordIds = [];
      if (data.keywords) {
        const keywords = Array.isArray(data.keywords) 
          ? data.keywords 
          : data.keywords.split(',').map(k => k.trim());
        
        for (const kw of keywords) {
          const id = await Keyword.findOrCreate(db, kw);
          keywordIds.push(id);
        }
      }

      // adiciona o titulo como keyword
      const titleId = await Keyword.findOrCreate(db, data.title);
      keywordIds.push(titleId);

      const collection = db.getCollection('websites');
      const websiteData = {
        url: data.url,
        title: data.title,
        description: data.description || '',
        keywords: keywordIds,
        createdAt: new Date()
      };

      const result = await collection.insertOne(websiteData);
      return result.insertedId;
    } catch (error) {
      Logger.logError(error);
      throw new Error('Failed to create website');
    }
  }

  // performa pesquisa por keyword
  static async findByKeyword(db, keyword) {
    try {
      const collection = db.getCollection('websites');
      const keywordCollection = db.getCollection('keywords');
      
      // Encontra keyword por ID
      const kw = await keywordCollection.findOne({ name: keyword });
      if (!kw) return [];
      
      return collection.find({ keywords: kw._id }).toArray();
    } catch (error) {
      Logger.logError(error);
      throw new Error('Search failed');
    }
  }

  // performa pesquisa por url
  static async findByUrl(db, url) {
    try {
      const collection = db.getCollection('websites');
      return collection.find({ url }).toArray();
    } catch (error) {
      Logger.logError(error);
      throw new Error('URL search failed');
    }
  }

  // deleta por url
  static async delete(db, url) {
    try {
      if (!url || typeof url !== 'string' || url.trim() === '') {
        throw new Error('URL is required for deletion');
      }
      
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        throw new Error('URL must start with http:// or https://');
      }
      
      const collection = db.getCollection('websites');
      const website = await collection.findOne({ url });
      
      if (!website) {
        throw new Error('Website not found');
      }
      
      // Deleta website
      const result = await collection.deleteOne({ url });
      
      if (result.deletedCount === 0) {
        throw new Error('Website deletion failed');
      }
      
      // Limpa as keywords
      for (const keywordId of website.keywords) {
        await Keyword.decrementRefCount(db, keywordId);
      }
      
      return true;
    } catch (error) {
      Logger.logError(error);
      throw new Error('Failed to delete website');
    }
  }
}

module.exports = Website;