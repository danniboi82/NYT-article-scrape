var express = require("express");
var exhbs = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var request = require("request");
var axios = require("axios");
var cheerio = require("cheerio");

//save express () to app variable to invoke
var app = express();


//Link db schema models to variable 'db'
var db = require("./models"); 

//bodyParser middleware to parse information between modules
app.use(bodyParser.urlencoded({extended: false }));
//use static to store all static code/pages
app.use(express.static("public"));

//Set mongoose to leverage built in JS ES6 promises 
//connect to the mongodb
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/NYT",{
    useMongoClient: true
});

//Get root path "/" and send "HELLO WORLD" to confirm connection
app.get("/", function(req,res){
    res.send("HELLO WORLD");
});


//Set up port and make sure its listening with "WELCOME TO PORT" or throw error 
app.listen(8080, function(err){
    if (err) {
        console.log("YOU EFFED UP");
    }
    console.log("WELCOME TO PORT 8080");
});