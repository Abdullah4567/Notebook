import React from 'react'
import Home from '../components/Home'
import Navbar from '../components/Navbar'

const NotesLayout = (props) => {
    return (
        <>
            <Navbar />
            {props.children}
        </>
    )
}

export default NotesLayout