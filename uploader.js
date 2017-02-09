var AWS = require('aws-sdk');
fs = require('fs');

AWS.config.update({
	accessKeyId: "AKIAIT3N2QW2TBQWRUTA",
	secretAccessKey: "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",
	signatureVersion: 'v4'
});


var s3 = new AWS.S3();
var myBucket = 'darwinbucket';
var downloads;
var uploader = {};

uploader.readDir = function(filesArr){
	filesArr = filesArr.filter(function(fileName){
		if(fileName){
			return fileName;
		}
	});
	readFile(filesArr,0);
}

function readFile(arr, index){
	fs.readFile('./downloads/' + arr[index], function (err,data) {
		if (err) {
			return console.log(process.cwd() + " -- "+ arr[index] + err);
		}
		addToBucket(arr[index], data, function(){
			if(index < arr.length - 1){
				readFile(arr, ++index);
			}
		});
	});
}


function addToBucket(key, body, cb){

	var myKey = key;

	params = {Bucket: myBucket, Key: myKey, Body: body};

	s3.putObject(params, function(err, data) {

		if (err) {

			console.log(err)

		} else {
			fs.stat("./downloads/" + key, function(err, stat) {
				if(err == null) {
					fs.unlink("./downloads/" + key);
					console.log("Successfully uploaded data to bucket/" + key);
					cb();
				}
			});
		}
	});
}

module.exports = uploader;