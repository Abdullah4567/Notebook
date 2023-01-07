import React from 'react'
import AddNote from './AddNote';
import NotesCollection from './NotesCollection';


const Home = () => {
    return (
        <div className='container my-1'>
            <AddNote />
            <NotesCollection />
        </div>
    )
}

export default Home
