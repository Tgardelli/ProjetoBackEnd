// user.js
class User {
    // Cria usuario que performou a pesquisa
    static async createGuest(db, ip) {
        const randomNum = Math.floor(Math.random() * 1000);
        const username = `guest${randomNum}`;
        const collection = db.getCollection('users');
    
    const result = await collection.insertOne({
        username,
        ip,
        searches: [],
        createdAt: new Date()
    });
    
    return result.insertedId;
  }

    // Grava quando uma pesquisa ocorre
    static async logSearch(db, userId, query, results) {
        const collection = db.getCollection('users');
        const topResults = results.slice(0, 5).map(site => ({
        _id: site._id,
        url: site.url,
        title: site.title
        }));
        
        await collection.updateOne(
        { _id: userId },
        { $push: { 
            searches: {
            query,
            results: topResults,
            timestamp: new Date()
            }
        } }
        );
    }
}

module.exports = User;