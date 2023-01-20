import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NotesLayout from '../layouts/NotesLayout';
import AddNote from './AddNote';
import NotesCollection from './NotesCollection';

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('/login')
        }
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
