import AuthContext from './AuthContext';
import React, { useState } from 'react'
import client from '../../axios/Client';

const AuthState = (props) => {
    const [LoggedInUser, setLoggedInUser] = useState({
        valid: false,
        user: null
    })
    const headers = {
        'content-type': 'application/json'
    }
    const validateLogin = async (email, password) => {
        return await (client.post('/auth/login', {
            email: email,
            password: password
        }, { headers }).then((res) => {
            // console.log("data", res.data);
            if (res.data.success) {
                localStorage.setItem("token", JSON.stringify(res.data.token));
                const { name, age, email } = res.data.user
                setLoggedInUser({
                    valid: true,
                    user: {
                        name: name,
                        age: age,
                        email: email,
                        profilePicture: null,
                    }
                })

            }
            // console.log(res.data.user);
            return res.data;
        }).catch((err) => {
            // console.log("i am in catch", err.response.data)
            return err.response.data;
        }))
    }
    const createUser = async (name, email, password, age, picture) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('age', age);
        formData.append('ProfilePic', picture);
        return await (client.post('/auth/createuser', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then((res) => {
            // console.log("data", res.data);
            if (res.data.success) {
                localStorage.setItem("token", JSON.stringify(res.data.token));
                setLoggedInUser({
                    valid: true,
                    user: {
                        name: name,
                        age: age,
                        email: email,
                        profilePicture: picture,
                    }
                })

            }
            return res.data;
        }).catch((err) => {
            console.log(err.response.data)
            return err.response.data;
        }))
    }
    const Logout = () => {
        localStorage.removeItem('token');
        setLoggedInUser({
            valid: false,
            user: null
        })
    }
    return (
        <AuthContext.Provider value={{ LoggedInUser, validateLogin, createUser, Logout }}>
            {props.children}
        </AuthContext.Provider >
    )
}

export default AuthState