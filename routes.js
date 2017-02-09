'use strict';

var express = require("express");
var router = express.Router();
var Query = require("./model").Model.Query;
var uploader = require("./uploader");


router.post("/", function (req, res, next) {
    var exec = require('child_process').exec,
    child;

    res.json({"res": req.body.query});

    var urlEncQuery = encodeURIComponent(req.body.query);

    child = exec("casperjs fetch.js --query='" + urlEncQuery + "'",
    function (error, stdout, stderr) {
        // console.log('stdout: ' + stdout);
        // console.log('stderr: ' + stderr);
        var ouputArr = stdout.split("\n");
        var query = new Query({query:req.body.query, identifier: urlEncQuery.replace(/\W+/g, ""), count: ouputArr.length-1});
        query.save(function(err, query){
        	if(err) console.log(err)
        })

        uploader.readDir(ouputArr);
    });

});

router.get("/queries", function(req, res, next){
	Query.find({})
        .sort({createdAt: -1})
        .exec(function (err, queries) {
            if (err) return next(err);
            res.json(queries);
        });
});


module.exports = router;