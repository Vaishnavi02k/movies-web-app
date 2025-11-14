const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const result = require('../utils/result')
const pool = require('../db/db')
const config = require('../utils/config')


//Register
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, mobile, birth } = req.body
    const sql = `INSERT INTO users(first_name, last_name, email, password, mobile,birth) VALUES(?,?,?,?,?,?)`

    try{
        const hashPassword = await bcrypt.hash(password, config.saltRounds)
        // console.log(hashPassword)
        pool.query(
            sql,
            [firstName, lastName, email, hashPassword, mobile, birth],
            (error, data) => {
            res.send(result.createResult(error, data));
            }
        )
    }
    catch(err){
        // console.log('Not hash')
        res.send(result.createResult(err))
    }
})

//Login : Check user db password(by email) and user enter password
router.post('/login', (req, res)=>{
    const {email, password} = req.body

    const sql = `SELECT * FROM users
                WHERE email = ? `
    pool.query(sql, [email], async(err, data)=>{
        const dbUser = data[0];
        console.log(dbUser)
        
        //Check user exist
        if(data != ' '){
            //Check password for userValid
            const userValid = await bcrypt.compare(password, dbUser.password)
            console.log(userValid)
            //If userValid: Generate token to enter into session on id
            if(userValid){
                const payload = {
                    uid : dbUser.id
                }

                //Generate token
                const token = jwt.sign(payload, config.secret)
                console.log(token)

                //give token
                const user = {
                    token : token,
                    firstName : dbUser.first_Name,
                    lastName : dbUser.last_Name
                }

                res.send(result.createResult(err, user))
            }
        }
        else{
            console.log('di')
        }

    })
})


module.exports = router