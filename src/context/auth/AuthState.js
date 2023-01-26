import AuthContext from './AuthContext';
import React, { useState } from 'react'
import client from '../../axios/Client';
import { useNavigate } from 'react-router-dom';

const AuthState = (props) => {
    const navigate = useNavigate();
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

                const user = {
                    valid: true,
                    token: res.data.token,
                    ...res.data.user,
                }
                localStorage.setItem("user", JSON.stringify(user));
                setLoggedInUser({
                    ...user
                });
            }
            // console.log(res.data.user);
            return res.data;
        }).catch((err) => {
            // console.log("i am in catch", err.response.data)
            return err.response.data;
        }))
    }
    const createUser = async (name, email, password, age, image) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('age', age);
        formData.append('ProfilePic', image);
        return await (client.post('/auth/createuser', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then((res) => {
            // console.log("data", res.data);
            if (res.data.success) {
                const user = {
                    valid: true,
                    token: res.data.token,
                    ...res.data.user,
                }
                localStorage.setItem("user", JSON.stringify(user));
                setLoggedInUser({
                    ...user
                });
                // console.log(LoggedInUser);

            }
            return res.data;
        }).catch((err) => {
            console.log(err.response.data)
            return err.response.data;
        }))
    }
    const Logout = () => {
        localStorage.removeItem('user');
        setLoggedInUser({
            valid: false,
            user: null
        })
        navigate('/login');
    }

    const AuthenticateUser = () => {
        if (localStorage.getItem('user') === null) {
            setLoggedInUser({
                valid: false
            })
            navigate('/login')
        }
        else {
            const user = JSON.parse(localStorage.getItem('user'));
            setLoggedInUser({
                ...user
            })
        }
    }
    const LoginWithGoogle = async (tokenId, accessToken, googleId) => {
        return await (client.post("/auth/login-with-google", {
            tokenId: tokenId,
            accessToken: accessToken,
            googleId: googleId
        }).then((res) => {
            if (res.data.success) {
                const user = {
                    valid: true,
                    token: res.data.token,
                    ...res.data.user,
                }
                localStorage.setItem("user", JSON.stringify(user));
                setLoggedInUser({
                    ...user
                });
            }
            return res.data;
        }).catch((err) => {
            console.log(err.response.data)
            return err.response.data;
        })
        )
    }
    return (
        <AuthContext.Provider value={{ LoggedInUser, setLoggedInUser, validateLogin, createUser, Logout, AuthenticateUser, LoginWithGoogle }}>
            {props.children}
        </AuthContext.Provider >
    )
}

export default AuthState