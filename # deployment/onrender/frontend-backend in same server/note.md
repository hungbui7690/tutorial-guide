### Structure
App
- client
- server

### Setup
##### root package.json
```js
  "scripts": {
    "dev": "nodemon server/index.js",
    "start": "node server/index.js",
    "build": " npm install --prefix server && npm install --prefix client --production=false && npm run build --prefix client"
  }
```

###### move .env from server to root


###### Client package.json
```js
  "scripts": {
    "dev": "vite",
    "build": "vite build --base=/",
  }
```

###### Client utils/axios.js
```js
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.NODE_ENV !== 'production'
      ? 'http://localhost:5000/api/v1'
      : 'https://mern-twitter-app-clone.onrender.com/api/v1',
})
```
 
 
###### Server package.json
```js
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  }
```

###### Server index.js
```js
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory
// console.log(path.join(__dirname, '../client', 'dist', 'index.html'))
app.use(express.static(path.join(__dirname, '../client/dist')))


app.get('*', (req, res) => {
  res.sendFile(
    // path.join(__dirname, '../client', 'index.html')
    path.join(__dirname, '../client', 'dist', 'index.html')
  )
})


const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  connectDB()
  console.log(`Server Running on port ${PORT}`)
})

```