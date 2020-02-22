var MongoClient = require("mongodb").MongoClient;
var jwt = require("jsonwebtoken");

function isAuthenticated(header) {
  if (header == null) return false;
  var headerArr = header.split(" ");
  if (headerArr[0] != "bearer" && headerArr[0] != "Bearer") return false;
  try {
    var decoded = jwt.verify(headerArr[1], process.env.SECRET_KEY);
    console.log(decoded);
    return true;
  } catch (err) {
    return false;
  }
}

export default (req, res) => {
  if (!isAuthenticated(req.headers.authorization)) {
    res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("Error, Authorization Failed.");
  } else {
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
  }
};
