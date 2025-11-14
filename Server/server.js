const express = require('express');
const cors = require('cors');
const pool = require('./db/db');
const app = express();

const moviesRouter = require('./routes/movie')


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