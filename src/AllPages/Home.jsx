import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {

  const [users, setUsers] = useState([]);

  const {id} = useParams();

  useEffect(()=>{
    loadUsers();
  }, []);


  const loadUsers = async () => {

      const result = await axios.get("http://localhost:8080/getAllUsers");
      console.log(result.data);
      setUsers(result.data);
  };

  const deleteUser = async (id)=>{
      await axios.delete(`http://localhost:8080/deleteUser/${id}`);
      loadUsers();
  }

  return (
    <>
      <div className='container'>
        <div className='py-3'>
          <table className="table rounded shadow mt-4 align-middle">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">UserName</th>
                <th scope="col">Email-id</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                  users.map((user, index)=>(
                    <tr>
                      <th scope="row" key={index}>{index + 1}</th>
                      {/* <th scope="row" >{user.id}</th> */}
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        {/* <Link className='btn btn-outline-primary mx-2' to={"/showUser"}>Show</Link> */}
                        <Link className='btn btn-outline-secondary mx-2' to={`/editUser/${user.id}`}>Edit</Link>
                        <Link className='btn btn-outline-danger mx-2' onClick={()=>deleteUser(user.id)}  >Delete</Link>
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
