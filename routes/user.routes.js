const express=require('express')
const router=express.Router()
const userModel=require('../models/user.model')
const { body,validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
// router.get('/test',(req,res)=>{
//     res.send('User test route')
// })

router.get('/login',
    (req,res)=>{
    res.render('login')
})
router.post('/login',
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:5}),
    async (req,res)=>{
    const errors= validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array(),
            message:"Invalid Username or Password"
        })
    }

    const {username,password}=req.body
    const user=await userModel.findOne({
        username:username
    })
    
    if(!user){
        return res.status(400).json({
            message:"Invalid Username or Password"
        })
    }
    //compare password with hashed password
    //bcrypt.compare(password,hashedPassword)
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({
            message:"Invalid Username or Password"
        })
    }
    

    //create token
    const token=jwt.sign({
        userId:user._id,
        email:user.email,
        username:user.username
    }
    ,process.env.JWT_SECRET,
)
res.cookie('token',token)
res.send('Login successful')
    })


router.get('/register',
    
    (req,res)=>{

    
    res.render('register')
})

router.post('/register',
    body('email').trim().isEmail(),
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:3}),
   async (req,res)=>{
   const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array(),
            message:"invalid data"
        })
        }
    const {username,email,password}=req.body

    const hashedPassword=await bcrypt.hash(password,10 )
    const newUser= await userModel.create({
        username:username,
        email:email,
        password:hashedPassword
    })
     res.send('User created successfully')
    res.redirect('/register')
    })


module.exports=router;