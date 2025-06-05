// keyword.js
const { ObjectId } = require('mongodb');

class Keyword {
  static async findOrCreate(db, keyword) {
    const collection = db.getCollection('keywords');
    let doc = await collection.findOne({ name: keyword });
    
    if (doc) {
      // Incrementa a quantia de referencias usadas
      await collection.updateOne(
        { _id: doc._id },
        { $inc: { refCount: 1 } }
      );
      return doc._id;
    }
    
    // Cria uma nova keyword com referencia usada 1
    const result = await collection.insertOne({ 
      name: keyword,
      refCount: 1,
      createdAt: new Date()
    });
    return result.insertedId;
  }

  // Diminui a referencia caso um website com aquela referencia for deletado
  static async decrementRefCount(db, keywordId) {
    const collection = db.getCollection('keywords');
    const result = await collection.updateOne(
      { _id: keywordId },
      { $inc: { refCount: -1 } }
    );
    
    // Deleta a keyword se a referencia chegar a 0
    if (result.modifiedCount) {
      const keyword = await collection.findOne({ _id: keywordId });
      if (keyword.refCount <= 0) {
        await collection.deleteOne({ _id: keywordId });
      }
    }
  }
}

module.exports = Keyword;