const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret_key = process.env.secret_key
const userModel = require('../model/userModel');


const register = async(req,res)=>{

    const {userName,email,password,confirmPassword} = req.body
    try {
        const loggedInUser = await userModel.findOne({email},{email:1,userName:1,password:1,})

        if(loggedInUser){
            res.status(401).send({ status: 'error', msg: "email already exist" })
            return
        }

        if (password != confirmPassword) {
            res.status(400).send({ status: 'error', msg: "Password/Confirm Password dosent match" })
            return
          }

        const protectedPassword = await bcrypt.hash(password,4) //encrypting password with bcrypt 4 times 

        const newUser = await userModel.create({userName,email,password : protectedPassword})  
        

        res.status(200).send({ status: 'success', user: { userName: newUser.userName, email: newUser.email }})
    

    } catch (error) {
        res.status(500).send({ status: 'error',error,msg:'internal server error'})
    }
};

const login = async(req,res)=>{
    try {                                         
        const {email,password} = req.body
        const loggedInUser = await userModel.findOne({email},{email:1,password:1,_id:1,userName:1})
        
        if(!loggedInUser){
            res.status(400).send({ status: 'error', msg: "User not found" })
            return``
        }
        const userId = loggedInUser._id
        const userName=loggedInUser.userName
            
        const isPasswordMatch = await bcrypt.compare(password, loggedInUser.password)
        if (!isPasswordMatch) {
          res.status(400).send({ status: 'error', msg: "Password Incorrect" })
          return
        }

       const userPayload = { email, id: loggedInUser._id }
       
       //Generate the token
       const token = jwt.sign(userPayload, process.env.secret_key, { algorithm: 'HS384', expiresIn: '1d' });

    //    res.cookie('jwt', token).json({Id,status: 'success', msg: 'User Logged in Successfully'})

        res.status(200).json({token,userName, userId, status: 'success', msg: 'User Logged in Successfully'});

    //    res.send({ status: 'success', msg: 'User Logged in Successfully' })
    
        
      } catch (error) {
        console.log("catch")
        res.status(500).send({ status: 'error', error, msg: "Internal Server Error" })
        
    }

};

// const logout = (req,res)=>{
//     try {
//         res.cookie('jwt', '', { maxAge: 1 })
//     res.send({ status: 'success', msg: 'Logged Out Successfully' })
//     } catch (error) {
//         res.send(error)
//     }
// }

module.exports ={login,register}