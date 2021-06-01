import express from "express"
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import projectRoutes from './routes/project.js'
import issueRoutes from './routes/issue.js'
import userRoutes from './routes/user.js'

const app = express();
dotenv.config()

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

app.use('/home/project', projectRoutes)
app.use('/home/issue', issueRoutes)
app.use('/user', userRoutes)

const PORT = process.env.PORT || 5050

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{app.listen(PORT, ()=>console.log(`Server running on PORT 5050`))})
    .catch((error) => console.log(error))

mongoose.set('useFindAndModify', false)

