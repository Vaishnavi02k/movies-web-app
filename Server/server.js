const express = require('express');
const cors = require('cors');
const app = express();

const myAuth = require('./utils/auth')
const moviesRouter = require('./routes/movie')
const reviewRouter = require('./routes/review')
const userRouter = require('./routes/user')

//Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('images'))
app.use(myAuth)

app.use('/user/', userRouter)
app.use('/movie', moviesRouter)
app.use('/review',reviewRouter)


//Server start
app.listen(4000, 'localhost', () => {
    console.log("Server started at port 4000");
})