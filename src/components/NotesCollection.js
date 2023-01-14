import React, { useContext, useEffect, useState, useRef } from 'react'
import context from '../context/notes/NoteContext';
import Modal from './Modal';
import NotesItem from './NotesItem';

const NotesCollection = () => {
    const notesContext = useContext(context);
    const { notes, fetchNotes, updateNote } = notesContext;
    const ref = useRef();
    const [editNote, seteditNote] = useState({
        id: null,
        title: "",
        description: ""
    })
    useEffect(() => {
        fetchNotes();
        // eslint-disable-next-line
    }, [])
    const handleChange = (e) => {
        seteditNote({ ...editNote, [e.target.name]: e.target.value });
    }
    const edit = (id) => {
        const note = notes.find((note) => {
            return note._id === id;
        })
        seteditNote({
            id: id,
            title: note.title,
            description: note.description
        })
        ref.current.click(); // Opening Modal for edit Note
    }
    const saveEditChanges = async () => {
        await updateNote(editNote);
        fetchNotes();
    }
    const nonotefound =
        <div className='text-center fs-1  p-3 text-danger'>
            No Notes found!
        </div>
    return (
        <div className="container my-3">
            <h2 className='text-center'>Your Notes</h2>
            <div className="container row">
                {notes.length > 0 ? notes.map((note) => {
                    return <NotesItem key={note._id} id={note._id} title={note.title} description={note.description} editNote={edit} />
                }) : nonotefound}
            </div>

            <button type="button" ref={ref} className="btn btn-primary invisible" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            </button>
            <Modal saveChanges={saveEditChanges}>
                <form className='container my-2'>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleInputEmail1">Title</label>
                        <input type="text" className="form-control mt-2" id="title" aria-describedby="" placeholder="Enter title" name="title" value={editNote.title} onChange={handleChange} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="description">Description</label>
                        <div className="form mt-2">
                            <textarea className="form-control" placeholder="Enter Description" id="description" name="description" value={editNote.description} onChange={handleChange} ></textarea>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default NotesCollection
