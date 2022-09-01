import React from 'react'
import './album.css'
import Navbar from '../../Components/navbar/Navbar'

function Album() {
  return (
    <div>
        <Navbar />

        <h1>Your Albums</h1>
        <div className='albumDiv'>
        </div>
        <div className='albumDiv'>
        </div>
    </div>
  )
}

export default Album