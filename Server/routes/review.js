const express = require('express');
const router = express.Router();

const pool = require('../db/db');
const result = require('../utils/result')


router.post('/:movieId', (req, res) => {
    const { movieId } = req.params
    const userId = req.uid
    const { review, rating } = req.body;
    console.log(userId)
    const sql = `INSERT INTO reviews(review,rating,user_id,movie_id) VALUES (?,?,?,?)`
    pool.query(sql, [review, rating, userId, movieId], (error, data) => {
        res.send(result.createResult(error, data));
    })
})

router.get('/myReviews', (req, res) => {
    const userId = req.uid;

    const sql = `SELECT title,rating,review,modified from movies, reviews WHERE  user_id=? AND reviews.movie_id = movies.id`
    pool.query(sql, [userId], (error, data) => {
         if (data != '') res.send(result.createResult(error, data));
        res.send(result.createResult("You haven't posted a review"));
    })
})

router.get('/allReviews', (req, res) => {

    const sql = `SELECT title,rating,first_name,last_name,review,modified from users,movies,reviews WHERE reviews.movie_id = movies.id AND reviews.user_id=users.id`
    pool.query(sql, (error, data) => {
        if (data != '') res.send(result.createResult(error, data));
        res.send(result.createResult("No one has posted review"));
    })
})

router.post('/shareReview/:reviewId', (req, res) => {
    const { reviewId } = req.params
    const { userId } = req.body;
    const sql = `INSERT INTO shares(review_id,user_id) VALUES(?,?)`
    pool.query(sql, [reviewId, userId], (error, data) => {
        res.send(result.createResult(error, data));
    })

})

router.get('/sharedWithMe', (req, res) => {
    const userId = req.uid;
    // const { userId } = req.body;

    const sql = `SELECT title,rating,first_name,last_name,review,modified from users,movies,reviews,shares WHERE shares.user_id = ? AND shares.review_id= reviews.id AND reviews.user_id=users.id AND reviews.movie_id=movies.id`
    pool.query(sql, [userId], (error, data) => {
        if (data != '') res.send(result.createResult(error, data));
        res.send(result.createResult("No review to share with you"));

    })
})


module.exports = router