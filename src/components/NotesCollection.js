import React, { useContext, useEffect } from 'react'
import context from '../context/notes/NoteContext';
import NotesItem from './NotesItem';

const NotesCollection = () => {
    const notesContext = useContext(context);
    const { notes, fetchNotes } = notesContext;
    useEffect(() => {
        fetchNotes();
    }, [])
    const nonotefound =
        <div className='text-center fs-1  p-3 text-danger'>
            No Notes found!
        </div>
    return (
        <div className="container my-3">
            <h2 className='text-center'>Your Notes</h2>
            <div className="container row">
                {notes.length > 0 ? notes.map((note) => {
                    return <NotesItem key={note._id} id={note._id} title={note.title} description={note.description} />
                }) : nonotefound}
            </div>
        </div>
    )
}

export default NotesCollection
