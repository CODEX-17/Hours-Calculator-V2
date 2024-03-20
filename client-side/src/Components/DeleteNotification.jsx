import React from 'react'
import './DeleteNotification.css'


const DeleteNotification = ({ deleteHours }) => {
  
  return (
    <div className='container'>
        <div id='cardDelete'>
            <h2>Are you sure you want to delete?</h2>
            <div className='d-flex gap-2'>
                <button id='yesBtn' onClick={() => deleteHours(true)}>Yes</button>
                <button id='noBtn' onClick={() => deleteHours(false)}>No</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteNotification