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
        console.log("user is added successfully");
        navigateTo("/");
    };

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 border rounded p-5 mt-4 shadow'>
                        <div className='text-center m-4'><b>Add/Register User</b></div>

                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className='mb-4'>
                                <input type={"text"} className='form-control'
                                    name='name' placeholder='Enter Name' value={name}
                                    onChange={(e) => onInputChange(e)} />
                            </div>

                            <div className='mb-4'>
                                <input type={"text"} className='form-control'
                                    name='username' placeholder='Enter Username' value={username}
                                    onChange={(e) => onInputChange(e)} />
                            </div>

                            <div className='mb-3'>
                                <input type={"email"} className='form-control'
                                    name='email' placeholder='Enter Email-id' value={email}
                                    onChange={(e) => onInputChange(e)} />
                            </div>
                            <button type='submit' className='btn btn-outline-primary mx-3'>Submit</button>
                            <Link type='submit' to={"/"} className='btn btn-outline-danger'>Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
