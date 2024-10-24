import path from 'path'
import { fileURLToPath } from 'url'

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory
// console.log(path.join(__dirname, '../client', 'dist', 'index.html'))
app.use(express.static(path.join(__dirname, '../client/dist')))

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\
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
