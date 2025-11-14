const express = require('express');
const router = express.Router();

const pool = require('../db/db');
const result = require('../utils/result')


router.post('/:movieId', (req, res) => {
    const { movieId } = req.params
    const { review, rating, userId } = req.body;

    const sql = 'INSERT INTO reviews(review,rating,user_id,movie_id) VALUES (?,?,?,?)'
    pool.query(sql, [review, rating, userId, movieId], (error, data) => {
        res.send(result.createResult(error, data));
    })
})

router.get('/myReviews', (req, res) => {
    const { userId } = req.body;

    const sql = 'SELECT title,rating,review,modified from reviews,movies WHERE  user_id=? AND reviews.movie_id = movies.id'
    pool.query(sql, [userId], (error, data) => {
        res.send(result.createResult(error, data));
    })
})





module.exports = router