import React from 'react'
import NotesLayout from '../layouts/NotesLayout';
import AddNote from './AddNote';
import NotesCollection from './NotesCollection';


const Home = () => {
    return (
        <NotesLayout>
            <AddNote />
            <NotesCollection />
        </NotesLayout>
        // <div className='container my-1'>
        // </div>
    )
}

export default Home
