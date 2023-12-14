const {Router} = require('express')
const UsersControllers = require('./apps/controllers/UsersControllers')
const schemaValidator = require('./apps/middlewares/schemaValidator')
const userSchema = require('./apps/schema/create.user.schema.json')
const routes = new Router()


routes.post('/user', schemaValidator(userSchema), UsersControllers.create )


routes.get('/health', (req, res) =>{
    return res.send({messsage: "Connected with sucess"})

})

module.exports = routes;