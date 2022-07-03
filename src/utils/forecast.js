const request = require('postman-request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=384e66b13e7984622e02a4d7cc43dc0b&query=${longitude},${latitude}&units=f`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Cannot connect to weather stack.')
        } else if (body.error) {
            callback(`Weather Stack Error: ${body.error.info}`)
        } else {
            const { temperature: temp, precip, feelslike, weather_descriptions } = body.current
            callback(undefined, `${weather_descriptions[0]} It is currently ${temp} degrees out. It feels like ${feelslike}. It There is a ${precip}% chance of rain`)
        }

    })
}


module.exports = { forecast }