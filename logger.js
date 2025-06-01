// logger.js
const fs = require('fs');
const path = require('path');

class Logger {
  static logError(error) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ERROR: ${error.stack || error}\n`;
    const logPath = path.join(__dirname, 'errors.log');
    
    fs.appendFile(logPath, logMessage, (err) => {
      if (err) console.error('Falha ao escrever no log:', err);
    });
  }
}

module.exports = Logger;