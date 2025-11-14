const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const result = require('../utils/result')

function myAuth(req, res, next){
    const url = req.url

    const allowedUrls = ['/user/login', '/user/register']
    if(allowedUrls.includes(url)){
        next()
    }
    else{
        const bearerToken =  req.headers.authorization  //we pass or frontend set
        console.log(bearerToken);

        if(bearerToken){
            const token = bearerToken.split(' ')[1]
            console.log(token)

            try {
                const payload = jwt.verify(token, config.secret) //get payload body from (login), there we encrypt here verify
                req.uid = payload.uid //Add data to req obj for further processing
                next()
            } catch (error) {
                res.send(result.createResult('Token is invalid'))
            }
        }
        else{
            res.send(result.createResult('Token is missing'))
        }
    }
}

module.exports = myAuth