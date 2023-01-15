import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NotesLayout from '../layouts/NotesLayout';
import AddNote from './AddNote';
import NotesCollection from './NotesCollection';
import AuthContext from '../context/auth/AuthContext';

const Home = () => {
    const { LoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        !LoggedIn && navigate('/login')
    }, [])

    return (
        <NotesLayout>
            <AddNote />
            <NotesCollection />
        </NotesLayout>
    )
}

export default Home
