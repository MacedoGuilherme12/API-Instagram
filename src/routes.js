const {Router} = require('express')

const routes = new Router()

routes.get('/health', (req, res) =>{
    return res.send({messsage: "Connected with sucess"})

})

module.exports = routes;