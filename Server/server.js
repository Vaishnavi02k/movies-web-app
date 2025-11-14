const express = require('express');
const cors = require('cors');
const pool = require('./db/db');
const app = express();

//Middleware
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    console.log("Express backend server")
    res.send('Hello from backend')
})


app.post('/user/register', (req, res) => {
    const { firstName, lastName, email, password, mobile, birth } = req.body
    const sql = `INSERT INTO users(first_name, last_name, email, password, mobile,birth) VALUES(?,?,?,?,?,?)`
    pool.query(
        sql,
        [firstName, lastName, email, password, mobile, birth],
        (error, data) => {
            if (data) {
                res.send({ status: "success", data: data });
            }
            res.send({ status: "error", error: error })
        }
    )
})
//Server start
app.listen(4000, 'localhost', () => {
    console.log("Server started at port 4000");
})