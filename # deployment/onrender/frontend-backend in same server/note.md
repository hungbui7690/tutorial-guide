### Structure
App
- client
- server

### Setup
##### App
```js
  "scripts": {
    "dev": "nodemon server/index.js",
    "start": "node server/index.js",
    "build": " npm install --prefix server && npm install --prefix client --production=false && npm run build --prefix client"
  }
```
 

###### Client
```js
  "scripts": {
    "dev": "vite",
    "build": "vite build --base=/",
  }
```
 
 
###### Server
```js
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  }
```