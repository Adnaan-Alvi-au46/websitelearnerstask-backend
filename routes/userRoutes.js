const {Router} = require('express')
const {login,register} = require('../controller/userController');
const userRouter = new Router()

userRouter.post('/login',login)
userRouter.post('/register',register)

module.exports = userRouter