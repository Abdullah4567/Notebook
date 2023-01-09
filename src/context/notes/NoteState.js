import NoteContext from './NoteContext';
import React, { useState } from 'react'
import client from '../../axios/Client';

const NoteState = (props) => {
    const initial = []
    const [notes, setnotes] = useState(initial)
    const headers = {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjUzNTZkZDc5NjBlNGYyMGIzYmFiNiIsImlhdCI6MTY3MjgyMDA3OH0.FUp9c1-2KfWv5FrjCg7Xxj5rI8RIInUhf25wkh-Xl9Y'
    }
    const addNewNote = async (note) => {
        return (await client.post('/notes/addnote', {
            title: note.title,
            description: note.description
        }, { headers }).then((res) => {
            // console.log("data", res.data);
            setnotes(notes.concat(res.data.newNote))
            return res.data;
        }).catch((err) => {
            console.log(err.response)
            return err.response.data;
        }))
    }
    const deleteNote = async (id) => {
        console.log(id);
        return (await client.delete(`notes/deletenote/${id}`, { headers }).then((res) => {
            const newNotes = notes.filter((note) => {
                return note._id !== id
            })
            setnotes(newNotes);
            console.log(res.data)
        }).catch((err) => {
            console.log(err.response)
            return err.response.data;
        }))

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
    const fetchNotes = async () => {
        return (await client.get('/notes/allnotes', { headers }).then((res) => {
            // console.log(res.data.notes);
            setnotes(res.data.notes);
            return res.data;
        }).catch((err) => {
            console.log(err.response)
            return err.response.data
        }))
    }
    return (
        <NoteContext.Provider value={{ notes, addNewNote, deleteNote, markAsImportant, markAsOrdinary, fetchNotes }}>
            {props.children}
        </NoteContext.Provider >
    )
}

export default NoteState