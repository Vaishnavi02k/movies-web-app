const express = require('express');
const pool = require('../db/db');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'images' });

router.post('/add', upload.single('img'),(req, res) => {
    const {title,description,releaseDate}=req.body;
    const sql=''
})

module.exports = router