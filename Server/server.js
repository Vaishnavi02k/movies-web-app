const express = require('express');
const app = express();

//Middleware


app.get('/', (req, res)=>{
    console.log("Express backend server")
    res.send('Hello from backend')
})
//Server start
app.listen(4000, 'localhost', ()=>{
    console.log("Server started at port 4000");
})