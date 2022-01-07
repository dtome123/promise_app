var express = require('express');
var router = express.Router();

/* GET home page. */
router
    .get("/", (req, res) => {
        res.render("index", {
            message: "Please enter a message",
            date: "Time will be show"
        });
    })
    .post("/", (req, res) => {
        console.log(req.body)
        res.render("index", {
            message: 11232,
            date: 123
        });
    });

module.exports = router;
