const mongoose = require('mongoose')

const dotenv = require('dotenv')



async function connectDB(){
    try {
        await mongoose.connect(process.env.Mongo_url,{dbName:'LoginForm'})
        console.log('DB connection successfull')
    } catch (error) {
        console.log(error)
        process.exit()
    }
};
module.exports  = connectDB;