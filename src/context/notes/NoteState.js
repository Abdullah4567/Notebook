import NoteContext from './NoteContext';
import React, { useState } from 'react'

const NoteState = (props) => {
    const initial = [{
        "_id": "63538ab593fe0292045fa3b",
        "userId": "63b5356dd7960e4f20b3bab6",
        "title": "This is first title",
        "description": "This is first description",
        "createdAt": "2023-01-04T08:28:27.321Z",
        "__v": 0
    },
    {
        "_id": "63b5393675fe3a1ec7a3122",
        "userId": "63b5356dd7960e4f20b3bab6",
        "title": "This is second title",
        "description": "This is second description",
        "createdAt": "2023-01-04T08:30:46.044Z",
        "__v": 0
    },
    {
        "_id": "63b539675fe3a1ec7a312b2",
        "userId": "63b5356dd7960e4f20b3bab6",
        "title": "This is third title",
        "description": "This is third description",
        "createdAt": "2023-01-04T08:30:46.044Z",
        "__v": 0
    },
    {
        "_id": "63b5393675fe3a1e7a312b2",
        "userId": "63b5356dd7960e4f20b3bab6",
        "title": "This is 4th title",
        "description": "This is 4th description",
        "createdAt": "2023-01-04T08:30:46.044Z",
        "__v": 0
    },
    {
        "_id": "63b5393675fe3a1ec7a32b2",
        "userId": "63b5356dd7960e4f20b3bab6",
        "title": "This is 5th title",
        "description": "This is 5th description",
        "createdAt": "2023-01-04T08:30:46.044Z",
        "__v": 0
    },
    {
        "_id": "63b539375fe3a1ec7a312b2",
        "userId": "63b5356dd7960e4f20b3bab6",
        "title": "This is 6th title",
        "description": "This is 6th description",
        "createdAt": "2023-01-04T08:30:46.044Z",
        "__v": 0
    },
    {
        "_id": "63b5393675f3a1ec7a312b2",
        "userId": "63b5356dd7960e4f20b3bab6",
        "title": "This is 7th title",
        "description": "This is fir7thst description",
        "createdAt": "2023-01-04T08:30:46.044Z",
        "__v": 0
    },
    {
        "_id": "63b593675fe3a1ec7a312b2",
        "userId": "63b5356dd7960e4f20b3bab6",
        "title": "This is 8th title",
        "description": "This is 8th description",
        "createdAt": "2023-01-04T08:30:46.044Z",
        "__v": 0
    }]
    const [notes, setnotes] = useState(initial)
    const addNewNote = (note) => {
        const newNote = {
            "_id": "3b59675fe3a1ec7a312b2",
            "userId": "63b5356dd7960e4f20b3bab6",
            "title": note.title,
            "description": note.description,
            "createdAt": "2023-01-04T08:30:46.044Z",
            "__v": 0
        }

        setnotes(notes.concat(newNote))
    }
    const deleteNote = (id) => {
        console.log(id);
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setnotes(newNotes)

    }
    const markAsImportant = (id) => {
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        const importantNote = notes.find((note) => {
            return note._id === id
        })
        newNotes.unshift(importantNote);
        setnotes(newNotes);
    }
    const markAsOrdinary = (id) => {
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        const importantNote = notes.find((note) => {
            return note._id === id
        })
        newNotes.push(importantNote);
        setnotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNewNote, deleteNote, markAsImportant, markAsOrdinary }}>
            {props.children}
        </NoteContext.Provider >
    )
}

export default NoteState