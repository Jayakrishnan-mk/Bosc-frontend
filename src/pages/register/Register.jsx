import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './register.css';
import { Avatar, TextField } from '@mui/material';
import { useState } from 'react';
import axios from '../../axiosInstance'
import { useForm } from 'react-hook-form'



function Register() {

    const [image, setImage] = useState(null);
    const [values, setValues] = useState('')
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const generateError = (err) =>
        toast.error(err, {
            position: "bottom-right"
        })

    const generateSuccess = (success) =>
        toast.success(success, {
            position: "bottom-right"
        })



    const handleRegister = async (body) => {
        console.log('LLLLL');
        try {
            console.log(body, 'l');

            const { userName, firstName, lastName, email, password } = body;
            let values = new FormData();

            if (userName && firstName && lastName && email && password) {
                values.append("userName", userName);
                values.append("firstName", firstName);
                values.append("lastName", lastName);
                values.append("email", email);
                values.append("pic", image);
                values.append("password", password);

                const data = await axios.post("/user/register", values, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                console.log('a,,,s,', data);
                generateSuccess(data.message)
                reset({ values })
                navigate('/login')
            }
            else {
                generateError("Something went wrong!")
            }

        } catch (error) {
            console.log(error);
            generateError("Something went wrong !")
        }
    }

    return (

        <div style={{ overflow: "hidden" }}>

            <div className="area" >

                <div className="context">


                    <div className='container'>
                        <h2>Register Account</h2>
                        <form
                            onSubmit={handleSubmit(handleRegister)}
                        >

                            <div>
                                <input
                                    type="file"
                                    name="pic"
                                    placeholder="Add Photo"
                                    accept="image/*"
                                    {...register('pic')}
                                    id="ProfileEditImage"
                                    style={{ display: "none" }}
                                    onChange={(e) => {
                                        setImage(e.target.files[0]);
                                    }}

                                />
                                <label htmlFor="ProfileEditImage" className='proPic'>
                                    <Avatar
                                        src={image ? URL.createObjectURL(image) : "https://www.w3schools.com/howto/img_avatar.png"}
                                        alt="profile"
                                        sx={{ width: "5rem", height: "5rem", cursor: "pointer", mt: "10%", ml: "10%" }}
                                    />
                                </label>
                            </div>

                            <div>
                                <TextField type="text" name="userName"  {...register('userName', {
                                    required: 'This field is required',
                                    minLength: {
                                        value: 4,
                                        message: 'Please enter atleast 4 characters'
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z][a-zA-Z][a-zA-Z ]*$/,
                                        message: 'Please enter a valid name'
                                    }
                                }
                                )}
                                    error={!!errors?.name}
                                    helperText={errors?.name ? errors.name.message : null}
                                    variant='outlined'
                                    sx={{ color: '', mb: 1.2 }}
                                    size='small'
                                    label='Username'
                                    fullWidth

                                />

                            </div>

                            <div>
                                <TextField
                                    type="text"
                                    name="firstName"
                                    label="First name"
                                    {...register('firstName')}
                                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                />
                            </div>

                            <div>
                                <TextField type="text" name="lastName" label="Last name"  {...register('lastName')}
                                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                />
                            </div>

                            <div>
                                <TextField type="email" name="email" label="Email"  {...register('email')}
                                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                />
                            </div>

                            <div>
                                <TextField type="password" name="password" label="Password"  {...register('password')}
                                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                />
                            </div>



                            <button type='submit'>Submit</button>
                            <span>Already have an account? <Link to={'/login'}>Login</Link></span>
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

export default Register