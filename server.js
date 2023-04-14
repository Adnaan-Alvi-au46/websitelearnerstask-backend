const express = require('express')
const app = express();
const cors = require("cors")
const connectDB = require('./dbConfig');
const cookieparser = require('cookie-parser')
const userRouter = require('./routes/userRoutes');
const dotenv = require('dotenv');
// const path = require('path')

// app.use(express.static(path.join(__dirname+"/public")))

dotenv.config();

const prt = process.env.PORT 
// const prt = 6060


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieparser())

app.use(userRouter)

app.listen(prt,(error)=>{

if(!error){
    console.log('server started sucessfull at ' + process.env.PORT)
    connectDB()
}
else{
    console.log(error)
}
})