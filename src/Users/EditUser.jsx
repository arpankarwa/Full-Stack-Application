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
        navigateTo("/");
    };

    useEffect(()=>{
        getSpecificUserData();
    }, []);

    const getSpecificUserData = async () => {
      const result = await axios.get(`http://localhost:8080/updateUser/${id}`);
      setUser(result.data);
    };

    return (
        <>
            <div className='container'>
                <div className='row col-9'>
                    <div className='bg-light col-md-6 offset-md-5 rounded-3 p-5 mt-4 shadow-lg'>
                        <div className='text-center m-4'><b><h3>Edit User</h3></b></div>

                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className='mb-4'>
                                <input type={"text"} className='form-control'
                                    name='name' placeholder='Enter Name to Update' value={name}
                                    onChange={(e) => onInputChange(e)} required={true} />
                            </div>

                            <div className='mb-4'>
                                <input type={"text"} className='form-control'
                                    name='username' placeholder='Enter UserName to Update' value={username}
                                    onChange={(e) => onInputChange(e)} required={true} />
                            </div>

                            <div className='mb-4'>
                                <input type={"email"} className='form-control'
                                    name='email' placeholder='Enter Email-id to Update' value={email}
                                    onChange={(e) => onInputChange(e)} required={true} />
                            </div>

                            <div className='text-center'>
                                <button type='submit' className='btn btn-outline-success mx-4 col-sm-4'>Save again</button>
                                <Link type='submit' to={"/"} className='btn btn-outline-danger ms-2 me-5 col-sm-3'>Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

