import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify';
import './login.css'
import axios from '../../axiosInstance'

function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate('/home')
        }
    })

    const [values, setValues] = useState("");

    const generateError = (err) =>
    toast.error(err, {
        position: "bottom-right"
    })


    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (values.email === "" || values.password === "") {
                generateError("Please fill all the fields");
                return;
            }
            const { data } = await axios.post("/user/login", values);
            console.log('axios data.....................', data);
            if (data) {
                if (data.error) {
                    generateError("Invalid user id or Password");
                    return;
                }
                else if (data.user && data.created) {
                  
                    localStorage.setItem('user', data.user);
                    localStorage.setItem('token', data.token);
                    navigate("/");
                }
            }
        } catch (error) {
            console.log(error);
            generateError("Something went Wrong!");
        }
    }



  return (
    <div style={{ overflow: "hidden" }}>

      <div className="area" >

        <div className="contextLogin">

          <div className='container'>
            <h2>Login Account</h2>
            <form 
            onSubmit={(e) => handleSubmit(e)}
            >
              
           
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Email" 
                onChange={(e) => {setValues({ ...values, [e.target.name]: e.target.value })}}
                 />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Password" 
                onChange={(e) => {setValues({ ...values, [e.target.name]: e.target.value })}}
                 />
              </div>
              


              <button type='submit'>Submit</button>
              <span>Already have an account? 
                <Link to={'/register'}>Register</Link></span>
            </form>
            <ToastContainer />
          </div>
        </div>


        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div >

    </div>
  )
}

export default Login