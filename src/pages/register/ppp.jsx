import { useState } from "react";
import noimage from '../../../Assets/Images/Big No Image.png'
import CloseIcon from '@mui/icons-material/Close';
import axios from '../../../axiosInstance'
import { useForm } from 'react-hook-form'
import { Grid } from '@mui/material'
import './CreatePostModal.css'

function CreatePostModal({ handleClose }) {
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
        const user = JSON.parse(localStorage.getItem('user'))
        const { description } = data

        let values = new FormData()
        if (description) {
            values.append('image', image)
            values.append('description', description)
            values.append('createdBy', user._id)

            for (var pair of values.entries()) {
                console.log(pair[0]+ ' - ' + pair[1]); 
            }
            try {
            const res = await axios.post(`api/post/create`, values, {
                headers: {
                    'token': localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log("res", res)
            generateSuccess("Post Created Successfully")
            handleClose()
        } catch (error) {
            console.log('Error',error)
        }
        }else{
            generateError('Please Write a Description')
        }
    }
    return (
            <div>
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
                                            <img className="CreatePost-DefaultImage" src={noimage} alt="Post" />
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
                                <Grid item xs={3}>
                                    <button type='submit' className="CreatePost-send">Send</button>
                                </Grid>
                            </Grid>
                        </footer>
                    </form>
            </div>
    )
}

export default CreatePostModal