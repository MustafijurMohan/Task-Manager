require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret_Key = process.env.TOKEN_KEY


module.exports = (req, res, next) => {
    const Token = req.headers['token-key']

    jwt.verify(Token, secret_Key, (err, decoded) => {
        if (err) {
            res.status(401).json({status: 'Unauthorized'})
        } else {
            const email = decoded['data']
            req.headers.email = email
            next()
        }
    })
}



