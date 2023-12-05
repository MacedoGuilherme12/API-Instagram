const express = require('express')
const routes = require('./routes')
const app = express()

app.use(express.json())
app.use(routes)




app.listen(3000, (req, res) =>{
    console.log("http://localhost:3000")

})