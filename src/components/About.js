import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NotesLayout from '../layouts/NotesLayout'
import AuthContext from '../context/auth/AuthContext';

const About = () => {
    const { LoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        !LoggedIn && navigate('/login')
    }, [])
    return (
        <NotesLayout>
            This is About
        </NotesLayout>
    )
}

export default About