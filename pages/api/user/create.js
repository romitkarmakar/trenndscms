const argon2 = require("argon2");
var MongoClient = require("mongodb").MongoClient;

export default async (req, res) => {
  try {
    const hash = await argon2.hash(req.body.password);
    req.body.password = hash;
    MongoClient.connect(process.env.MONGODB_URL, function(err, db) {
      if (err) throw err;
      var dbo = db.db("trenndscms");
      dbo.collection("accounts").insertOne(req.body, function(err, response) {
        if (err) throw err;
        db.close();
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("Account Created Successfully");
      });
    });
  } catch (err) {
    console.log(err);
  }
};
