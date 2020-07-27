// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const util = require("util")

// //ReadandWrite
// // =============================================================
const writeFileAsync = util.promisify(fs.writeFile);
const notesTemp = util.promisify(fs.readFile);

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

app.get("/api/notes", async function(req, res) {
    //read db.json and return all notes
    try {
        notesData = await notesTemp(path.join(__dirname, "db", "db.json"));

        res.json(JSON.parse(notesData))
    } catch (err) {
        if(err) throw err;
    }

});

app.post("/api/notes", async function(req, res) {
    try {
        // read file and create notes object so we can manipulate
        notesData = await notesTemp(path.join(__dirname, "db", "db.json"));
        
        notesData = JSON.parse(notesData)
        //uses the unique npm package to generate random id 
        req.body.id = uuidv4();

        //push the new note to the note array as an object 
        notesData.push(req.body);

        //turn to string so we can write to file
        await writeFileAsync(path.join(__dirname, "db", "db.json"), JSON.stringify(notesData), function(err) {
            if(err) {
                console.log(err)
            } else {
                console.log("success")
            }
        })

        // console.log(notesData)
        //send object back to website
        res.json(notesData);
    } catch(err) {
       if (err) throw err;
    }
    
});

app.delete("/api/notes/:id", async function (req, res) {
    notesData = fs.readFileSync("./db/db.json", "utf8");

    try {

        notesData = JSON.parse(notesData);

        notesData = await notesData.filter(function (note) {           
            return note.id != req.params.id;
        });

        await writeFileAsync("./db/db.json", JSON.stringify(notesData), "utf8", function (err) {

            res.send(notesData);
        });
    } catch (err) {
        console.log(err);

    }
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  