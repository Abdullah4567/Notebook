import React, { useEffect, useContext } from 'react'
import NotesLayout from '../layouts/NotesLayout';
import AddNote from './AddNote';
import NotesCollection from './NotesCollection';
import context from '../context/auth/AuthContext';

const Home = () => {
    const { AuthenticateUser } = useContext(context)
    useEffect(() => {
        AuthenticateUser();
        // eslint-disable-next-line
    }, [])

    return (
        <NotesLayout>
            <AddNote />
            <NotesCollection />
        </NotesLayout>
    )
}

export default Home
