import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import itemsRouter from './routes/itemsRouter.js'
import usersRouter from './routes/authRouter.js'
import { handleErrorFallback, handleFinalError } from './middleware/error.middleware.js'

const port = process.env.PORT 

const app = express()

const corsConfig = {origin: 'http://localhost:5173'}
app.use(cors(corsConfig))

app.use(express.json())

app.use('/api/items', itemsRouter)
app.use('/api/users/', usersRouter)


app.use(handleErrorFallback)
app.use(handleFinalError)

run()

async function run () {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    app.listen(port, () => {
      console.log('db connected and server running..')
    } )
  } catch (err) {
    console.error('there was error connecting to db: ', err)
  }
}