const express = require("express")
const app = express()
const path = require("path")

const OUTPUT_DIR = path.resolve(__dirname, "public")

const db = path.join(path.resolve(__dirname, "db"), "db.json")

const PORT = process.env.PORT || 3000

// const PORT = 3000

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) => {
    res.sendFile(path.join(OUTPUT_DIR, "notes.html"))
})

/*
GET /api/notes - Should read the db.json file and return all saved notes as JSON.

POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.

DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
*/
app.get("api/notes", (req, res) => {

    return res.json(db)
})

app.post("api/notes", () => {
    
})
// app.get()

//bonus
// app.edit()

// app.delete()

app.get("*", (req, res) => {
    res.sendFile(path.join(OUTPUT_DIR, "index.html"))
})

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT)
})