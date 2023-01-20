import React, { useState, useContext, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../context/auth/AuthContext'
import AlertContext from '../context/alert/AlertContext'

const SignUp = () => {
    const { createUser } = useContext(AuthContext);
    const { showAlert } = useContext(AlertContext)
    const ref = useRef();
    const navigate = useNavigate();
    const [showPassword, setshowPassword] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        let { name, email, password, age, picture } = e.target;
        name = name.value.trim();
        email = email.value;
        password = password.value.trim();
        age = age.value;
        picture = picture.files[0];
        if (name.length > 0 && password.length > 0) {
            //displaying Loader
            const element = document.getElementById('sign-up').childNodes;
            element[0].classList.remove('d-none')
            element[1].textContent = "Loading...";

            const res = await createUser(name, email, password, age, picture)
            if (res.success) {
                // sign-up Successfull
                // console.log(res.success);
                showAlert("Account Created Successfully", "success");
                navigate('/')
            }
            else {
                // sign-up Unsuccessfull
                showAlert(res.message, "danger");
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
                                className="img-fluid" alt="not found" />
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

                                <div className="form-outline mb-1">
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
                                <div className="d-flex justify-content-start mb-3">
                                    {/* <p className='me-2'>Profile Picture : </p> */}
                                    <input type="file" id="picture" className="" placeholder="Profile" required />
                                </div>

                                <button className="btn btn-primary" type="submit" id='sign-up'>
                                    <span className="spinner-border spinner-border-sm mx-2 d-none"></span>
                                    Create an Account
                                </button>
                                <div className="divider d-flex align-items-center my-2">
                                    <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                </div>

                                <button className="btn btn-primary mx-1" style={{ "backgroundColor": "#3b5998" }}
                                >
                                    <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
                                </button>
                                <button className=" btn btn-primary" style={{ "backgroundColor": "#55acee" }}>
                                    <i className="fab fa-twitter me-2"></i>
                                    Continue with Twitter
                                </button>
                            </form>
                            <div className='p-1 mx-5 my-2 '>Already Have an account  <Link to='/login'>Sign In</Link></div>
                        </div>
                    </div>
                </div >
            </section >
        </div >
    )
}

export default SignUp
