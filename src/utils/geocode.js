const request = require('postman-request')
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibXRob21hczExMTE4NSIsImEiOiJja2VmeHI1OTgwOHFsMnVvN2xjbTR1bzZiIn0.Ku0pGGS4OX6DiEDo5IE3aQ&limit=1`
    request({ url, json: true}, (error, { body } = {}) => {
        if(error){
            callback('Unable to connect to location services')
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another search.')
        } else {
            const [latitude, longitude] = body.features[0].center
            const placename = body.features[0].place_name
            callback(undefined, {
                longitude,
                latitude,
                placename
            })
        }
    
    })
}

module.exports = { geocode }