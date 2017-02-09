'use strict';

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var routes = require('./routes');

var logger = require("morgan");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));


var mongoose = require("mongoose");

var uristring = 'mongodb://localhost:27017/darwin';

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('Connection failed: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});

var db = mongoose.connection;

db.on("error", function (err) {
    console.log("connection err:" + err);
});

db.once("open", function () {
    console.log("db connection was successful");
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use("/darwin", routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("404 not found!!");
    err.status = 404;
    next(err);
});

// Error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Express server is listening on port " + port);
});


