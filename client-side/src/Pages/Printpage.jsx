import React from 'react'
import style from './Printpage.module.css'
import logo from '../assets/Picture1.png'

const Printpage = () => {
  return (
    <div className={style.container}>
        <div className={style.header}>
            <img src={logo} alt="logo" />
        </div>
    </div>
  )
}

export default Printpage