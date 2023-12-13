const {Router} = require('express')
const UsersControllers = require('./apps/controllers/UsersControllers')

const routes = new Router()


routes.post('/user', UsersControllers.create )


routes.get('/health', (req, res) =>{
    return res.send({messsage: "Connected with sucess"})

})

module.exports = routes;