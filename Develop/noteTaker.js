// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================
app.use(express.static(path.join(__dirname, '/public')));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/api/notes", function(req, res) {
    //read db.json and return all notes
    
    fs.readFile(path.join(__dirname, "db", "db.json"), function(err, data) {
        if (err) throw err; 
        res.json(JSON.parse(data)) 
    });
    
});

app.post("/api/notes", function(req, res) {
    // // should receive a new note to save to the request body add to the db.json file
    // //then return the new note to the client

    const newNote = req.body
    console.log(newNote)

    // fs.appendFile(path.join(__dirname, "db", "db.json"), newNote, function(err) {
    //     if(err) {
    //         console.log(err)
    //     } else {
    //         console.log(success)
    //     }
    // })
});

app.delete("/api/notes:id", function(req, res) {
    // should receive a query containing the id of a note to delete
    // need to read file, find matching id, delete the note, rewrite the file

    // create an object from the db.json file, then use delete to select based on title
    // either use the new information and append the file
    // or creat a new object and rewrite the file according to that data
})

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  