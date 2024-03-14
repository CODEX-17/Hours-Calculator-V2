import React, { useEffect } from 'react'
import style from './Notification.module.css'
import { IoMdCloseCircle } from "react-icons/io";
import stateStores from '../Stores/statesStores';


const Notification = () => {

  const { updateNotification, updateMessage, updateGood, good, message } = stateStores()
  
  useEffect(() => {
    setTimeout(() => {
        updateNotification(false)
        updateMessage('')
        updateGood(true)
    }, 3000);
  },[])
  
  return (
    <div className={style.container} style={{ backgroundColor: good? '#88AB8E' : '#FF6868'}}>
        <p id={style.message}>{message}</p>
        <IoMdCloseCircle 
            size={15}
            id={style.closed}
            onClick={() => updateNotification(false)}
        />
    </div>
  )
}

export default Notification