import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NotesLayout from '../layouts/NotesLayout'
import AuthContext from '../context/auth/AuthContext';

const About = () => {
    const { setLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('/login')
        }
        else {
            setLoggedIn(true)
        }
    }, [])
    return (
        <NotesLayout>
            This is About
        </NotesLayout>
    )
}

export default About