import React, { useEffect, useState } from 'react'
import style from './Mainpage.module.css'
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FaArrowsAltH } from "react-icons/fa";
import { FaGripLinesVertical } from "react-icons/fa";
import { MdOutlineExitToApp } from "react-icons/md";
import dayComputation from '../util/dayComputation'
import formatDate from '../util/formatDate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import totalHoursComputation from '../util/totalHoursComputation';
import stateStores from '../Stores/statesStores';
import convertTimeFormat from '../util/convertTimeFormat';


const Mainpage = () => {

  const [isShowAddTime, setisShowAddTime] = useState(false)
  const [isShowEditTime, setisShowEditTime] = useState(false)
  const navigate = useNavigate()
  const { updateNotification, updateMessage, updateGood } = stateStores()
 
  const [date, setDate] = useState(null)
  const [morningTimeStart, setmorningTimeStart] = useState('0:0')
  const [morningTimeEnd, setmorningTimeEnd] = useState('0:0')
  const [afternoonTimeStart, setafternoonTimeStart] = useState('0:0')
  const [afternoonTimeEnd, setafternoonTimeEnd] = useState('0:0')
  const [hoursList, setHoursList] = useState([])

  const [editdate, seteditDate] = useState(null)
  const [editmorningTimeStart, seteditmorningTimeStart] = useState('0:0')
  const [editmorningTimeEnd, seteditmorningTimeEnd] = useState('0:0')
  const [editafternoonTimeStart, seteditafternoonTimeStart] = useState('0:0')
  const [editafternoonTimeEnd, seteditafternoonTimeEnd] = useState('0:0')
  

  const [overAllHours, setOverAllHours] = useState()

  
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {

    const acct_id = user.acct_id
    axios.get('http://localhost:5000/hours/getHoursById/' + acct_id)
    .then((res) => {
        setHoursList(res.data)
    })
    .catch((err) => console.log(err))

  },[])

  useEffect( () => {
    console.log('in')
   generateAllHoursList()
  },[hoursList])

  const handleAddTime = (e) => {
    e.preventDefault()

    setHoursList(
        [...hoursList, {
          date: date,
          morningTimeStart: morningTimeStart,
          morningTimeEnd: morningTimeEnd,
          afternoonTimeStart: afternoonTimeStart,
          afternoonTimeEnd: afternoonTimeEnd
        }]
    )

    const data = {
          acct_id: user.acct_id,
          date,
          morning_start: morningTimeStart,
          morning_end: morningTimeEnd,
          afternoon_start: afternoonTimeStart,
          afternoon_end: afternoonTimeEnd,
    }

    console.log('data', data)

    axios.post('http://localhost:5000/hours/addHours', data)
    .then((res) => res.data)
    .then((data) => {
        const message = data.message
        updateMessage(message)
        updateGood(true)
        updateNotification(true)
        generateAllHoursList()
    })
    .catch((err) => console.log(err))

  }

  const generateAllHoursList = () => {
    let timeList = []

    if (hoursList.length > 0) {
        for (let i = 0; i < hoursList.length; i++) {
            const morningTimeStart = hoursList[i].morning_start
            const morningTimeEnd = hoursList[i].morning_end
            const afternoonTimeStart = hoursList[i].afternoon_start
            const afternoonTimeEnd = hoursList[i].afternoon_end

            if (morningTimeStart, morningTimeEnd, afternoonTimeStart, afternoonTimeEnd) {
                timeList.push(dayComputation(morningTimeStart, morningTimeEnd, afternoonTimeStart, afternoonTimeEnd)) 
            }
        }

        const result = totalHoursComputation(timeList)
        const [hours, minutes] = result.split(':')

        if (parseInt(hours) === 0) {
            return minutes + 'mins'
        }else {
            return hours + 'hrs and ' + minutes + 'mins'
        }
    }else {
        return '0:0'
    }

  }

  const generateTodaysHours = () => {
    const dateNow = new Date()

    console.log(dateNow, date)

    if (date === dateNow) {
        return dayComputation(morningTimeStart, morningTimeEnd, afternoonTimeStart, afternoonTimeEnd)
    }else {
        return '0:0'
    }
    
  }

  const handleEditTime = (index) => {
    if (hoursList) {
        const data = hoursList[index]
        console.log(data)

        seteditDate(data.date)
        seteditmorningTimeStart(data.morning_start)
        seteditmorningTimeEnd(data.morning_end)
        seteditafternoonTimeStart(data.afternoon_start)
        seteditafternoonTimeEnd(data.afternoon_end)
        setisShowEditTime(true)

        
    }
  }

  const handleSubmitEdit = (e) => {
        e.preventDefault()

        
        const data = {
            acct_id: user.acct_id,
            date: editdate,
            morning_start: editmorningTimeStart,
            morning_end: editmorningTimeEnd,
            afternoon_start: editafternoonTimeStart,
            afternoon_end: editafternoonTimeEnd,
        }

        console.log(data)

        axios.post('http://localhost:5000/hours/updateHours', data)
        .then((res) => res.data)
        .then((data) => {
            const message = data.message
            updateMessage(message)
            updateGood(true)
            updateNotification(true)
        })
        .catch((err) => console.log(err))
  }

  return (
    <div className={style.container}>
        <div className={style.left}>
            <div className={style.head}>
                <div className='d-flex gap-2 align-items-center'>
                    <img src='/logo.gif'/>
                    <div>
                        <p style={{ margin: 0 }}>USERNAME</p>
                        <h1>{user.username}</h1>
                    </div>
                    
                </div>
                <div className='d-flex gap-2 align-items-center'>
                    <button onClick={() => setisShowAddTime(true)}>Add +</button>
                    <button onClick={() => navigate('/')}>Back</button>
                </div>
                
            </div>
            <div className={style.body}>
                {
                    isShowAddTime && (
                        <div className={style.addContainer}>
                            <div className={style.cardAdd}>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <h2>ADD TIME</h2>
                                    <MdOutlineExitToApp title='back' size={25} id={style.icon} onClick={() => setisShowAddTime(false)}/>
                                </div>
                                <form onSubmit={handleAddTime}>
                                    <div className={style.calculatedHours}>Calculated Hours : {dayComputation(morningTimeStart, morningTimeEnd, afternoonTimeStart, afternoonTimeEnd)}</div>
                                    <div className='d-flex flex-column'>
                                        <label>DATE</label>
                                        <input type='date' onChange={(e) => setDate(e.target.value)}/>
                                    </div>
                                    <div className='d-flex w-100 gap-5 mt-2 justify-content-between'>
                                        <div className='d-flex flex-column w-50'>
                                            <label>MORNING TIME START</label>
                                            <input type='time'  onChange={(e) => setmorningTimeStart(e.target.value)}/>
                                        </div>
                                        <div className='d-flex flex-column w-50'>
                                            <label>MORNING TIME END</label>
                                            <input type='time' onChange={(e) => setmorningTimeEnd(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className='d-flex mt-2 w-100 gap-5 justify-content-between'>
                                        <div className='d-flex flex-column w-50'>
                                            <label>AFTERNOON TIME START</label>
                                            <input type='time' onChange={(e) => setafternoonTimeStart(e.target.value)}/>
                                        </div>
                                        <div className='d-flex flex-column w-50'>
                                            <label>AFTERNOON TIME END</label>
                                            <input type='time' onChange={(e) => setafternoonTimeEnd(e.target.value)}/>
                                        </div>
                                    </div>

                                    <div className='d-flex mt-5 w-100 gap-5 justify-content-between'>
                                        <button type='submit'>Add</button>
                                    </div>
                                    
                                    
                                </form>
                            </div>
                        </div>
                    )
                }
                {
                    isShowEditTime && (
                        <div className={style.addContainer}>
                            <div className={style.cardAdd}>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <h2>EDIT TIME</h2>
                                    <MdOutlineExitToApp title='back' size={25} id={style.icon} onClick={() => setisShowEditTime(false)}/>
                                </div>
                                <form onSubmit={handleSubmitEdit}>
                                    <div className={style.calculatedHours}>Calculated Hours : {dayComputation(editmorningTimeStart, editmorningTimeEnd, editafternoonTimeStart, editafternoonTimeEnd)}</div>
                                    <div className='d-flex flex-column'>
                                        <label>DATE</label>
                                        <input type='date' value={editdate.slice(0, 10)} onChange={(e) => seteditDate(e.target.value)}/>
                                    </div>
                                    <div className='d-flex w-100 gap-5 mt-2 justify-content-between'>
                                        <div className='d-flex flex-column w-50'>
                                            <label>MORNING TIME START</label>
                                            <input type='time' value={editmorningTimeStart} onChange={(e) => seteditmorningTimeStart(e.target.value)}/>
                                        </div>
                                        <div className='d-flex flex-column w-50'>
                                            <label>MORNING TIME END</label>
                                            <input type='time' value={editmorningTimeEnd} onChange={(e) => seteditmorningTimeEnd(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className='d-flex mt-2 w-100 gap-5 justify-content-between'>
                                        <div className='d-flex flex-column w-50'>
                                            <label>AFTERNOON TIME START</label>
                                            <input type='time' value={editafternoonTimeStart} onChange={(e) => seteditafternoonTimeStart(e.target.value)}/>
                                        </div>
                                        <div className='d-flex flex-column w-50'>
                                            <label>AFTERNOON TIME END</label>
                                            <input type='time' value={editafternoonTimeEnd} onChange={(e) => seteditafternoonTimeEnd(e.target.value)}/>
                                        </div>
                                    </div>

                                    <div className='d-flex mt-5 w-100 gap-5 justify-content-between'>
                                        <button type='submit'>Save</button>
                                    </div>
                                    
                                    
                                </form>
                            </div>
                        </div>
                    )
                }
                {
                    hoursList.length > 0 ? (
                        hoursList.map((data, index) => (
                            <div className={style.card} key={index}>
                                <div className='d-flex flex-column align-items-start' style={{ marginLeft: '20px' }}>
                                    <p>DATE</p>
                                    <h1>{formatDate(data.date)}</h1>
                                </div>
                                <div className='d-flex gap-4 align-items-center'>
                                    <div className='d-flex flex-column align-items-center'>
                                        <p>MORNING START</p>
                                        <h1 id={style.time}>{data.morning_start && convertTimeFormat(data.morning_start)}</h1>
                                    </div>
                                    <FaArrowsAltH/>
                                    <div className='d-flex flex-column align-items-center'>
                                        <p>MORNING END</p>
                                        <h1 id={style.time}>{data.morning_start && convertTimeFormat(data.morning_end)}</h1>
                                    </div>
                                    <FaGripLinesVertical/>
                                    <div className='d-flex flex-column align-items-center'>
                                        <p>AFTERNOON START</p>
                                        <h1 id={style.time}>{data.morning_start && convertTimeFormat(data.afternoon_start)}</h1>
                                    </div>
                                    <FaArrowsAltH/>
                                    <div className='d-flex flex-column align-items-center'>
                                        <p>AFTERNOON END</p>
                                        <h1 id={style.time}>{data.morning_start && convertTimeFormat(data.afternoon_end)}</h1>
                                    </div>
                                </div>
                                <div className='d-flex gap-2 align-items-center' style={{ marginRight: '20px' }}>
                                    <FaRegEdit size={20} cursor={'pointer'} title='edit' onClick={() => handleEditTime(index)}/>
                                    <MdOutlineDelete size={22} cursor={'pointer'} title='delete'/>
                                </div>
                            </div>
                        ))
                    ): (
                        <p>No data.</p>
                    )
                        
                }
                
                
            </div>
        </div>
        <div className={style.right}>
            <div className={style.dashboardStyle}>
                <div className={style.dashHead}>
                    <p>TOTAL HOURS</p>
                    <h1>{generateAllHoursList()}</h1>
                </div>
                <div className={style.dashBody}>
                    <div className='d-flex flex-column align-items-center'>
                        <div className='d-flex flex-column align-items-center'>
                            <p>TODAY'S HOURS</p>
                            <p style={{ fontSize: '8pt' }}>{formatDate(Date.now())}</p>
                        </div>
                        <h1>{generateTodaysHours()}</h1>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <p>TOTAL WEEK HOURS</p>
                        <h1>100hrs</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Mainpage