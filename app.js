const dotenv=require('dotenv')
dotenv.config()
const express= require('express');
const app=express()
const userRoutes=require('./routes/user.routes')
const cookieParser=require('cookie-parser')
const indexRoutes=require('./routes/index.routes')
const uploadRoutes = require('./routes/upload.routes');


const connectDB=require('./config/db')
connectDB()
app.set('view engine',"ejs");
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())


//Route will be /user/test

app.use('/',indexRoutes)
app.use('/user',userRoutes)
app.use('/upload', uploadRoutes);


app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})