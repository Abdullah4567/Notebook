import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NotesLayout from '../layouts/NotesLayout'
const About = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])
    return (
        <NotesLayout>
            This is About
        </NotesLayout>
    )
}

export default About