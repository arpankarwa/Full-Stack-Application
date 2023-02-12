import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {

  const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);


  const loadUsers = async () => {

    const result = await axios.get("http://localhost:8080/getAllUsers");
    console.log(result.data);
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/deleteUser/${id}`);
    loadUsers();
  }

  return (
    <>
      <div className='container text-center'>
        <div className='py-2'>
          <table className="table rounded-3 shadow-lg mt-3 align-middle">
            <thead>
              <tr className='h4'>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email-id</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className='fs-5'>
              {
                users.map((user, index) => (
                  <tr>
                    <th scope="row" key={index}>{index + 1}</th>
                    {/* <th scope="row" >{user.id}</th> */}
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <Link className='btn btn-outline-secondary mx-1' to={`/editUser/${user.id}`}>Edit</Link>
                      <Link className='btn btn-outline-danger mx-1' onClick={() => deleteUser(user.id)}>Delete</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
