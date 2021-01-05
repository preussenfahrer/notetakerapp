// Set up dependencies
var express = require("express");
var fs = require("fs")
var path = require("path")
// create express server
var app = express();

// set listening PORT
var PORT = process.env.PORT || 8080;

// set up express to handle note data and parse 
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// need to setup ROUTER to get to note files / db folder


// Listener to start the server
app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT)
});