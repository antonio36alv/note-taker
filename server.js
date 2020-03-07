//express
const express = require("express")
const app = express()
//fs
const fs = require("fs")
const util = require("util")
const fileReader = util.promisify(fs.readFile)
const fileWriter = util.promisify(fs.writeFile)
//file/directory paths
const path = require("path")
const OUTPUT_DIR = path.resolve(__dirname, "public")
const DB_DIR = path.resolve(__dirname, "db")
const db = path.join(DB_DIR, "db.json")
//port
const PORT = process.env.PORT || 3000
//UUID
const { uuid } = require("uuidv4");
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//serve public folder as a static asset
app.use(express.static("public"))
//at the request of the notes page serve notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(OUTPUT_DIR, "notes.html"))
})

app.get("/api/notes", async (req, res) => {

    try {
        res.json(JSON.parse(await fileReader(db)))
    } catch (err) {
        if (err) throw err
    }
})

app.post("/api/notes", async (req, res) => {

    const note = req.body
    note.id = uuid()

    try {
        const data = await fileReader(db)
        const pData = JSON.parse(data)
        pData.push(note)

        fileWriter(db, JSON.stringify(pData))
        res.json(JSON.parse(await fileReader(db)))
    } catch (err) {
        if (err) throw err//new Error("Issue adding to JSON")
    }
})


app.delete("/api/notes/:id", async (req, res) => {
    
    const id = req.params.id
    try {
        const data = await fileReader(db)
        const pData = JSON.parse(data)
        for(i = 0; i < pData.length; i++) {
            if(id === pData[i].id) pData.splice(i, 1)
        }
        fileWriter(db, JSON.stringify(pData))
        res.json(JSON.parse(await fileReader(db)))
    } catch(err) {
        if(err) throw err
    }
})

app.get("*", (req, res) => {
    res.sendFile(path.join(OUTPUT_DIR, "index.html"))
})

app.listen(PORT, () => console.log("App listening on PORT " + PORT))