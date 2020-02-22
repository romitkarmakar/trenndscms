const argon2 = require("argon2");
var MongoClient = require("mongodb").MongoClient;
var jwt = require("jsonwebtoken");

export default (req, res) => {
  MongoClient.connect(process.env.MONGODB_URL, function(err, db) {
    if (err) throw err;
    var dbo = db.db("trenndscms");
    dbo
      .collection("accounts")
      .findOne({ email: req.body.email }, function(err, result) {
        if (err) throw err;
        db.close();
        argon2
          .verify(result.password, req.body.password)
          .then(response => {
            if (response) {
              var token = jwt.sign(req.body.email, process.env.SECRET_KEY);
              res.statusCode = 200;
              res.setHeader("Content-Type", "text/plain");
              res.end(
                JSON.stringify({
                  token: token
                })
              );
            } else {
              res.statusCode = 200;
              res.setHeader("Content-Type", "text/plain");
              res.end("Password didn't matched");
            }
          })
          .catch(err => {
            console.log("Internal server error");
          });
      });
  });
};
