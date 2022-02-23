import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DailyWeather from './components/DailyWeather';
import TodayHightlights from './components/TodayHightlights';
import TodayWeather from './components/TodayWeather';

let jsonModel = {
  "consolidated_weather": [
    {
      "id": 5826238607261696,
      "weather_state_name": "Heavy Rain",
      "weather_state_abbr": "hr",
      "wind_direction_compass": "WSW",
      "created": "2022-01-08T00:59:01.664546Z",
      "applicable_date": "2022-01-08",
      "min_temp": 1.975,
      "max_temp": 9.440000000000001,
      "the_temp": 9.155000000000001,
      "wind_speed": 9.65697846996474,
      "wind_direction": 253.07388391558442,
      "air_pressure": 997.0,
      "humidity": 91,
      "visibility": 6.489600731726716,
      "predictability": 77
    },
    {
      "id": 6378484327776256,
      "weather_state_name": "Heavy Cloud",
      "weather_state_abbr": "hc",
      "wind_direction_compass": "W",
      "created": "2022-01-08T00:59:01.452723Z",
      "applicable_date": "2022-01-09",
      "min_temp": 2.85,
      "max_temp": 7.095000000000001,
      "the_temp": 6.345,
      "wind_speed": 7.077720601511175,
      "wind_direction": 262.84641721126775,
      "air_pressure": 1001.5,
      "humidity": 77,
      "visibility": 11.803256482144278,
      "predictability": 71
    },
    {
      "id": 4550475916509184,
      "weather_state_name": "Heavy Cloud",
      "weather_state_abbr": "hc",
      "wind_direction_compass": "SW",
      "created": "2022-01-08T00:59:01.841076Z",
      "applicable_date": "2022-01-10",
      "min_temp": 3.255,
      "max_temp": 8.02,
      "the_temp": 7.475,
      "wind_speed": 3.292212662231236,
      "wind_direction": 214.21327092674937,
      "air_pressure": 1019.5,
      "humidity": 84,
      "visibility": 9.959958840372227,
      "predictability": 71
    },
    {
      "id": 4635551970885632,
      "weather_state_name": "Light Rain",
      "weather_state_abbr": "lr",
      "wind_direction_compass": "S",
      "created": "2022-01-08T00:59:01.545241Z",
      "applicable_date": "2022-01-11",
      "min_temp": 5.915,
      "max_temp": 8.675,
      "the_temp": 8.66,
      "wind_speed": 3.6878609253241077,
      "wind_direction": 189.7596205133375,
      "air_pressure": 1031.0,
      "humidity": 87,
      "visibility": 9.36934552215064,
      "predictability": 75
    },
    {
      "id": 6403040534855680,
      "weather_state_name": "Light Cloud",
      "weather_state_abbr": "lc",
      "wind_direction_compass": "NNW",
      "created": "2022-01-08T00:59:01.342874Z",
      "applicable_date": "2022-01-12",
      "min_temp": 2.55,
      "max_temp": 7.32,
      "the_temp": 5.47,
      "wind_speed": 3.0837059572098946,
      "wind_direction": 344.5,
      "air_pressure": 1043.0,
      "humidity": 83,
      "visibility": 9.999726596675416,
      "predictability": 70
    },
    {
      "id": 6601612173770752,
      "weather_state_name": "Light Cloud",
      "weather_state_abbr": "lc",
      "wind_direction_compass": "NNW",
      "created": "2022-01-08T00:59:04.130019Z",
      "applicable_date": "2022-01-13",
      "min_temp": 2.185,
      "max_temp": 7.484999999999999,
      "the_temp": 4.8,
      "wind_speed": 3.832782549908534,
      "wind_direction": 348.5,
      "air_pressure": 1042.0,
      "humidity": 84,
      "visibility": 9.999726596675416,
      "predictability": 70
    }
  ],
  "time": "2022-01-08T03:50:43.180160Z",
  "sun_rise": "2022-01-08T08:04:06.795866Z",
  "sun_set": "2022-01-08T16:10:36.148651Z",
  "timezone_name": "LMT",
  "parent": {
    "title": "England",
    "location_type": "Region / State / Province",
    "woeid": 24554868,
    "latt_long": "52.883560,-1.974060"
  },
  "sources": [
    {
      "title": "BBC",
      "slug": "bbc",
      "url": "http://www.bbc.co.uk/weather/",
      "crawl_rate": 360
    },
    {
      "title": "Forecast.io",
      "slug": "forecast-io",
      "url": "http://forecast.io/",
      "crawl_rate": 480
    },
    {
      "title": "HAMweather",
      "slug": "hamweather",
      "url": "http://www.hamweather.com/",
      "crawl_rate": 360
    },
    {
      "title": "Met Office",
      "slug": "met-office",
      "url": "http://www.metoffice.gov.uk/",
      "crawl_rate": 180
    },
    {
      "title": "OpenWeatherMap",
      "slug": "openweathermap",
      "url": "http://openweathermap.org/",
      "crawl_rate": 360
    },
    {
      "title": "Weather Underground",
      "slug": "wunderground",
      "url": "https://www.wunderground.com/?apiref=fc30dc3cd224e19b",
      "crawl_rate": 720
    },
    {
      "title": "World Weather Online",
      "slug": "world-weather-online",
      "url": "http://www.worldweatheronline.com/",
      "crawl_rate": 360
    }
  ],
  "title": "London",
  "location_type": "City",
  "woeid": 44418,
  "latt_long": "51.506321,-0.12714",
  "timezone": "Europe/London"
}

function App() {
  const [fahrenheit, setFahrenheit] = useState(false)
  const [apiData, setApiData] = useState(jsonModel)
  const [location, setLocation] = useState('468739')

  useEffect(() => {
    axios.get(`http://www.metaweather.com/api/location/${location}`)
    .then(response => {
      setApiData(response.data)
    })
    .catch(e => console.log('ERROR: ', e))
  },[location]);

  return (
    <div className="App">
      <TodayWeather fahrenheit={fahrenheit} apiData={apiData} changeLocation={changeLocation}/>
      <div className='DW-TC'>
        <DailyWeather fahrenheit={fahrenheit} setFahrenheit={setFahrenheit} apiData={apiData}/>
        <TodayHightlights apiData={apiData}/>
      </div>
    </div>
  );

  function changeLocation(newLocation) {
    switch(newLocation) {
      case "London":
        setLocation('44418')
        break;
      case "New York":
        setLocation('2459115')
        break;
      case "Shanghai":
        setLocation('2151849')
        break;
      case "Cairo":
        setLocation('1521894')
        break;
      case "Moscow":
        setLocation('2122265')
        break;
      default:
        setLocation('468739')
    }
  }
}

export default App;