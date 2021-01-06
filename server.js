// Set up dependencies
var express = require("express");
var fs = require("fs")
var path = require("path")
var PORT = process.env.PORT || 8080;
var app = express();
const dbPath = path.join(__dirname, "db/db.json")

// set up express to handle note data and parse 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(express.static(__dirname + "/public"))
app.use(express.static("./"));


// get requests

// returns homepage
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

// notes page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

// post request
app.get("/api/notes", function (req, res) {
    fs.readFile(dbPath, "utf8", function (err, data) {
        if (err) {
            throw err
        }
        data = JSON.parse(data)
        data = data.map(function (note, index) {
            note.id = index;
            return note;
        })
        res.json(data);
    })
})

app.post("/api/notes", function (req, res) {
    fs.readFile(dbPath, "utf8", function (err, data) {
        if (err) {
            throw err
        }
        data = JSON.parse(data)
        console.log(req.body)
        data.push(req.body)
        fs.writeFile(dbPath, JSON.stringify(data), "utf8", function (err) {
            res.sendStatus(201)
        })
    })
})

// delete request
app.delete("/api/notes/:id", (req, res) => {
    fs.readFile(dbPath, "utf8", function (err, data) {
        if (err) {
            throw err
        }
        data = JSON.parse(data);
        data.splice(req.params.id, 1);
        fs.writeFile(dbPath, JSON.stringify(data), "utf8", function (err) {
            res.sendStatus(200)
        })
    })
})

// wildcard
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

// Listener to start the server
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT)
});