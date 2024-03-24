const asyncHanlder = require('express-async-handler')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User =  require("../models/userModel")

const registerUser = asyncHanlder(async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email ||!password){
        res.status(400)
        throw new error("All fields are Mandatory")
    }
    const userAvailable  = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new error("user already registered")       
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({
        username,email,password:hashedPassword
    })
    if(user){
        res.status(201).json({_id:user._id,email:user.email})
    }else{
        res.status(400)
        throw new error("User data not valid")
    }
})

const loginUser = asyncHanlder(async(req,res)=>{
    const {email,password } = req.body
    if(!email || !password){
        res.status(400)
        throw new error("All fields are Mandatory")
    }
    const user = await User.findOne({email})
    if(user && await bcrypt.compare(password,user.password)){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user._id
            }
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"})
        res.status(200).json({accessToken});
    }else{
        res.status(401)
        throw new error("email or password is not valid")
    }
    
})

const currentUser = asyncHanlder(async(req,res)=>{
    res.json(req.user)
})

module.exports = {registerUser,loginUser,currentUser}