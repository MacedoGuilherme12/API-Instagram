require('dotenv').config();
const express = require('express')
const routes = require('./routes')
const app = express()

app.use(express.json())
app.use(routes)


const PORT = process.env.PORT

app.listen(PORT, (req, res) =>{
    console.log(`http://localhost:${PORT}`)

})