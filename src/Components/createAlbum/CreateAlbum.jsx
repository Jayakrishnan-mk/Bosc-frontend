import { useState } from "react";
import { motion } from "framer-motion"
import BackdropLanding from "../../Components/backdrop/Backdrop"
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../axiosInstance'
import { useForm } from 'react-hook-form'
import { Grid } from '@mui/material'
import './createAlbum.css'

const dropIn = {
    hidden: {
        y: "-50vh",
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500
        }
    },
    exit: {
        y: "3vh",
        opacity: 0
    }
}

function CreateAlbum({ handleClose }) {
    const { register, handleSubmit } = useForm();
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right"
        })
    const generateSuccess = (success) =>
        toast.success(success, {
            position: "bottom-right"
        })


    const handlePost = async (data) => {
        const { description } = data

        let values = new FormData()
        if (description) {
            values.append('image', image)
            values.append('description', description)

            for (var pair of values.entries()) {
                console.log(pair[0] + ' - ' + pair[1]);
            }
            try {
                console.log("======================");
                const res = await axios.post('/album', values, {
                    headers: {
                        'token': localStorage.getItem("token"),
                        "Content-Type": "multipart/form-data"
                    }
                })
                console.log("res", res)
                generateSuccess("Post Created Successfully")
                handleClose()
            } catch (error) {
                console.log('Error', error)
            }
        } else {
            generateError('Please Write a Description')
        }
    }


    return (
        <BackdropLanding style={Backdropstyle} onClick={handleClose}>
            <motion.div
                // drag
                onClick={(e) => { e.stopPropagation() }}
                className="CreatePost-modal bg-white"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <header className='CreatePost-header'>
                    <Grid container spacing={3} >
                        <Grid item xs={10}>
                            <h2 className="CreatePost-Heading">Create post</h2>
                        </Grid>
                        <Grid item xs={2}>
                            <CloseIcon className="CreatePost-Close-button" onClick={handleClose} />
                        </Grid>
                    </Grid>
                </header>
                <form onSubmit={handleSubmit(handlePost)}>
                    <Grid container spacing={3} >
                        <Grid item xs={12}>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                {...register('postImage')}
                                id="CreatePostImage"
                                style={{ display: 'none' }}
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            <label className="CreatePost-Image-Label" htmlFor="CreatePostImage">
                                {
                                    image ?
                                        <img src={URL.createObjectURL(image)} alt="postImage" className="CreatePost-Image" />
                                        :
                                        <img className="CreatePost-DefaultImage" src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930" alt="Post" />
                                }
                            </label>
                        </Grid>
                    </Grid>
                    <footer className="CreatePost-Footer">
                        <Grid container spacing={3} >
                            <Grid item xs={9}>
                                <input
                                    type="text"
                                    name="Description"
                                    value={description}
                                    {...register('description')}
                                    placeholder='Write something here...'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={2}>

                                <button className="btn" type="submit">Submit</button>
                            </Grid>

                        </Grid>
                    </footer>
                </form>
            </motion.div>
            <ToastContainer />
        </BackdropLanding>
    )
}

export default CreateAlbum

const Backdropstyle = {
    height: "700px"
}