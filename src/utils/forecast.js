const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=4af81e50e7ef14769ab0bdc480970697&query='+latitude+ ',' + longitude+'&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }
         else{   
                callback(undefined,'It is currently '+body.current.temperature+' It feels like '+body.current.feelslike)  
             }
    })
}
module.exports = forecast
