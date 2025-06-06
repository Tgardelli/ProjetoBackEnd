// website.js
const Logger = require('./logger');
const Keyword = require('./keyword');

class Website {
  // O construtor foi removido pois a classe só possui métodos estáticos
  // e não precisa ser instanciada.

  static async create(db, data) {
    try {
      if (!data.url || !data.title) {
        throw new Error('URL e título são obrigatórios.');
      }

      // Unifica o processamento de keywords.
      // O título é tratado como mais uma palavra-chave.
      let keywords = [];
      if (data.keywords) {
        keywords = Array.isArray(data.keywords)
          ? data.keywords
          : data.keywords.split(',').map(k => k.trim());
      }
      keywords.push(data.title); // Adiciona o título à lista de keywords

      // Utiliza Promise.all para processar as keywords em paralelo,
      // o que pode ser mais eficiente.
      const keywordIds = await Promise.all(
        // Usamos Set para garantir que não haja keywords duplicadas
        [...new Set(keywords)].map(kw => Keyword.findOrCreate(db, kw))
      );

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
      // Mantém o comportamento de lançar o erro para a camada superior.
      throw new Error('Falha ao criar o website.');
    }
  }

  // O restante dos métodos (findByKeyword, findByUrl, delete) permanece inalterado.
  // ...
