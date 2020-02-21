var MongoClient = require("mongodb").MongoClient;

export default (req, res) => {
  const {
    query: { slug }
  } = req;

  MongoClient.connect(process.env.MONGODB_URL, function(err, db) {
    if (err) throw err;
    var dbo = db.db("trenndscms");
    dbo.collection("blogs").findOne({"slug": slug}, function(err, result) {
        if (err) throw err;
        db.close();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            item: result
          })
        );
      });
  });
};
