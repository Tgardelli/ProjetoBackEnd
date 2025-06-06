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
  // ... resto do código
