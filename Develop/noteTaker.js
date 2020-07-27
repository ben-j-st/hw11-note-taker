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

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/api/note", function(req, res) {
    //read db.json and return all notes
    fs.readFile(path.join(__dirname, "db", "db.json"));
  });

  app.get("/api/notes", function(req, res) {
    // should receive a new note to save to the request body add to the db.json file
    //then return the new note to the client
  });

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
    
});

app.use(express.static(path.join(__dirname, '/public')));

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  