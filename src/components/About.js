import React, { useEffect, useContext } from 'react'
import NotesLayout from '../layouts/NotesLayout'
import context from '../context/auth/AuthContext'
const About = () => {
    const { AuthenticateUser } = useContext(context)
    useEffect(() => {
        AuthenticateUser();
        // eslint-disable-next-line
    }, [])
    return (
        <NotesLayout>
            This is About
        </NotesLayout>
    )
}

export default About