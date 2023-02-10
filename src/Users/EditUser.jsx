import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {

    let navigateTo = useNavigate();

    const { id } = useParams();

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
        await axios.put(`http://localhost:8080/updateUser/${id}`, user);
        console.log("user is added successfully");
        navigateTo("/");
    };

    useEffect(()=>{
        getSpecificUserData();
    },[])

    const getSpecificUserData = async () => {
      const result = await axios.get(`http://localhost:8080/updateUser/${id}`);
      setUser(result.data);
    }

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 border rounded p-5 mt-4 shadow'>
                        <div className='text-center m-4'><b><u>Edit User</u></b></div>

                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className='mb-4'>
                                <input type={"text"} className='form-control'
                                    name='name' placeholder='Enter Name to Update' value={name}
                                    onChange={(e) => onInputChange(e)} />
                            </div>

                            <div className='mb-4'>
                                <input type={"text"} className='form-control'
                                    name='username' placeholder='Enter UserName to Update' value={username}
                                    onChange={(e) => onInputChange(e)} />
                            </div>

                            <div className='mb-3'>
                                <input type={"email"} className='form-control'
                                    name='email' placeholder='Enter Email-id to Update' value={email}
                                    onChange={(e) => onInputChange(e)} />
                            </div>
                            <button type='submit' className='btn btn-outline-primary mx-3'>Save again</button>
                            <Link type='submit' to={"/"} className='btn btn-outline-danger'>Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

