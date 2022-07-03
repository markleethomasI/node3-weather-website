const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { geocode } = require('./utils/geocode')
const { forecast } = require('./utils/forecast')

const app = express()

// set port for heroku or local port.
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mark Thomas'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mark Thomas'
    })

})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mark Thomas',
        helpMsg: 'Do you need help'
    })
})

app.get('/weather', (req, res) => {
        // Destructure address from query string
        const { address } = req.query

        // If no address send error
        if(!address){
            return res.send({
                error: 'Address must be provided'
            })
        }


        geocode(address, (error, { latitude, longitude, placename } = {}) => {
            if(error){
                return res.send({error})
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }

                return res.send({
                    forecast: forecastData,
                    location: placename,
                    address: address
                })
            })

        })
    })


app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
        res.send({
            products: req.query.search
        })


})

app.get('/help/*', (req, res) => {
    res.status(404).render('404', {
        title: 'No page found',
        errorMessage: 'Help page not found',
        name: 'Mark Thomas'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        errorMessage: 'Page not found',
        name: 'Mark Thomas'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000')
})