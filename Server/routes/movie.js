const express = require('express');
const pool = require('../db/db');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'images' });
const result = require('../utils/result')


router.post('/add', upload.single('img'),(req, res) => {
    const {title,description,releaseDate}=req.body;
    const sql=`INSERT INTO movies(title,description,releaseDate,img) Values (?,?,?,?)`

    pool.query(sql,[title,description,releaseDate,req.file.filename],(error,data)=>{
        res.send(result.createResult(error,data));
    })
})

router.get('/allMovies',(req,res)=>{
    const sql = `SELECT title,description,releaseDate,img FROM movies`
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data));
    })
})

module.exports = router