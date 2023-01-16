import React, { useContext } from 'react'
import Context from '../context/notes/NoteContext'
import AlertContext from '../context/alert/AlertContext'
const NotesItem = (props) => {
    const notesContext = useContext(Context)
    const { showAlert } = useContext(AlertContext)
    const { deleteNote, markAsImportant, markAsOrdinary } = notesContext;
    const deleteStyle = {
        fontSize: "large",
        color: "crimson",
    }
    const editStyle = {
        fontSize: "large",
        color: "green",
    }
    const displayAlert = (res) => {
        if (res.success) {
            showAlert(`Note Deleted successfully`, "success")
        }
        else {
            showAlert(res.message, "danger")
        }
    }
    return (
        <div className="col-md-3 my-1">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <hr className='m-2' />
                    <div className="d-flex justify-content-around">
                        <i className="fa-solid fa-trash" style={deleteStyle}
                            onClick={async () => {
                                const res = await deleteNote(props.id)
                                displayAlert(res);
                            }}></i>
                        <i className="fa-regular fa-pen-to-square" style={editStyle}
                            onClick={async () => {
                                props.editNote(props.id)
                            }}></i>
                    </div>
                    <div className="d-flex justify-content-around mt-1">
                        <p className="fw-light fs-10 mt-3 ps-1" style={{ marginBottom: "-30px" }}>Mark as important </p>
                        <div className="form-check form-switch  mt-3">
                            <input className="form-check-input" type="checkbox" id="markAsImportant" onClick={(e) => {
                                e.target.checked ? markAsImportant(props.id) : markAsOrdinary(props.id)
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NotesItem
