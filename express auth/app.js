import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import cors from 'cors'
import connectdb from './config/connectdb.js';
import userRoutes from './routes/userRoutes.js';
import ExpertRoutes from './routes/ExpertRoutes.js';

const app = express()
const port = process.env.PORT
const DATABASE_URL= process.env.DATABASE_URL


//corse policy
app.use(cors())
//database connection
connectdb(DATABASE_URL)
//json
app.use(express.json())

//Load route
app.use('/api/user/',userRoutes )
app.use('/api/Expert/',ExpertRoutes)



app.listen(port,()=>{
    console.log(`Server listening at ${port}`)
})