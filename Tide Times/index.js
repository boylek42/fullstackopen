const express = require('express')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config();

const app = express()
const PORT= process.env.PORT

const requestLogger = (request, repsonse, next) => {
    console.log('Method: ', request.emthod)
    next()
}


// ROUTES
app.get()

app.listen(PORT, () => console.log(`App running on port: ${PORT}`))