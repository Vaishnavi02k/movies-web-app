const express = require('express');
const router = express.Router();

const pool = require('../db/db');
const result = require('../utils/result')


router.post('/:movieId',(req,res)=>{
    const { movieId } = req.params
    const { review,rating,userId }= req.body;

    const sql= 'INSERT INTO reviews(review,rating,user_id,movie_id) VALUES (?,?,?,?)'
    pool.query(sql,[review,rating,userId,movieId],(error,data)=>{
         res.send(result.createResult(error,data));
    })
})



module.exports=router