var MongoClient = require("mongodb").MongoClient;

export default (req, res) => {
  MongoClient.connect(process.env.MONGODB_URL, function(err, db) {
    if (err) throw err;
    var dbo = db.db("trenndscms");
    dbo.collection("blogs").insertOne(req.body, function(err, response) {
      if (err) throw err;
      db.close();
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Blog Created Successfully");
    });
  });
};
