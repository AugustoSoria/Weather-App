import './Components.css';
import { useState } from 'react';
import { AiFillEnvironment, AiOutlineAim } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import Modal from './Modal';
import {putIcon, getTodayConditions, setScale} from '../utils/functions'
import Fade from 'react-reveal/Fade';

let TodayWeather = ({fahrenheit, apiData, changeLocation}) => {
    const [openModal, setOpenModal] = useState(false)
    let today = apiData.consolidated_weather.find(c => getTodayConditions(c.applicable_date, apiData.time) ? c : null)

    return (
        <>
            {
                openModal && 
                <Fade>
                    <Modal setOpenModal={setOpenModal} changeLocation={changeLocation}/>
                </Fade>
            }
            <div className="TodayWeather">
                <div className='search-btn'>
                    <button onClick={() => setOpenModal(true)}>Search for places</button>
                    <button className='currentUbication-btn' onClick={() => changeLocation('Buenos Aires')}> 
                        <IconContext.Provider value={{size: '25px', style: { margin: '0 -3px'}}}>
                            <AiOutlineAim/>
                        </IconContext.Provider>
                    </button>
                </div>
                <img 
                    src={putIcon(today.weather_state_name)}
                    alt={today.weather_state_name}>
                </img>
                <h2><span className='number'>{setScale(today.the_temp, fahrenheit)}</span> <span className='unit'> {fahrenheit? '°F' : '°C'} </span></h2>
                <h3 style={{color: '#88869D'}}>{today.weather_state_name}</h3>
                <div className='lightGray'>
                    <p>Today • {formatDate(apiData.time)}</p>
                    <p><AiFillEnvironment/> {apiData.title}</p>
                </div>
            </div>
        </>
    )

    function formatDate(date) {
        // Ej date = 2022-01-08T03:50:43.180160Z
        let sDate = date.split('T') // ['2022-01-08', '03:50:43.180160Z']
        let today = new Date(`${sDate[0]} 00:00:00`).toDateString() //Sat Jan 08 2022
        let sToday = today.split(' ') //[ 'Sat', 'Jan', '08', '2022' ]
        return `${sToday[0]}, ${sToday[2]} ${sToday[1]}` // Sat, 08 Jan
    }
}

export default TodayWeather;