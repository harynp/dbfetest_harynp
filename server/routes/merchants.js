var express = require("express");
var router = express.Router();

const client = require("../database/config");

/* GET LIST MERCHANTS */
router.get("/", (req, res) => {
  client.query(`SELECT * FROM merchants`, (err, result) => {
    if (!err) {
      res.send(result);
    }
  });
});

module.exports = router;
