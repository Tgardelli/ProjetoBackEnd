// index.js
const readline = require('readline');
const Database = require('./database');
const Website = require('./website');
const User = require('./user');

const isTestMode = process.env.NODE_ENV === 'test';
const CONNECTION_STRING = 'mongodb://localhost:27017';
const DB_NAME = isTestMode ? 'google_pirata_db_test' : 'google_pirata_db';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  const db = new Database(CONNECTION_STRING, DB_NAME);
  await db.connect();
  
  console.log('Connected to database');
  console.log(`Mode: ${isTestMode ? 'TEST' : 'PRODUCTION'}`);
  
  while (true) {
    console.log('\n===== Main Menu =====');
    console.log('1. Add Website');
    console.log('2. Search Websites');
    console.log('3. Delete Website');
    console.log('4. Exit');
    
    const choice = await ask('Choose option: ');
    
    switch (choice) {
      case '1':
        await addWebsite(db);
        break;
      case '2':
        await searchWebsites(db);
        break;
      case '3':
        await deleteWebsite(db);
        break;
      case '4':
        console.log('Exiting...');
        await db.disconnect();
        rl.close();
        return;
      default:
        console.log('Invalid choice!');
    }
  }
}

async function addWebsite(db) {
  console.log('\n--- Add Website ---');
  const url = await ask('URL: ');
  const title = await ask('Title: ');
  const description = await ask('Description: ');
  const keywords = await ask('Keywords (comma separated): ');
  
  try {
    const id = await Website.create(db, {
      url,
      title,
      description,
      keywords
    });
    console.log(`Website created with ID: ${id}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

async function searchWebsites(db) {
  console.log('\n--- Search ---');
  const term = await ask('Search term (or url:<URL> for URL search): ');
  
  try {
    // Create guest user with simulated IP
    const userId = await User.createGuest(db, '127.0.0.1');
    
    let results;
    if (term.toLowerCase().startsWith('url:')) {
      const url = term.substring(4).trim();
      results = await Website.findByUrl(db, url);
    } else {
      results = await Website.findByKeyword(db, term);
    }
    
    // Log search with results
    await User.logSearch(db, userId, term, results);
    
    console.log(`\nFound ${results.length} results:`);
    results.forEach((site, i) => {
      console.log(`${i + 1}. ${site.title} (${site.url})`);
      console.log(`   ${site.description || 'No description'}`);
    });
  } catch (error) {
    console.error(`Search error: ${error.message}`);
  }
}

async function deleteWebsite(db) {
  console.log('\n--- Delete Website ---');
  const url = await ask('URL to delete: ');
  
  try {
    await Website.delete(db, url);
    console.log('Website deleted successfully');
  } catch (error) {
    console.error(`Deletion error: ${error.message}`);
  }
}

main().catch(console.error);