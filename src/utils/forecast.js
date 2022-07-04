const request = require('postman-request')
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=384e66b13e7984622e02a4d7cc43dc0b&query=${longitude},${latitude}&units=f`
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Cannot connect to weather stack.')
        } else if (body.error) {
            callback(`Weather Stack Error: ${body.error.info}`)
        } else {
            const { temperature: temp, precip, feelslike, weather_descriptions, wind_speed: windSpeed, wind_dir: windDirection, humidity } = body.current
            callback(undefined, `${weather_descriptions[0]} It is currently ${temp} degrees out. It feels like ${feelslike}. It There is a ${precip}% chance of rain. \nWind direction: ${windDirection} at ${windSpeed} mph\n The humidity is ${humidity}%`)
        }

    })
}


module.exports = { forecast }