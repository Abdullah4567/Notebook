const express = require('express');
const getUserId = require('../Middlewares/Login');
const { body, validationResult } = require('express-validator');
const Notes = require('../modals/Notes');
const router = express.Router();



// Get all notes via Get request : "/api/notes/allnotes"  login required
router.get('/allnotes', getUserId, async (req, res) => {

    try {
        let notes = await Notes.find({ userId: req.userId.id });
        res.status(200).json({
            success: true,
            notes
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal Server Error");
    }
})

// add note via Post request : "/api/notes/addnote"  login required
router.post('/addnote', getUserId, [
    body('title', 'title should not be empty')?.trim()?.isLength({ min: 3 }),
    body('description', 'description should not be empty')?.trim().isLength({ min: 3 }),
], async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        // console.log(req.userId);
        // creating a new Note 
        let newNote = await Notes.create({
            userId: req.userId.id,
            title: req.body.title,
            description: req.body.description,
            createdAt: Date.now(),
        });
        res.status(200).json({
            success: true,
            newNote
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal Server Error");
    }
})

// update Note via put request : "/api/auth/updatenote/:id"  login required
router.put('/updatenote/:id', [
    body('title', 'title should not be empty')?.trim()?.isLength({ min: 3 }),
    body('description', 'description should not be empty')?.trim().isLength({ min: 3 }),
], getUserId, async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const noteId = req.params.id;
        // finding Note by Id
        let note = await Notes.findById(noteId).select("-password");
        if (note) {
            // Allows if User Owns the Note
            if (note.userId.toString() == req.userId.id) {
                const updatednote = {
                    title: req.body.title ? req.body.title : note.title,
                    description: req.body.description ? req.body.description : note.description,
                }
                note = await Notes.findByIdAndUpdate(noteId, { $set: updatednote });
                res.status(200).json({
                    success: true,
                    // updatednote
                })

            }
            else {
                res.status(400).send("Note not Found")
            }

        }
        else {
            return (
                res.status(400).send("Note not Found")
            )
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal Server Error");
    }
})

// delete note via delete request : "/api/notes/deletenote/:id" login required
router.delete('/deletenote/:id', getUserId, async (req, res) => {

    try {
        const noteId = req.params.id;
        // finding Note by Id
        const note = await Notes.findById(noteId);
        if (note) {
            // Allows if User Owns the Note
            if (note.userId.toString() == req.userId.id) {
                await Notes.findByIdAndDelete(noteId);
                return (res.status(200).json({
                    success: true,
                    message: "Note Deleted"
                }));
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Note not Found"
                })
            }

        }
        else {
            return (
                res.status(400).json({
                    success: false,
                    message: "Note not Found"
                })
            )
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal Server Error");
    }
})
module.exports = router;