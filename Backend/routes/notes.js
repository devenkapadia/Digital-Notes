const express = require('express')
const { body, validationResult } = require('express-validator')
const Notes = require('../models/Note')
const fetchuser = require('../middleware/fetchuser')

const router = express.Router()

// Route 1:  Fetch all notes of user, Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.send(notes)
    } catch (error) {
        res.status(500).json({ "Internal Error": "Some internal error occured" })
        console.log(error.messege);
    }
})

// Route 2: Add notes, Login required
router.post('/addnote', fetchuser, [
    body('title', 'Title must be atleast 3 character').isLength({ min: 3 }),
    body('desc', 'Desccription must ne atleast 5 character').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // // check if same note exists or not
        // const exnote = await Notes.findOne({ title: req.body.title, desc: req.body.desc })
        // if (exnote) {
        //     return res.status(400).json({ "Exists": "Same note already exists" })
        // }
        // Adding new note
        const { title, desc, tag } = req.body;
        const note = new Notes({
            title, desc, tag, user: req.user.id
        });
        const savedNote = await note.save()
        res.json(savedNote)

    } catch (error) {
        res.status(500).json({ "Internal Error": "Some internal error occured" })
        console.log(error.messege);
    }
})

// Route 3:  Update a note, Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, desc, tag } = req.body;

        // create a new note object
        const newNote = {}
        if (title) { newNote.title = title }
        if (desc) { newNote.desc = desc }
        if (tag) { newNote.tag = tag }

        //find a note to be updates
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Not found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.send(note)

    } catch (error) {
        res.status(500).json({ "Internal Error": "Some internal error occured" })
        console.log(error.messege);
    }
})

// Route 4:  Delete a note, Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //find a note to be deleted
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Not found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Successfully deleted a note", note: note })

    } catch (error) {
        res.status(500).json({ "Internal Error": "Some internal error occured" })
        console.log(error.messege);
    }
})

module.exports = router