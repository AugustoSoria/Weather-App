import './Components.css';
import { TiCompass } from 'react-icons/ti';
import { IconContext } from 'react-icons';
import {getTodayConditions} from '../utils/functions'

let TodayConditions = ({apiData}) => {
    let today = apiData.consolidated_weather.find(c => getTodayConditions(c.applicable_date, apiData.time) ? c : null)
    
    return (
        <div className="TodayHightlights">
            <h2>Today's Hightlights</h2>
            <div className="grid-container">
                <div>
                    <p>Wind Status</p>
                    <p><span className='number'>{today.wind_speed.toFixed(1)}</span> <span className='unit'>mph</span></p>
                    <IconContext.Provider value={{size: '30px', style: { verticalAlign: 'middle' }}}>
                        <p><TiCompass /> {today.wind_direction_compass}</p>
                    </IconContext.Provider>
                </div>
                <div>
                    <p>Humidity</p>
                    <p><span className='number'>{today.humidity}</span> <span className='unit'>%</span></p>
                    <div className="progressSection">
                        <p><span>0</span> <span>50</span> <span>100</span></p>
                        <progress value={today.humidity} max="100" ></progress>
                        <p className="percent-sign">%</p>
                    </div>
                </div>
                <div>
                    <p>Visibility</p>
                    <p><span className='number'>{today.visibility.toFixed(1)}</span> <span className='unit'>miles</span></p>
                </div>
                <div>
                    <p>Air Pressure</p>
                    <p><span className='number'>{today.air_pressure.toFixed(0)}</span> <span className='unit'>mb</span></p>
                </div>
            </div>
        </div>
    )
}

export default TodayConditions