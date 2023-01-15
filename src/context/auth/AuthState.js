import AuthContext from './AuthContext';
import React, { useState } from 'react'
import client from '../../axios/Client';

const AuthState = (props) => {
    const [LoggedIn, setLoggedIn] = useState(false)
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
            }
            return res.data;
        }).catch((err) => {
            // console.log("i am in catch", err.response.data)
            return err.response.data;
        }))
    }
    const createUser = async (name, email, password, age) => {
        return await (client.post('/auth/createuser', {
            name: name,
            email: email,
            password: password,
            age: age
        }, { headers }).then((res) => {
            // console.log("data", res.data);
            if (res.data.success) {
                localStorage.setItem("token", JSON.stringify(res.data.token));
            }
            return res.data;
        }).catch((err) => {
            console.log("i am in catch", err.response.data)
            return err.response.data;
        }))
    }
    return (
        <AuthContext.Provider value={{ LoggedIn, setLoggedIn, validateLogin, createUser }}>
            {props.children}
        </AuthContext.Provider >
    )
}

export default AuthState