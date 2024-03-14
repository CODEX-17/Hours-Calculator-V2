import React, { useEffect, useRef, useState } from 'react'
import style from './Homepage.module.css'
import SplashScreen from '../Components/SplashScreen'
import { MdOutlineExitToApp } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Notification from '../Components/Notification';
import stateStores from '../Stores/statesStores';
import {Howl, Howler} from 'howler';
import axios from 'axios';
import idGenerator from '../util/idGenerator';

const Homepage = () => {

   const navigate = useNavigate()
   const { notification, updateNotification, updateMessage, updateGood } = stateStores()
   const [isShowSplashScreen, setShowSplashScreen] = useState(true)
   const [isShowCreateProfile, setShowCreateProfile] = useState(false)
   const [isShowNotification, setShowNotification] = useState(true)
   const [usernameList, setUsernameList] = useState(null)

   const [errorMessage, seterrorMessage] = useState('maximum of 12 character.')

   const [username, setUsername] = useState(null)
   const inputRef = useRef(null)

   const sound = new Howl({
    src: ['/pop.mp3'],
    html5: true,
    volume: 1,
  })

   useEffect(() => {

    axios.get('http://localhost:5000/accounts/getAccounts')
    .then((res) => {
        const data = res.data
        if (res.data) {
            setUsernameList(res.data)
        }
    })
    .catch((err) => console.error(err))

    const splashScreen =  setTimeout(() => {
        setShowSplashScreen(false)
    }, 3000);

    return () => clearTimeout(splashScreen)

   },[])


   const handleSubmitAccount = () => {
        const acct_id = idGenerator()
        const data = {
            acct_id,
            username,
        }
        setUsername([...username], data)
        if (username) {
            axios.post('http://localhost:5000/accounts/addAccounts', data)
            .then((res) => res.data)
            .then((data) => {
                sound.play()
                updateMessage(data.message)
                updateGood(true)
                updateNotification(true)
            })
            .catch((err) => console.error(err))
        }else {
            sound.play()
            updateMessage('Please enter valid username.')
            updateGood(false)
            updateNotification(true)
        }
    
   }

   const generateFirstLetter = (data) => {
        if (data) {
            return data.substring(0, 1)
        }
   }

   const handleSetUsername = (e) => {
        e.preventDefault()
        const data = e.target.value
        
        if (usernameList) {
            for (let i = 0; i < usernameList.length; i++) {
                if (data === usernameList[i].username) {
                    inputRef.current.style.color  = 'red'
                    seterrorMessage('username is already taken.')
                }else {
                    inputRef.current.style.color  = 'black'
                    seterrorMessage('maximum of 12 character.')
                }
            }
            
        }else {
            setUsername(data)
        }
   }

  return (
    <div className={style.container}>
        {
            notification && (
                <div className={style.notification}>
                    <Notification/>
                </div>
            )
        }
        {
            isShowSplashScreen ? <SplashScreen/> :
            <div className={style.profile}>
                {
                    isShowCreateProfile ? (
                        <div className={style.cardCreateProfile}>
                            <div className='d-flex mb-5 align-items-center justify-content-between'>
                                <h2>Create Profile</h2>
                                <MdOutlineExitToApp size={20} cursor={'pointer'} onClick={() => setShowCreateProfile(false)}/>
                            </div>
                            <input type='text' placeholder='Enter username...' maxLength="12" onChange={handleSetUsername}/>
                            <p className='mt-2' ref={inputRef}>{errorMessage}</p>
                            <button onClick={handleSubmitAccount}>Create</button>
                        </div> 
                    ) : (
                        <>
                            <h2>PROFILE</h2>
                            <div className={style.profileList}>
                                {
                                    usernameList &&
                                    usernameList.map((data, index) => (
                                        <div key={index} className='d-flex flex-column gap-2 align-items-center justify-content-center'>
                                            <div className={style.cardProfile} onClick={() => {
                                                localStorage.setItem('user', JSON.stringify(data))
                                                navigate('/mainPage')
                                            }}>{generateFirstLetter(data.username)}</div>
                                            <p>{data.username}</p>
                                        </div>
                                    )) 
                                }
                                
                            </div>
                            
                            <button id={style.btnAddProfile} onClick={() => setShowCreateProfile(true)}>+</button>
                        </>
                    )
                    
                }
            </div>
        }
        
    </div>
  )
}

export default Homepage