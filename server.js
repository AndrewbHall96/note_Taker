var express = require("express");
var path = require("path");

var app = express();
let PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//DATA

var notes = [];

//Routes
// Basic route that sends the user first to the AJAX Page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Displays all notes?
//Return JSON of arrays
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  req.body.id = '_' + Math.random().toString(36).substr(2, 9);
  notes.push(req.body);
  res.sendStatus(201);
});

// Displays a single note, or returns false
app.get("/api/notes/:note", (req, res) => {
  var chosen = req.params.note;

  console.log(chosen);

  for (var i = 0; i < notes.length; i++) {
    if (chosen === notes[i].routeName) {
      return res.json(notes[i]);
    }
  }

  return res.json(false);
});

app.delete("/api/notes/:id", (req, res) => {
  notes = notes.filter(item => item.id != req.params.id);
  res.sendStatus(200);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});