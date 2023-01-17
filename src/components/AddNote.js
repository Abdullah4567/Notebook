import React, { useState, useContext } from 'react'
import useSound from 'use-sound';
import context from '../context/notes/NoteContext';
import AlertContext from '../context/alert/AlertContext';
import addNoteSound from '../assests/addNoteSound.wav'

const AddNote = () => {
    const { addNewNote } = useContext(context);
    const { showAlert } = useContext(AlertContext)
    const [play] = useSound(addNoteSound);
    const [note, setNote] = useState({ title: "", description: "" });
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const handleClick = async (e) => {
        e.preventDefault();
        setNote({
            title: note.title.trim(),
            description: note.description.trim()
        });
        if (note.title.length > 3 && note.description.length > 5) {
            const res = await addNewNote(note);;
            if (res.success) {
                showAlert("Note Added successfully", "success")
                setNote({ title: "", description: "" });

                play();
            }
            else {
                showAlert(res.message, "danger")
            }
        }
        else {
            showAlert("Title or description should be 5 characters lengthy", "danger")
        }
    }
    return (
        <div>
            <h3 className='mx-2 my-2 text-center'>Add Note</h3>
            <form className='container my-2'>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputEmail1">Title</label>
                    <input type="text" className="form-control mt-2" id="title" aria-describedby="" placeholder="Enter title" name="title" onChange={onChange} value={note.title} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <div className="form mt-2">
                        <textarea className="form-control" placeholder="Enter Description" id="description" name="description" onChange={onChange} value={note.description}></textarea>
                    </div>
                </div>
                {/* <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <button type="" disabled={note.title.length < 3 || note.description.length < 5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div >
    )
}

export default AddNote
