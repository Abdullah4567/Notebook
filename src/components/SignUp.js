import React, { useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/auth/AuthContext'
import AlertContext from '../context/alert/AlertContext'

const SignUp = () => {
    const { setLoggedIn, createUser } = useContext(AuthContext);
    const { showAlert } = useContext(AlertContext)
    const ref = useRef();
    const navigate = useNavigate();
    const [showPassword, setshowPassword] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        let { name, email, password, age } = e.target;
        name = name.value.trim();
        email = email.value;
        password = password.value.trim();
        age = age.value;
        if (name.length > 0 && password.length > 0) {
            const res = await createUser(name, email, password, age)
            if (res.success) {
                // sign-up Successfull
                // console.log(res.success);
                showAlert("Account Created Successfully", "success");
                setLoggedIn(true);
                navigate('/')
            }
            else {
                // sign-up Unsuccessfull
                showAlert(res.message, "danger");
                setLoggedIn(false);
                // console.log(res.message)
            }
        }
        else {
            showAlert("Name or password should of minimum 3 characters", "danger")
        }
    }
    return (
        <div>
            <section className="">
                <div className="container py-4 h-100">
                    <p className="text-center fs-1 text-info">Welcome to NoteBook</p>
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <form onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <div className='d-flex'>
                                        <div className="">
                                            <input type="text" id="name" className="form-control w-auto" required minLength={3} />
                                            <label className="form-label" htmlFor="name">User Name</label>
                                        </div>
                                        <div className="mx-3">
                                            <input type="number" id="age" className="form-control w-auto" required min={10} max={50} />
                                            <label className="form-label" htmlFor="age">Age </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="email" id="email" className="form-control" required />
                                    <label className="form-label" htmlFor="email">Email address</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" ref={ref} id="password" className="form-control" required minLength={3} />
                                    <label className="form-label" htmlFor="password">Password</label>
                                    {showPassword ? (<i className=" mx-2 fa-regular fa-eye-slash" onClick={() => {
                                        setshowPassword(false)
                                        ref.current.type = "password"
                                    }}></i>) : (<i className=" mx-2 fa-regular fa-eye" onClick={() => {
                                        setshowPassword(true)
                                        ref.current.type = "text"
                                    }}></i>)}
                                </div>
                                {/* <div className="d-flex justify-content-around align-items-center mb-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                                        <label className="form-check-label" htmlhtmlFor="form1Example3"> Remember me </label>
                                    </div>
                                    <a href="#!">Forgot password?</a>
                                </div> */}

                                <button type="submit" className="btn btn-primary btn-block">
                                    Create an Account</button>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                </div>

                                <button className="btn btn-primary mx-1" style={{ "backgroundColor": "#3b5998" }}
                                >
                                    <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
                                </button>
                                <button className=" btn btn-primary" style={{ "backgroundColor": "#55acee" }}
                                    role="button">
                                    <i className="fab fa-twitter me-2"></i>
                                    Continue with Twitter
                                </button>

                            </form>
                        </div>
                    </div>
                </div >
            </section >
        </div >
    )
}

export default SignUp
