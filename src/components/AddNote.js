import React, { useState, useContext } from 'react'
import context from '../context/notes/NoteContext';

const AddNote = () => {
    const notesContext = useContext(context);
    const { addNewNote } = notesContext;
    const [note, setNote] = useState({ title: "", description: "" });
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const handleClick = (e) => {
        e.preventDefault();
        addNewNote(note);
    }
    return (
        <div>
            <h3 className='mx-2'>Add Note</h3>
            <form className='container my-2'>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputEmail1">Title</label>
                    <input type="text" className="form-control mt-2" id="title" aria-describedby="" placeholder="Enter title" name="title" onChange={onChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <div className="form mt-2">
                        <textarea className="form-control" placeholder="Enter Description" id="description" name="description" onChange={onChange}></textarea>
                    </div>
                </div>
                {/* <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <button type="" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
