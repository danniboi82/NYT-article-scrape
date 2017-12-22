var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");
var bodyParser = require("body-parser");
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
mongoose.connect("mongodb://localhost/NYTscraper",{
    useMongoClient: true
});



//create get route to scrape all of the page's body and store it in db
app.get("/scrape", function(req, res){
    //grab body of html with request
    axios.get("http://www.nytimes.com/section/world").then(function(response){
        var $ = cheerio.load(response.data);

        $("div.story-body").each(function(i, element){
            var result = {};

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
            
            db.Article
            .create(result)
            .then(function(dbArticle){
                console.log("SCRAPED LIFE GOES ON~");
                console.log(dbArticle);
            });
        });
    });
});



//Set up port and make sure its listening with "WELCOME TO PORT" or throw error 
app.listen(8080, function(err){
    if (err) {
        console.log("YOU EFFED UP");
    }
    console.log("WELCOME TO PORT 8080");
});