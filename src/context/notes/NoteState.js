import NoteContext from './NoteContext';
import React, { useState } from 'react'
import client from '../../axios/Client';

const NoteState = (props) => {
    const initial = []
    const [notes, setnotes] = useState(initial)
    const headers = {
        'Content-Type': 'application/json',
    }
    const addNewNote = async (note) => {
        headers['auth-token'] = JSON.parse(localStorage.getItem('token'));
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
        headers['auth-token'] = JSON.parse(localStorage.getItem('token'));
        return (await client.delete(`notes/deletenote/${id}`, { headers }).then((res) => {
            const newNotes = notes.filter((note) => {
                return note._id !== id
            })
            setnotes(newNotes);
            // console.log(res.data)
        }).catch((err) => {
            console.log(err.response)
            return err.response.data;
        }))

    }

    const updateNote = async (targetNote) => {
        headers['auth-token'] = JSON.parse(localStorage.getItem('token'));
        return (await client.put(`notes/updatenote/${targetNote.id}`, {
            title: targetNote.title,
            description: targetNote.description
        }, { headers }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err.response)
            return err.response.data;
        }))

    }
    const markAsImportant = (id) => {
        headers['auth-token'] = JSON.parse(localStorage.getItem('token'));
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
        headers['auth-token'] = JSON.parse(localStorage.getItem('token'));
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
        headers['auth-token'] = JSON.parse(localStorage.getItem('token'));
        return (await client.get('/notes/allnotes', {
            headers
        }).then((res) => {
            // console.log(res.data.notes);
            setnotes(res.data.notes);
            return res.data;
        }).catch((err) => {
            console.log(err.response)
            return err.response.data
        }))
    }
    return (
        <NoteContext.Provider value={{ notes, addNewNote, deleteNote, markAsImportant, markAsOrdinary, fetchNotes, updateNote }}>
            {props.children}
        </NoteContext.Provider >
    )
}

export default NoteState