import './Components.css';
import {putIcon, setScale} from '../utils/functions'

let DailyWeather = ({fahrenheit, setFahrenheit, apiData}) => {
    let date = new Date()
    let tomorrow = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1} 00:00:00`).toLocaleDateString()

    return (
        <div className='DailyWeather'>
            <div className='btn-scale'>
                <button 
                    onClick={() => setFahrenheit(false)}
                    className={!fahrenheit ? 'active' : null}>°C</button>
                <button 
                    onClick={() => setFahrenheit(true)}
                    className={fahrenheit ? 'active' : null}>°F</button>
            </div>
            <div className='cards'>
                {apiData.consolidated_weather.map((c,i) => {
                    if(i > 0 ) return (
                        <div key={c.id}>
                            <p>{isTomorrow(c.applicable_date)}</p>
                            <p>{c.weather_state_name}</p>
                            <img 
                                src={putIcon(c.weather_state_name)}
                                alt={c.weather_state_name}>
                            </img>
                            <p>
                                {setScale(c.max_temp, fahrenheit)}{fahrenheit? '°F' : '°C'}
                                <span className='minTemp lightGray'> {setScale(c.min_temp, fahrenheit)}</span>
                                <span className='lightGray'>{fahrenheit? '°F' : '°C'}</span>

                            </p>
                        </div>
                    )})}
            </div>
        </div>
    )

    function isTomorrow(day) {
        if(new Date(`${day} 00:00:00`).toLocaleDateString() === tomorrow) {
            return 'Tomorrow'
        }
        return day
    }
}

export default DailyWeather;