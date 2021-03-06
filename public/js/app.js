const weatherForm = document.querySelector('form')
const button = document.querySelector('button')
const searchBox = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

button.addEventListener('click', (e) => {
    e.preventDefault()

    const location = searchBox.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetchWeather(location, (error,{ location, forecast } = {}) => {
        if (error) {
            messageTwo.textContent = ''
            return messageOne.textContent = error
        }

        messageOne.textContent = location
        messageTwo.textContent = forecast
    })
})


const fetchWeather = (address, callback) => {
    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return callback(data.error)
            }

            callback(undefined, data)
        })
    })
}
