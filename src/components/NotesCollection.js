import React, { useContext } from 'react'
import context from '../context/notes/NoteContext';
import NotesItem from './NotesItem';

const NotesCollection = () => {
    const notesContext = useContext(context);
    const { notes, setnotes } = notesContext;
    return (
        <div className="container my-3">
            <h2 className='text-center'>Your Notes</h2>
            <div className="container row">
                {notes.map((note) => {
                    return <NotesItem title={note.title} description={note.description} />
                })}
            </div>
        </div>
    )
}

export default NotesCollection
