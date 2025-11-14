const express = require('express');
const cors = require('cors');
const pool = require('./db/db');


//user defined module
const moviesRouter= require('./routes/movie')

//creating the express object
const app = express();


//Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('images'))
app.use(express.json())

app.use('/movie', moviesRouter)


//Server start
app.listen(4000, 'localhost', () => {
    console.log("Server started at port 4000");
})