import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const Home = () => {
    const NoteState = useContext(NoteContext);
    return (
        <div>
            This is Home {NoteState.name} and {NoteState.age}
        </div>
    )
}

export default Home
