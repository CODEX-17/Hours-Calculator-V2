import React from 'react'
import style from './SplashScreen.module.css'

const SplashScreen = () => {
  return (
    <div className={style.container}>
        <img src='/logo.gif' alt='app-logo'></img>
        <h2>Hours Calculator</h2>
        <p>Develop by Rumar Pamparo</p>
    </div>
  )
}

export default SplashScreen