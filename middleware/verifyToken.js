const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    //1)Get token from Cookie by cookie-parser
    const token = req.cookies.jwt
  
    //2) Validate the token
    if (token) {
      try {
        const userPayload = jwt.verify(token,process.env.secret_key)
        req.userPayload = userPayload
        next()
      } catch (error) {
        res.status(400).send({ status: 'error', msg: 'Token Invalid' })
      }
    } else {
      res.status(400).send({ status: 'error', msg: 'Token Not found' })
    }
  }

  module.exports = {
    verifyToken
  }