import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AddUser() {

    let navigateTo = useNavigate();
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    });

    const { name, username, email } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/addUser", user);
        navigateTo("/");
    };

    return (
        <>
            <div className='container'>
                <div className='row col-9'>
                    <div className='bg-light col-md-6 offset-md-5 rounded-3 shadow-lg p-5 mt-4'>
                        <div className='text-center m-4'><b><h3>Add/Register User</h3></b></div>

                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className='mb-4'>
                                <input type={"text"} className='form-control'
                                    name='name' placeholder='Enter Name' value={name}
                                    onChange={(e) => onInputChange(e)} required={true} />
                            </div>

                            <div className='mb-4'>
                                <input type={"text"} className='form-control'
                                    name='username' placeholder='Enter Username' value={username}
                                    onChange={(e) => onInputChange(e)} required={true} />
                            </div>

                            <div className='mb-4'>
                                <input type={"email"} className='form-control'
                                    name='email' placeholder='Enter Email-id' value={email}
                                    onChange={(e) => onInputChange(e)} required={true} />
                            </div>

                            <div className='text-center'>
                                <button type='submit' className='btn btn-outline-success mx-4 col-sm-3'>Submit</button>
                                <Link type='submit' to={"/"} className='btn btn-outline-danger ms-2 me-4 col-sm-3'>Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
