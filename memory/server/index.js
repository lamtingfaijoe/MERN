import express, { Router } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './Route/Post.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

const port = 5000



app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use('/posts',postRoutes)

//It is the URL to connect the mongoDB
// const CONNECT_URL = 'mongodb+srv://kolpl:kolpl1997@memoryproject.vss6e.mongodb.net/memory?retryWrites=true&w=majority'
const PORT =  process.env.PORT||5000;

mongoose.connect(process.env.CONNECT_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=> app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify',false)