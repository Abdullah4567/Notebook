import React from 'react'

const NotesItem = (props) => {
    const deleteStyle = {
        fontSize: "x-large",
        color: "crimson",
    }
    const editStyle = {
        fontSize: "x-large",
        color: "green",
    }
    return (
        <div className="col-md-4 my-1">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <hr />
                    <div className="d-flex justify-content-around">
                        <i className="fa-solid fa-trash" style={deleteStyle}></i>
                        <i className="fa-regular fa-pen-to-square" style={editStyle}></i>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NotesItem
