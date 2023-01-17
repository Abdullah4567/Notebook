import React from 'react'
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