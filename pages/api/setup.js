var MongoClient = require("mongodb").MongoClient;

export default (req, res) => {
  MongoClient.connect(process.env.MONGODB_URL, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.createCollection("customers", function(err, response) {
      if (err) throw err;
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Collection Created Successfully");
      db.close();
    });
  });
};
