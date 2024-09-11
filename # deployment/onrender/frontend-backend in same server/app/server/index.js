import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
dotenv.config()
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authRouter from './routes/authRoutes.js'
import messageRouter from './routes/messageRoute.js'
import userRouter from './routes/userRoute.js'
import { connectDB } from './db/connect.js'
import { app, server } from './socket/socket.js'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory
// console.log(path.join(__dirname, '../client', 'dist', 'index.html'))
app.use(express.static(path.join(__dirname, '../client/dist')))

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/message', messageRouter)
app.use('/api/v1/user', userRouter)

app.get('*', (req, res) => {
  res.sendFile(
    // path.join(__dirname, '../client', 'index.html')
    path.join(__dirname, '../client', 'dist', 'index.html')
  )
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  connectDB()
  console.log(`Server Running on port ${PORT}`)
})
