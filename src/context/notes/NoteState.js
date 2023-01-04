import NoteContext from './NoteContext';
import React from 'react'

const NoteState = (props) => {
    const state = {
        name: "Ali",
        age: 24
    }
    return (
        <NoteContext.Provider value={state}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState