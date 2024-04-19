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
import  Notification from '../Components/Notification';
import convertTimeToRead from '../util/convertTimeToRead';
import DeleteNotification from '../Components/DeleteNotification';
import { IoIosPrint } from "react-icons/io";


const Mainpage = () => {

  const [isShowAddTime, setisShowAddTime] = useState(false)
  const [isShowEditTime, setisShowEditTime] = useState(false)
  const [isShowDeleteNotification, setisShowDeleteNotification] = useState(false)
  const navigate = useNavigate()
  const { updateNotification, updateMessage, updateGood, notification, updateSelectedID, selectedID } = stateStores()
  const currentDate = new Date().toISOString().split('T')[0]

  const [date, setDate] = useState(currentDate)
  const [morningTimeStart, setmorningTimeStart] = useState('08:00')
  const [morningTimeEnd, setmorningTimeEnd] = useState('12:00')
  const [afternoonTimeStart, setafternoonTimeStart] = useState('13:00')
  const [afternoonTimeEnd, setafternoonTimeEnd] = useState('17:00')
  const [hoursList, setHoursList] = useState([])

  const [editID, setEditID] = useState(null)
  const [editdate, seteditDate] = useState(null)
  const [editmorningTimeStart, seteditmorningTimeStart] = useState('0:0')
  const [editmorningTimeEnd, seteditmorningTimeEnd] = useState('0:0')
  const [editafternoonTimeStart, seteditafternoonTimeStart] = useState('0:0')
  const [editafternoonTimeEnd, seteditafternoonTimeEnd] = useState('0:0')
  
  const [totalHoursTaken, setTotalHoursTaken] = useState(null)
  const [totalHoursTakenAsString, setTotalHoursTakenAsString] = useState(null)

  
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {

    const acct_id = user.acct_id
    axios.get('http://localhost:5001/hours/getHoursById/' + acct_id)
    .then((res) => {
        setHoursList(res.data)
    })
    .catch((err) => console.log(err))

  },[])

  useEffect( () => {
   generateAllHoursList()
  },[hoursList])


  const deleteHours = (state) => {
   
    if (state) {
        const deleteHoursInAList = (id) => {
            const filter = hoursList.filter((data) => data.id !== id)
            setHoursList(filter)
        }
            if (selectedID) {
                const id = selectedID
                axios.delete('http://localhost:5001/hours/deleteHours/' + id)
                .then((res) => res.data)
                .then((data) => {
                    deleteHoursInAList(id)
                    const message = data.message
                    updateMessage(message)
                    updateGood(true)
                    updateNotification(true)
                    setisShowDeleteNotification(false)
                })
                .catch((err) => console.log(err))
            }  

            
        }


  }

  const handleDeleteHours = (id) => {
    setisShowDeleteNotification(true)
    updateSelectedID(id)
  }

  const handleAddTime = (e) => {
    e.preventDefault()

    const data = {
          acct_id: user.acct_id,
          date,
          morning_start: morningTimeStart,
          morning_end: morningTimeEnd,
          afternoon_start: afternoonTimeStart,
          afternoon_end: afternoonTimeEnd,
    }

    setHoursList([...hoursList, data])

    axios.post('http://localhost:5001/hours/addHours', data)
    .then((res) => res.data)
    .then((data) => {
        const message = data.message
        updateMessage(message)
        updateGood(true)
        updateNotification(true)
        generateAllHoursList()
        setisShowAddTime(false)
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
        if (result) {
            const timeAsStringFormat = generateTimeAsString(result)
            setTotalHoursTakenAsString(timeAsStringFormat)
            setTotalHoursTaken(result)
        }
        

    }else {
        return '0:0'
    }

  }

  const generateTotalAllHoursList = () => {
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
        if (result) {
            const timeAsStringFormat = generateTimeAsString(result)
            return timeAsStringFormat
        }
        
    }else {
        return '0:0'
    }

  }


  const generateTimeAsString = (time) => {
    const [hours, minutes] = time.split(':')
    if (parseInt(hours) === 0) {
        return minutes + 'mins'
    }else {
        return hours + 'hrs and ' + minutes + 'mins'
    }
    
  }

  const generateTodaysHours = () => {
    const dateNow = new Date()
    const formattedDate = dateNow.toISOString().split('T')[0]
   
    if (hoursList) {
        for (let i = 0; i < hoursList.length; i++) {
            if (hoursList[i].date === formattedDate) {
                const morningTimeStart = hoursList[i].morning_start
                const morningTimeEnd = hoursList[i].morning_end
                const afternoonTimeStart = hoursList[i].afternoon_start
                const afternoonTimeEnd = hoursList[i].afternoon_end

                const data = dayComputation(morningTimeStart, morningTimeEnd, afternoonTimeStart, afternoonTimeEnd)
                return convertTimeToRead(data)
            }
        }
    }else {
        return '0:0'
    }
    
  }

  const handleEditTime = (data) => {

    if (data) {
        setEditID(data.id)
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
            id: editID,
            date: editdate,
            morning_start: editmorningTimeStart,
            morning_end: editmorningTimeEnd,
            afternoon_start: editafternoonTimeStart,
            afternoon_end: editafternoonTimeEnd,
        }

        console.log(data)

        const updateDataInVariable = () => {

            let newData = hoursList

            for (let i = 0; i < newData.length; i++) {
               if (newData[i].id === editID) {
                 newData[i].date = editdate
                 newData[i].morning_start = editmorningTimeStart
                 newData[i].morning_end = editmorningTimeEnd
                 newData[i].afternoon_start = editafternoonTimeStart
                 newData[i].afternoon_end = editafternoonTimeEnd
               }
            }

            setHoursList(newData)
        }


        axios.post('http://localhost:5001/hours/updateHours', data)
        .then((res) => res.data)
        .then((data) => {
            updateDataInVariable()
            const message = data.message
            updateMessage(message)
            updateGood(true)
            updateNotification(true)
            setisShowEditTime(false)
        })
        .catch((err) => console.log(err))


  }

 const computeUnfullfilledTime = () => {
    if (totalHoursTaken) {
        const transformValue = parseFloat(totalHoursTaken.replace(/:/g, "."))
        const result = 500 - transformValue
        const roundedValue = Math.round(result * 100) / 100
        const [hours, minutes] = roundedValue.toString().split('.')
        const convertTimeFormat = hours + ':' + minutes
        const formattedAsString = generateTimeAsString(convertTimeFormat)
        return formattedAsString
    }else {
        return '0:0'
    }
 }

 const computeEstimateRemainingDays = () => {

    const computeDays = (hours) => {
        const value = parseInt(hours)
        if (value > 8) {
            return value / 8
        }else {
            return 1
        }
    }

    const convertInToString = (hours) => {
        let value = Math.ceil(hours)
        return value + ' days'
    }

    if (totalHoursTaken) {
        const transformValue = parseFloat(totalHoursTaken.replace(/:/g, "."))
        const remainingHours = 500 - transformValue
        const computedDays = computeDays(remainingHours)
        return convertInToString(computedDays)
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
            isShowDeleteNotification && (
                <div className={style.deleteNotification}>
                    <DeleteNotification deleteHours={deleteHours}/>
                </div>
            )
        }

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
                    <button title='Add Time' onClick={() => setisShowAddTime(true)}>Add +</button>
                    <button title='Print Weekly Report' onClick={() => navigate('/print')}>Print <IoIosPrint/></button>
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
                                        <input type='date' value={date} onChange={(e) => setDate(e.target.value)}/>
                                    </div>
                                    <div className='d-flex w-100 gap-5 mt-2 justify-content-between'>
                                        <div className='d-flex flex-column w-50'>
                                            <label>MORNING TIME START</label>
                                            <input type='time' value={morningTimeStart} onChange={(e) => setmorningTimeStart(e.target.value)}/>
                                        </div>
                                        <div className='d-flex flex-column w-50'>
                                            <label>MORNING TIME END</label>
                                            <input type='time' value={morningTimeEnd} onChange={(e) => setmorningTimeEnd(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className='d-flex mt-2 w-100 gap-5 justify-content-between'>
                                        <div className='d-flex flex-column w-50'>
                                            <label>AFTERNOON TIME START</label>
                                            <input type='time' value={afternoonTimeStart} onChange={(e) => setafternoonTimeStart(e.target.value)}/>
                                        </div>
                                        <div className='d-flex flex-column w-50'>
                                            <label>AFTERNOON TIME END</label>
                                            <input type='time' value={afternoonTimeEnd} onChange={(e) => setafternoonTimeEnd(e.target.value)}/>
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
                <div className={style.listView}>
                    {
                        hoursList.length > 0 ? (
                            hoursList.slice().reverse().map((data, index) => (
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
                                        <FaRegEdit size={20} cursor={'pointer'} title='edit' onClick={() => handleEditTime(data)}/>
                                        <MdOutlineDelete size={22} cursor={'pointer'} title='delete' onClick={() => handleDeleteHours(data.id)}/>
                                    </div>
                                </div>
                            ))
                        ): (
                            <p>No data.</p>
                        )
                            
                    }
                </div>
                
            </div>
        </div>
        <div className={style.right}>
            <div className={style.dashboardStyle}>
                <div className={style.dashHead}>
                    <p>TOTAL HOURS</p>
                    <h1>{generateTotalAllHoursList()}</h1>
                </div>
                <div className={style.dashBody}>
                    <div className='d-flex w-100 align-items-center justify-content-between mb-5'>
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

                    <div className='d-flex flex-column w-100 align-items-center mb-5 gap-5'>
                        <div className='d-flex flex-column align-items-center'>
                            <div className='d-flex flex-column align-items-center'>
                                <p>UNFULLFILL HOURS</p>
                                <h1>{computeUnfullfilledTime()}</h1>
                            </div>
                        </div>
                        <div className='d-flex flex-column align-items-center'>
                            <p>UNFULLFILL DAYS</p>
                            <h1>{computeEstimateRemainingDays()}</h1>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Mainpage