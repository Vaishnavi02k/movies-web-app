const express = require('express');
const cors = require('cors');
const pool = require('./db/db');
const app = express();

const moviesRouter = require('./routes/movie')
const reviewRouter = require('./routes/review')

//Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('images'))

app.use('/movie', moviesRouter)
app.use('/review',reviewRouter)



//Server start
app.listen(4000, 'localhost', () => {
    console.log("Server started at port 4000");
})