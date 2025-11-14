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
                    firstName : dbUser.first_name,
                    lastName : dbUser.last_name
                }

                res.send(result.createResult(err, user))
            }
        }
    })
})

//Update (Edit) Profile
router.put('/profile', (req, res) => {
  const { firstName, lastName, mobile } = req.body
  const sql = `UPDATE users SET first_name=?, last_name=?, mobile=? WHERE id = ?`
  pool.query(
    sql,
    [firstName, lastName, mobile, req.uid],  //req.uid get after myAuth
    (error, data) => {
      res.send(result.createResult(error, data))
    }
  )
})

module.exports = router
