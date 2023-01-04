import NoteContext from './NoteContext';
import React, { useState } from 'react'

const NoteState = (props) => {
    const initial = [{
        "_id": "63b538ab593fe0292045fa3b",
        "userId": "63b5356dd7960e4f20b3bab6",
        "title": "This is first title",
        "description": "This is first description",
        "createdAt": "2023-01-04T08:28:27.321Z",
        "__v": 0
    },
    {
        "_id": "63b5393675fe3a1ec7a312b2",
        "userId": "63b5356dd7960e4f20b3bab6",
        "title": "This is first title",
        "description": "This is first description",
        "createdAt": "2023-01-04T08:30:46.044Z",
        "__v": 0
    }]
    const [notes, setnotes] = useState(initial)
    return (
        <NoteContext.Provider value={{ notes, setnotes }}>
            {props.children}
        </NoteContext.Provider >
    )
}

export default NoteState