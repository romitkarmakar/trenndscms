var MongoClient = require("mongodb").MongoClient;

export default (req, res) => {
  MongoClient.connect(process.env.MONGODB_URL, function(err, db) {
    if (err) throw err;
    var dbo = db.db("trenndscms");
    dbo
      .collection("blogs")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        db.close();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            items: result
          })
        );
      });
  });
};
