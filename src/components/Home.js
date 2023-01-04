import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const Home = () => {
    const NoteState = useContext(NoteContext);
    return (
        <div className='container my-1'>
            <h3 className='mx-2'>Add Note</h3>
            <form className='container my-2' action=''>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="text" className="form-control mt-2" id="title" aria-describedby="" placeholder="Enter title" />
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <div className="form mt-2">
                        <textarea className="form-control" placeholder="Enter Description" id="description"></textarea>
                        {/* <label htmlFor="floatingTextarea">Description</label> */}
                    </div>
                </div>
                <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Home
