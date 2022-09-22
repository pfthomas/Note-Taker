const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const addNote = req.body;
    addNote.id = uuid.v4();
    notes.push(addNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));

    res.json(notes);
})

app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);







//start listen
// app.listen(PORT, function() {
//     console.log("App listening on PORT: " + PORT);
// });
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));