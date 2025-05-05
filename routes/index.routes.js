const express=require('express')
const router=express.Router()
const authModel=require('../middlewares/auth')



router.get('/home',authModel,async(req,res)=>{

//    const UserFiles=await fileModel.find({ //
//      user:req.user.userId
//    })
    res.render('home')
})

router.post('/upload',authModel,(req,res)=>{
    res.send('File uploaded successfully')
})





module.exports=router