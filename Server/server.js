const express = require('express');
const app = express();

//Middleware
app.use(cors())
app.use(express.static('images'))
app.use(express.json())
app.use(authorization)

app.use('/user', userRouter)

//Server start
app.listen(4000, 'localhost', ()=>{
    console.log("Server started at port 4000");
})