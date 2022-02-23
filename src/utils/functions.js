import clear from '../weatherIcons/clear.svg'
import hail from '../weatherIcons/hail.svg'
import hCloud from '../weatherIcons/heavyCloud.svg'
import hRain from '../weatherIcons/heavyRain.svg'
import lCloud from '../weatherIcons/lightCloud.svg'
import lRain from '../weatherIcons/lightRain.svg'
import sleet from '../weatherIcons/sleet.svg'
import snow from '../weatherIcons/snow.svg'
import thunder from '../weatherIcons/thunder.svg'

export let putIcon = (weather) => {
    switch(weather) {
        case "Snow":
            return snow
        case "Sleet":
            return sleet
        case "Hail":
            return hail
        case "Thunderstorm":
        case "Thunder":
            return thunder
        case "Heavy Rain":
            return hRain
        case "Light Rain":
        case "Showers":
            return lRain
        case "Heavy Cloud":
            return hCloud
        case "Light Cloud":
            return lCloud
        case "Clear":
            return clear
        default:
            return "icon"
    }
}

export let getTodayConditions = (weekDays, currentDay) => {
    let formattedDay = currentDay.split('T')
    let currentDate = new Date(`${formattedDay[0]} 00:00:00`).toLocaleDateString()
    let formatedC = new Date(`${weekDays} 00:00:00`).toLocaleDateString()
    if(formatedC === currentDate) {
        return weekDays
    }
}

export let setScale = (temp, fahrenheit) => {
    let newTemp
    if(fahrenheit) {
        newTemp = `${((temp * (9 / 5)) + 32).toFixed(1)}`
        return newTemp
    }
    return `${temp.toFixed(1)}`
}