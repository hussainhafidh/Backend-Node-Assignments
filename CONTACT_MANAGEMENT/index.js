const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const ContactRouter = require('./routes/contact')
dotenv.config()

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//router
app.use('/v1', ContactRouter)

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('connected to database');
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        })
    }).catch((error) => {
        console.log(error);
    })
