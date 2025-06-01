// index.js (exemplo de uso)
const Database = require('./database');
const Website = require('./website');

const CONNECTION_STRING = 'mongodb://localhost:27017';
const DB_NAME = 'google_pirata_db';

async function main() {
  const db = new Database(CONNECTION_STRING, DB_NAME);
  
  try {
    await db.connect();
    
    // Criar website
    const websiteId = await Website.create(db, {
      url: 'https://exemplo.com',
      title: 'Exemplo Site',
      description: 'Site de exemplo para o serviço de busca',
      keywords: ['exemplo', 'teste', 'nodejs']
    });
    console.log('Website criado com ID:', websiteId);
    
    // Buscar por palavra-chave
    const results = await Website.findByKeyword(db, 'nodejs');
    console.log('Resultados da busca:', results);
    
    // Deletar website usando URL
    await Website.delete(db, 'https://exemplo.com');
    console.log('Website deletado com sucesso');
    
  } catch (error) {
    console.error('Erro:', error.message);
  } finally {
    await db.disconnect();
  }
}

main();